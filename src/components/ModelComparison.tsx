import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { CheckCircle, Circle, Zap, DollarSign, Shield, Brain, Play, BarChart3, Calculator, Lightbulb, Clock, Gauge } from "lucide-react";

export const ModelComparison = () => {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [testPrompt, setTestPrompt] = useState("Write a product description for a smart water bottle that tracks hydration levels.");
  const [testResults, setTestResults] = useState<Record<string, any>>({});
  const [isTestingModel, setIsTestingModel] = useState<string | null>(null);
  const [expectedUsage, setExpectedUsage] = useState([10000]); // requests per month
  const [activeTab, setActiveTab] = useState("overview");

  const models = [
    {
      id: "gpt-5",
      name: "GPT-5",
      provider: "OpenAI",
      strengths: ["Advanced reasoning", "Multimodal", "Tool use"],
      pricing: "$$$$",
      speed: 80,
      accuracy: 96,
      contextWindow: "200K",
      useCases: ["Complex analysis", "Research", "Creative writing"],
      icon: "🤖"
    },
    {
      id: "gpt-4.1-2025",
      name: "GPT-4.1 (2025)",
      provider: "OpenAI",
      strengths: ["Fast", "Reliable", "Multimodal"],
      pricing: "$$$",
      speed: 85,
      accuracy: 92,
      contextWindow: "128K",
      useCases: ["General tasks", "Customer support", "Content creation"],
      icon: "⚡"
    },
    {
      id: "claude-sonnet-4.1",
      name: "Claude Sonnet 4.1",
      provider: "Anthropic",
      strengths: ["Complex reasoning", "Safety", "Long context"],
      pricing: "$$$",
      speed: 75,
      accuracy: 94,
      contextWindow: "200K",
      useCases: ["Analysis", "Research", "Ethical AI applications"],
      icon: "🧠"
    },
    {
      id: "claude-opus-4",
      name: "Claude Opus 4",
      provider: "Anthropic",
      strengths: ["Superior reasoning", "Safety", "Complex tasks"],
      pricing: "$$$$",
      speed: 65,
      accuracy: 97,
      contextWindow: "200K",
      useCases: ["Research", "Complex analysis", "Strategic planning"],
      icon: "🎯"
    },
    {
      id: "grok-4",
      name: "Grok-4",
      provider: "xAI",
      strengths: ["Real-time data", "X integration", "Current events"],
      pricing: "$$$",
      speed: 80,
      accuracy: 87,
      contextWindow: "256K",
      useCases: ["Real-time analysis", "Social media", "Current events"],
      icon: "🚀"
    },
    {
      id: "o4-mini",
      name: "o4 Mini",
      provider: "OpenAI",
      strengths: ["Fast reasoning", "Coding", "Visual tasks"],
      pricing: "$$",
      speed: 90,
      accuracy: 89,
      contextWindow: "128K",
      useCases: ["Development", "Quick analysis", "Visual processing"],
      icon: "⚡"
    },
    {
      id: "deepseek-r1",
      name: "DeepSeek R1",
      provider: "DeepSeek",
      strengths: ["Reasoning", "Open source", "Cost-effective"],
      pricing: "$",
      speed: 85,
      accuracy: 91,
      contextWindow: "64K",
      useCases: ["Programming", "Mathematical reasoning", "Research"],
      icon: "💻"
    }
  ];

  const toggleModel = (modelId: string) => {
    setSelectedModels(prev => 
      prev.includes(modelId) 
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    );
  };

  const selectedModelData = models.filter(model => selectedModels.includes(model.id));

  const handleTestModel = async (modelId: string) => {
    setIsTestingModel(modelId);
    
    // Simulate API call with different response times based on model speed
    const model = models.find(m => m.id === modelId);
    const delay = model ? 5000 - (model.speed * 50) : 3000;
    
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Mock responses based on model characteristics
    const mockResponses: Record<string, string> = {
      "gpt-5": "🌟 **HydroSmart Pro - Revolutionary Hydration Intelligence**\n\nExperience the future of personal wellness with our AI-powered smart water bottle. Advanced biosensors continuously monitor your hydration status, while machine learning algorithms provide personalized recommendations based on your activity, climate, and health goals. Features seamless smartphone integration and predictive hydration insights.",
      "gpt-4.1-2025": "💧 **HydroSmart Pro - Your Intelligent Hydration Companion**\n\nStay perfectly hydrated with cutting-edge technology that tracks every sip. Real-time monitoring, smartphone sync, and personalized health insights make optimal hydration effortless. Sleek design meets smart functionality.",
      "claude-sonnet-4.1": "**HydroSmart Pro: Advanced Hydration Management System**\n\nThis innovative smart water bottle represents a breakthrough in personal health technology. Through continuous monitoring of hydration levels via precision sensors, it delivers evidence-based insights into daily water intake patterns, enabling optimized wellness routines with reliability and scientific accuracy.",
      "claude-opus-4": "**HydroSmart Pro: Comprehensive Hydration Optimization Platform**\n\nEngineered with sophisticated biometric monitoring capabilities, this intelligent hydration system employs multi-sensor arrays and machine learning algorithms to provide personalized hydration guidance. The integrated health analytics platform offers deep insights into consumption patterns, physiological needs, and optimal timing for fluid intake, supporting evidence-based wellness optimization.",
      "grok-4": "Meet HydroSmart Pro! 💧 This isn't just a water bottle - it's your hydration buddy that actually knows when you're being lazy about H2O. Smart sensors track every sip, syncs with your phone, and probably judges your beverage choices (in a helpful way). Because staying hydrated shouldn't require a PhD in remembering to drink water! 🤖 #StayHydrated",
      "o4-mini": "# HydroSmart Pro\n\n## Key Features:\n- Real-time hydration tracking via IoT sensors\n- Mobile app with ML-driven insights\n- 24oz capacity, 7-day battery\n- IP67 waterproof rating\n- Bluetooth/WiFi connectivity\n\n**Perfect for:** Athletes, health enthusiasts, busy professionals\n**Price point:** Premium wellness tech segment",
      "deepseek-r1": "**HydroSmart Pro Technical Specifications**\n\n```python\nclass HydroSmartPro:\n    def __init__(self):\n        self.sensors = ['conductivity', 'temperature', 'volume']\n        self.connectivity = ['bluetooth_5.0', 'wifi_6']\n        self.battery_life = '7_days'\n        self.ml_features = ['intake_prediction', 'health_correlation']\n    \n    def track_hydration(self):\n        return self.analyze_consumption_patterns()\n```\n\nAdvanced hydration monitoring with real-time data analytics and predictive modeling for optimal wellness outcomes."
    };

    setTestResults(prev => ({
      ...prev,
      [modelId]: {
        response: mockResponses[modelId] || "Smart water bottle with hydration tracking capabilities.",
        responseTime: delay,
        timestamp: new Date().toISOString()
      }
    }));
    
    setIsTestingModel(null);
  };

  const calculateMonthlyCost = (modelId: string, usage: number) => {
    const costPerRequest: Record<string, number> = {
      "gpt-5": 0.12,
      "gpt-4.1-2025": 0.03,
      "claude-sonnet-4.1": 0.05,
      "claude-opus-4": 0.10,
      "grok-4": 0.025,
      "o4-mini": 0.01,
      "deepseek-r1": 0.001
    };
    
    return (costPerRequest[modelId] || 0.01) * usage;
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">⚖️</span>
          AI Model Selection Guide
        </CardTitle>
        <Badge variant="secondary">Compare Latest Models & Performance (Updated 2025)</Badge>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="lab">Interactive Lab</TabsTrigger>
            <TabsTrigger value="cost">Cost Calculator</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="selection">Selection Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {models.map((model) => {
                const isSelected = selectedModels.includes(model.id);
                return (
                  <Card 
                    key={model.id} 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
                    }`}
                    onClick={() => toggleModel(model.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{model.icon}</span>
                          <div>
                            <h3 className="font-semibold">{model.name}</h3>
                            <p className="text-xs text-muted-foreground">{model.provider}</p>
                          </div>
                        </div>
                        {isSelected ? (
                          <CheckCircle className="w-5 h-5 text-primary" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Speed</span>
                          <Progress value={model.speed} className="w-16 h-2" />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Accuracy</span>
                          <Progress value={model.accuracy} className="w-16 h-2" />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Context</span>
                          <Badge variant="outline" className="text-xs">{model.contextWindow}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Cost</span>
                          <span className="text-xs">{model.pricing}</span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-medium">Strengths:</p>
                          <div className="flex flex-wrap gap-1">
                            {model.strengths.map((strength, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {strength}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-4">
            {selectedModels.length < 2 ? (
              <Card className="p-6 text-center">
                <p className="text-muted-foreground">Select 2 or more models to compare</p>
              </Card>
            ) : (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full border rounded">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left">Feature</th>
                        {selectedModelData.map((model) => (
                          <th key={model.id} className="p-3 text-center">{model.name}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Provider</td>
                        {selectedModelData.map((model) => (
                          <td key={model.id} className="p-3 text-center">{model.provider}</td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Speed Score</td>
                        {selectedModelData.map((model) => (
                          <td key={model.id} className="p-3 text-center">{model.speed}/100</td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Accuracy</td>
                        {selectedModelData.map((model) => (
                          <td key={model.id} className="p-3 text-center">{model.accuracy}/100</td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Context Window</td>
                        {selectedModelData.map((model) => (
                          <td key={model.id} className="p-3 text-center">{model.contextWindow}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">Pricing</td>
                        {selectedModelData.map((model) => (
                          <td key={model.id} className="p-3 text-center">{model.pricing}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="lab" className="space-y-6">
            <div className="grid gap-6">
              {/* Test Prompt Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    Interactive Model Testing
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Test models with your own prompts to see real performance differences.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="test-prompt">Test Prompt</Label>
                    <Textarea
                      id="test-prompt"
                      value={testPrompt}
                      onChange={(e) => setTestPrompt(e.target.value)}
                      placeholder="Enter a prompt to test across different models..."
                      className="min-h-20"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTestPrompt("Write a product description for a smart water bottle that tracks hydration levels.")}
                    >
                      Product Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTestPrompt("Explain quantum computing to a 10-year-old.")}
                    >
                      Simple Explanation
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTestPrompt("Write Python code to analyze customer churn data.")}
                    >
                      Code Generation
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTestPrompt("Analyze the pros and cons of remote work for startups.")}
                    >
                      Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Model Testing Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                {models.map((model) => (
                  <Card key={model.id} className="relative">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{model.icon}</span>
                          <div>
                            <CardTitle className="text-lg">{model.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{model.provider}</p>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleTestModel(model.id)}
                          disabled={isTestingModel === model.id || !testPrompt.trim()}
                          size="sm"
                          className="gap-2"
                        >
                          {isTestingModel === model.id ? (
                            <>
                              <Gauge className="h-4 w-4 animate-spin" />
                              Testing...
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4" />
                              Test
                            </>
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {testResults[model.id] ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>Response Time</span>
                            </div>
                            <Badge variant="outline">
                              {(testResults[model.id].responseTime / 1000).toFixed(2)}s
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Response:</Label>
                            <div className="p-3 bg-muted/50 rounded-md text-sm max-h-32 overflow-y-auto">
                              <pre className="whitespace-pre-wrap font-sans">
                                {testResults[model.id].response}
                              </pre>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-4 text-muted-foreground">
                          <p>Click "Test" to see this model's response</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cost" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Cost Calculator
                </CardTitle>
                <p className="text-muted-foreground">
                  Estimate your monthly costs based on expected usage.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Usage Slider */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Expected Monthly Requests</Label>
                    <Badge variant="outline">
                      {expectedUsage[0].toLocaleString()} requests/month
                    </Badge>
                  </div>
                  <Slider
                    value={expectedUsage}
                    onValueChange={setExpectedUsage}
                    max={100000}
                    min={1000}
                    step={1000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1K</span>
                    <span>50K</span>
                    <span>100K+</span>
                  </div>
                </div>

                {/* Cost Comparison Table */}
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Monthly Cost Comparison
                  </h3>
                  <div className="grid gap-3">
                    {models.map((model) => {
                      const monthlyCost = calculateMonthlyCost(model.id, expectedUsage[0]);
                      const isHighest = monthlyCost === Math.max(...models.map(m => calculateMonthlyCost(m.id, expectedUsage[0])));
                      const isLowest = monthlyCost === Math.min(...models.map(m => calculateMonthlyCost(m.id, expectedUsage[0])));
                      
                      return (
                        <Card 
                          key={model.id} 
                          className={`p-4 ${isLowest ? 'ring-2 ring-green-500 bg-green-50' : isHighest ? 'ring-2 ring-red-500 bg-red-50' : ''}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{model.icon}</span>
                              <div>
                                <h4 className="font-medium">{model.name}</h4>
                                <p className="text-sm text-muted-foreground">{model.provider}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold">
                                ${monthlyCost.toFixed(2)}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                ${(monthlyCost / expectedUsage[0] * 1000).toFixed(3)}/1K requests
                              </div>
                              {isLowest && (
                                <Badge variant="default" className="mt-1 bg-green-600">
                                  Most Cost-Effective
                                </Badge>
                              )}
                              {isHighest && (
                                <Badge variant="destructive" className="mt-1">
                                  Most Expensive
                                </Badge>
                              )}
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                {/* Cost Insights */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-primary" />
                        Cost Optimization Tips
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                        <li>• Consider cheaper models for simple tasks and expensive models for complex reasoning</li>
                        <li>• Use caching to reduce redundant API calls</li>
                        <li>• Implement request batching when possible</li>
                        <li>• Monitor usage patterns to optimize model selection</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="selection" className="space-y-4">
            <div className="grid gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-semibold">Fast & General Tasks</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Customer support, content generation, general Q&A
                </p>
                <Badge variant="outline">Recommended: GPT-4.1 (2025), o4 Mini</Badge>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="w-5 h-5 text-purple-500" />
                  <h3 className="font-semibold">Complex Reasoning</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Research, analysis, strategic planning, complex problem solving
                </p>
                <Badge variant="outline">Recommended: GPT-5, Claude Opus 4</Badge>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <h3 className="font-semibold">Cost-Effective</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  High-volume tasks, development, document processing
                </p>
                <Badge variant="outline">Recommended: DeepSeek R1, o4 Mini</Badge>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold">Safety & Compliance</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Regulated industries, sensitive content, ethical AI
                </p>
                <Badge variant="outline">Recommended: Claude Sonnet 4.1, Claude Opus 4</Badge>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
