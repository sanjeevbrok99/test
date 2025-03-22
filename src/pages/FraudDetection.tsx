import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const FraudDetection = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast.info(`File selected: ${file.name}`);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return toast.error('Please select a file first');
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('https://test-tau-drab-18.vercel.app/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResults(data);
      toast.success('File processed successfully!');
    } catch (error) {
      toast.error('Error during file upload');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAnalyzeJson = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      const response = await fetch('http://localhost:5000/analyze-json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: parsedData }),
      });

      const data = await response.json();
      setResults(data);
      toast.success('JSON analyzed successfully!');
    } catch (error) {
      toast.error('Invalid JSON or API error');
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">Fraud Detection</h1>
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="upload">File Upload</TabsTrigger>
          <TabsTrigger value="json">JSON Input</TabsTrigger>
        </TabsList>

        {/* File Upload Tab */}
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Transaction Data</CardTitle>
            </CardHeader>
            <CardContent>
              <Input type="file" accept=".json" onChange={handleFileChange} />
              {isUploading && <Progress value={100} className="mt-4" />}
            </CardContent>
            <CardFooter>
              <Button onClick={handleUpload} disabled={isUploading}>Upload & Analyze</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* JSON Input Tab */}
        <TabsContent value="json">
          <Card>
            <CardHeader>
              <CardTitle>Paste JSON Data</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste JSON data here"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
              />
            </CardContent>
            <CardFooter>
              <Button onClick={handleAnalyzeJson}>Analyze JSON</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default FraudDetection;
