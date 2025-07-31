import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Zap, DollarSign, Clock, TestTube } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ModelConfigBuilderProps {
  projectConfig: any;
  updateProjectConfig: (updates: any) => void;
  onStepComplete: () => void;
}

const apiProviders = [
  {
    id: "openai",
    name: "OpenAI",
    models: [
      { id: "gpt-4o", name: "GPT-4o", cost: "$15/1M tokens", speed: "Fast", context: "128K" },
      { id: "gpt-4o-mini", name: "GPT-4o Mini", cost: "$0.15/1M tokens", speed: "Very Fast", context: "128K" },
      { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", cost: "$0.50/1M tokens", speed: "Very Fast", context: "16K" }
    ]
  },
  {
    id: "anthropic",
    name: "Anthropic",
    models: [
      { id: "claude-3-opus", name: "Claude 3 Opus", cost: "$15/1M tokens", speed: "Medium", context: "200K" },
      { id: "claude-3-sonnet", name: "Claude 3 Sonnet", cost: "$3/1M tokens", speed: "Fast", context: "200K" },
      { id: "claude-3-haiku", name: "Claude 3 Haiku", cost: "$0.25/1M tokens", speed: "Very Fast", context: "200K" }
    ]
  },
  {
    id: "local",
    name: "Local/Open Source",
    models: [
      { id: "llama-3.1-70b", name: "Llama 3.1 70B", cost: "Free*", speed: "Medium", context: "128K" },
      { id: "mistral-7b", name: "Mistral 7B", cost: "Free*", speed: "Fast", context: "32K" },
      { id: "codellama-34b", name: "Code Llama 34B", cost: "Free*", speed: "Medium", context: "16K" }
    ]
  }
];

export const ModelConfigBuilder = ({ projectConfig, updateProjectConfig, onStepComplete }: ModelConfigBuilderProps) => {
  const [selectedProvider, setSelectedProvider] = useState(projectConfig.apiProvider || "");
  const [selectedModel, setSelectedModel] = useState(projectConfig.model || "");
  const [temperature, setTemperature] = useState([projectConfig.temperature || 0.7]);
  const [maxTokens, setMaxTokens] = useState(projectConfig.maxTokens || 2048);
  const [apiKey, setApiKey] = useState("");
  const [testPrompt, setTestPrompt] = useState("");
  const [testResult, setTestResult] = useState("");
  const [isTestingModel, setIsTestingModel] = useState(false);

  const currentProvider = apiProviders.find(p => p.id === selectedProvider);
  const currentModel = currentProvider?.models.find(m => m.id === selectedModel);

  const estimatedCostPer1000Calls = currentModel ? 
    parseFloat(currentModel.cost.replace(/[^0-9.]/g, '')) * 2 * 1000 : 0; // Rough estimate

  const handleTestModel = async () => {
    if (!testPrompt.trim()) return;
    
    setIsTestingModel(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setTestResult(`Test response from ${currentModel?.name}: This is a simulated response to "${testPrompt}". The model would process this with temperature ${temperature[0]} and max tokens ${maxTokens}.`);
      setIsTestingModel(false);
    }, 2000);
  };

  const handleSaveConfiguration = () => {
    updateProjectConfig({
      apiProvider: selectedProvider,
      model: selectedModel,
      temperature: temperature[0],
      maxTokens: maxTokens
    });
    onStepComplete();
  };

  const isConfigValid = selectedProvider && selectedModel && (selectedProvider === "local" || apiKey);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="provider" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="provider">Provider & Model</TabsTrigger>
          <TabsTrigger value="parameters">Parameters</TabsTrigger>
          <TabsTrigger value="test">Test & Validate</TabsTrigger>
        </TabsList>

        <TabsContent value="provider" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Provider Selection</CardTitle>
              <CardDescription>
                Choose your AI model provider and specific model
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>API Provider</Label>
                <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an API provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {apiProviders.map((provider) => (
                      <SelectItem key={provider.id} value={provider.id}>
                        {provider.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {currentProvider && (
                <div>
                  <Label>Model</Label>
                  <div className="grid gap-3 mt-2">
                    {currentProvider.models.map((model) => (
                      <Card
                        key={model.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedModel === model.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setSelectedModel(model.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{model.name}</h3>
                              <p className="text-sm text-muted-foreground">Context: {model.context}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                              <Badge variant="outline" className="text-xs">
                                <DollarSign className="h-3 w-3 mr-1" />
                                {model.cost}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                <Zap className="h-3 w-3 mr-1" />
                                {model.speed}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {selectedProvider && selectedProvider !== "local" && (
                <div>
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Enter your API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Your API key will be stored locally and used for testing
                  </p>
                </div>
              )}

              {selectedProvider === "local" && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Local models require additional setup and hardware resources. 
                    Free to use but may need GPU acceleration for optimal performance.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parameters" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Parameters</CardTitle>
              <CardDescription>
                Fine-tune your model's behavior and output characteristics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Temperature: {temperature[0]}</Label>
                <Slider
                  value={temperature}
                  onValueChange={setTemperature}
                  max={2}
                  min={0}
                  step={0.1}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>More Focused</span>
                  <span>More Creative</span>
                </div>
              </div>

              <div>
                <Label htmlFor="max-tokens">Max Tokens</Label>
                <Input
                  id="max-tokens"
                  type="number"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                  min={1}
                  max={currentModel?.context === "200K" ? 200000 : 
                       currentModel?.context === "128K" ? 128000 : 16000}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Maximum tokens for model response (affects cost)
                </p>
              </div>

              {currentModel && (
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Cost Estimation</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Per 1,000 calls:</span>
                        <span className="font-medium">${estimatedCostPer1000Calls.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Per month (10K calls):</span>
                        <span className="font-medium">${(estimatedCostPer1000Calls * 10).toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="test" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Test Your Configuration</CardTitle>
              <CardDescription>
                Send a test prompt to validate your model setup
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="test-prompt">Test Prompt</Label>
                <Textarea
                  id="test-prompt"
                  placeholder="Enter a test prompt to validate your model configuration..."
                  value={testPrompt}
                  onChange={(e) => setTestPrompt(e.target.value)}
                  rows={3}
                />
              </div>

              <Button 
                onClick={handleTestModel}
                disabled={!testPrompt.trim() || !isConfigValid || isTestingModel}
                className="w-full"
              >
                <TestTube className="h-4 w-4 mr-2" />
                {isTestingModel ? "Testing..." : "Test Model"}
              </Button>

              {testResult && (
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-sm">Test Result</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{testResult}</p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button 
          onClick={handleSaveConfiguration}
          disabled={!isConfigValid}
          size="lg"
        >
          Continue to Knowledge Base
        </Button>
      </div>
    </div>
  );
};