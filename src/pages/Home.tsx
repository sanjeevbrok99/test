
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/context/ThemeContext';
import { Shield, BarChart, Brain, Zap, AlertTriangle, Check, Info } from 'lucide-react';
import Footer from '@/components/layout/Footer';

const Home = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="py-4 px-6 border-b">
        <div className="container flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">FraudGuard</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#technology" className="text-muted-foreground hover:text-foreground transition-colors">
              Technology
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/login">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 px-6">
          <div className="container mx-auto text-center max-w-4xl">
            <Badge variant="outline" className="mb-4 py-1 px-4">
              AI-Powered Fraud Detection
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Protect Your Business from Financial Fraud
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Real-time AI-powered fraud detection and prevention platform that helps businesses
              detect and prevent fraudulent transactions before they happen.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/login">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Free Trial
                </Button>
              </Link>
              <a href="#features">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 px-6 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Comprehensive Fraud Protection</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our platform provides end-to-end protection across the transaction lifecycle
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover-lift">
                <CardHeader>
                  <Zap className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Real-time Detection</CardTitle>
                  <CardDescription>
                    Monitor transactions in real-time and stop fraud before it happens
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-status-safe" />
                      <span>Sub-second response times</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-status-safe" />
                      <span>Seamless integration with payment processors</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-status-safe" />
                      <span>Customizable risk thresholds</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <Brain className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>AI-Powered Analysis</CardTitle>
                  <CardDescription>
                    Advanced machine learning models trained on billions of transactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-status-safe" />
                      <span>Pattern recognition across transaction networks</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-status-safe" />
                      <span>Continuous model improvement with new data</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-status-safe" />
                      <span>Anomaly detection with explainable results</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <BarChart className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Comprehensive Analytics</CardTitle>
                  <CardDescription>
                    Detailed insights and reports on transaction patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-status-safe" />
                      <span>Interactive dashboards and visualizations</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-status-safe" />
                      <span>Scheduled reports and alerts</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-status-safe" />
                      <span>Custom KPIs and metrics</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="technology" className="py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Advanced AI Technology</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Powered by cutting-edge machine learning and data science
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Deep Learning Models</h3>
                  <p className="text-muted-foreground">
                    Our neural networks analyze hundreds of data points per transaction to detect patterns
                    invisible to traditional systems.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Behavioral Biometrics</h3>
                  <p className="text-muted-foreground">
                    Analyze user behavior patterns to distinguish between legitimate users and fraudsters.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Network Analysis</h3>
                  <p className="text-muted-foreground">
                    Graph-based algorithms identify suspicious connections between transactions, accounts,
                    and entities.
                  </p>
                </div>
              </div>
              
              <div className="border rounded-lg p-6 glass-morphism">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <Brain className="h-16 w-16 mb-4 mx-auto text-primary/70" />
                    <p className="text-muted-foreground">AI Visualization Placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 px-6 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Plans that scale with your business needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">$299</span>
                    <span className="text-muted-foreground ml-1">/month</span>
                  </div>
                  <CardDescription className="mt-2">
                    For small businesses just getting started
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-status-safe" />
                      <span>Up to 10,000 transactions/month</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-status-safe" />
                      <span>Real-time fraud detection</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-status-safe" />
                      <span>Basic reporting</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-status-safe" />
                      <span>Email support</span>
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline">
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover-lift border-primary">
                <CardHeader>
                  <Badge className="mb-2 w-fit">Popular</Badge>
                  <CardTitle>Business</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">$799</span>
                    <span className="text-muted-foreground ml-1">/month</span>
                  </div>
                  <CardDescription className="mt-2">
                    For growing businesses with higher volume
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-status-safe" />
                      <span>Up to 50,000 transactions/month</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-status-safe" />
                      <span>Advanced AI detection models</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-status-safe" />
                      <span>Custom rule engine</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-status-safe" />
                      <span>API access</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-status-safe" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                  <Button className="w-full">
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">Custom</span>
                  </div>
                  <CardDescription className="mt-2">
                    For large organizations with complex needs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-status-safe" />
                      <span>Unlimited transactions</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-status-safe" />
                      <span>Custom AI model training</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-status-safe" />
                      <span>Advanced integrations</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-status-safe" />
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-status-safe" />
                      <span>24/7 support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-status-safe" />
                      <span>SLA guarantees</span>
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline">
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 text-center">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">Ready to protect your business?</h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join thousands of businesses using FraudGuard to detect and prevent fraud
            </p>
            <Link to="/login">
              <Button size="lg">Get Started Today</Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
