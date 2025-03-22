
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/context/ThemeContext';
import { useRealTimeAlerts } from '@/hooks/useRealTimeAlerts';
import { Moon, Sun, Bell, BellOff, Eye, EyeOff, Key, Save } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [showSensitiveData, setShowSensitiveData] = useState(false);
  const { toggleAlerts } = useRealTimeAlerts(alertsEnabled);
  const [apiKey, setApiKey] = useState('');
  const [secondaryApiKey, setSecondaryApiKey] = useState('');

  const handleToggleAlerts = () => {
    setAlertsEnabled(toggleAlerts(alertsEnabled));
  };

  const handleToggleSensitiveData = () => {
    setShowSensitiveData(!showSensitiveData);
    toast.info(showSensitiveData ? 'Sensitive data hidden' : 'Sensitive data visible');
  };

  const saveApiKeys = () => {
    localStorage.setItem('fraudMonitor_apiKey', apiKey);
    if (secondaryApiKey) {
      localStorage.setItem('fraudMonitor_secondaryApiKey', secondaryApiKey);
    }
    toast.success('API Keys saved successfully');
  };

  // Load saved API keys on component mount
  React.useEffect(() => {
    const savedApiKey = localStorage.getItem('fraudMonitor_apiKey');
    const savedSecondaryApiKey = localStorage.getItem('fraudMonitor_secondaryApiKey');
    
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    
    if (savedSecondaryApiKey) {
      setSecondaryApiKey(savedSecondaryApiKey);
    }
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="animate-in slide-up">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your application preferences</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="glass-card animate-in slide-up delay-100">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how the application looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  <Label htmlFor="theme-toggle">Dark Mode</Label>
                </div>
                <Switch
                  id="theme-toggle"
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {alertsEnabled ? <Bell className="h-5 w-5" /> : <BellOff className="h-5 w-5" />}
                  <Label htmlFor="alerts-toggle">Real-time Alerts</Label>
                </div>
                <Switch
                  id="alerts-toggle"
                  checked={alertsEnabled}
                  onCheckedChange={handleToggleAlerts}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {showSensitiveData ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                  <Label htmlFor="sensitive-toggle">Show Sensitive Data</Label>
                </div>
                <Switch
                  id="sensitive-toggle"
                  checked={showSensitiveData}
                  onCheckedChange={handleToggleSensitiveData}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card animate-in slide-up delay-200">
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>
                Connect your fraud detection API endpoints
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key" className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  Primary API Key
                </Label>
                <Input
                  id="api-key"
                  type={showSensitiveData ? "text" : "password"}
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Your primary API key for fraud detection services
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="secondary-api-key" className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  Secondary API Key (Optional)
                </Label>
                <Input
                  id="secondary-api-key"
                  type={showSensitiveData ? "text" : "password"}
                  placeholder="Enter your secondary API key"
                  value={secondaryApiKey}
                  onChange={(e) => setSecondaryApiKey(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Optional backup API key for failover
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveApiKeys} className="w-full gap-2">
                <Save className="h-4 w-4" />
                Save API Keys
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
