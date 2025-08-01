import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Calculator, TrendingUp, AlertCircle } from "lucide-react";

export const APICostCalculator = () => {
  const [provider, setProvider] = useState("openai");
  const [model, setModel] = useState("gpt-4");
  const [inputTokens, setInputTokens] = useState(1000);
  const [outputTokens, setOutputTokens] = useState(500);
  const [requestsPerDay, setRequestsPerDay] = useState(100);

  const providers = {
    openai: {
      name: "OpenAI",
      models: {
        "gpt-4": { input: 0.03, output: 0.06, name: "GPT-4" },
        "gpt-4-turbo": { input: 0.01, output: 0.03, name: "GPT-4 Turbo" },
        "gpt-3.5-turbo": { input: 0.0015, output: 0.002, name: "GPT-3.5 Turbo" },
        "gpt-4o": { input: 0.005, output: 0.015, name: "GPT-4o" },
        "gpt-4o-mini": { input: 0.00015, output: 0.0006, name: "GPT-4o Mini" }
      }
    },
    anthropic: {
      name: "Anthropic",
      models: {
        "claude-3-opus": { input: 0.015, output: 0.075, name: "Claude 3 Opus" },
        "claude-3-sonnet": { input: 0.003, output: 0.015, name: "Claude 3 Sonnet" },
        "claude-3-haiku": { input: 0.00025, output: 0.00125, name: "Claude 3 Haiku" },
        "claude-3.5-sonnet": { input: 0.003, output: 0.015, name: "Claude 3.5 Sonnet" }
      }
    },
    google: {
      name: "Google",
      models: {
        "gemini-pro": { input: 0.0005, output: 0.0015, name: "Gemini Pro" },
        "gemini-pro-vision": { input: 0.00025, output: 0.0005, name: "Gemini Pro Vision" },
        "gemini-ultra": { input: 0.001, output: 0.002, name: "Gemini Ultra" }
      }
    }
  };

  const currentModel = providers[provider]?.models[model];
  
  const calculateCosts = () => {
    if (!currentModel) return { perRequest: 0, daily: 0, monthly: 0, yearly: 0 };
    
    const inputCost = (inputTokens / 1000) * currentModel.input;
    const outputCost = (outputTokens / 1000) * currentModel.output;
    const perRequest = inputCost + outputCost;
    const daily = perRequest * requestsPerDay;
    const monthly = daily * 30;
    const yearly = daily * 365;
    
    return { perRequest, daily, monthly, yearly };
  };

  const costs = calculateCosts();

  const usageBreakdown = [
    { label: "Input Tokens", value: inputTokens, cost: (inputTokens / 1000) * (currentModel?.input || 0) },
    { label: "Output Tokens", value: outputTokens, cost: (outputTokens / 1000) * (currentModel?.output || 0) }
  ];

  const totalTokens = inputTokens + outputTokens;
  const inputPercentage = (inputTokens / totalTokens) * 100;
  const outputPercentage = (outputTokens / totalTokens) * 100;

  const optimizationTips = [
    {
      tip: "Reduce input length",
      savings: "20-40%",
      description: "Use concise prompts and remove unnecessary context"
    },
    {
      tip: "Use cheaper models for simple tasks",
      savings: "50-90%",
      description: "Switch to GPT-3.5 or mini models for basic operations"
    },
    {
      tip: "Implement caching",
      savings: "30-70%",
      description: "Cache responses for repeated queries"
    },
    {
      tip: "Batch multiple requests",
      savings: "10-25%",
      description: "Combine multiple operations into single requests"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          API Cost Calculator & Optimizer
        </CardTitle>
        <CardDescription>
          Calculate and optimize your AI API costs across different providers and models
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="calculator">Cost Calculator</TabsTrigger>
            <TabsTrigger value="comparison">Model Comparison</TabsTrigger>
            <TabsTrigger value="optimization">Optimization Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Provider</label>
                    <Select value={provider} onValueChange={setProvider}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(providers).map(([key, p]) => (
                          <SelectItem key={key} value={key}>{p.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Model</label>
                    <Select value={model} onValueChange={setModel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(providers[provider]?.models || {}).map(([key, m]: [string, any]) => (
                          <SelectItem key={key} value={key}>{m.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Input Tokens</label>
                      <Input
                        type="number"
                        value={inputTokens}
                        onChange={(e) => setInputTokens(Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Output Tokens</label>
                      <Input
                        type="number"
                        value={outputTokens}
                        onChange={(e) => setOutputTokens(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Requests per Day</label>
                    <Input
                      type="number"
                      value={requestsPerDay}
                      onChange={(e) => setRequestsPerDay(Number(e.target.value))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cost Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Per Request</span>
                      <Badge variant="outline">${costs.perRequest.toFixed(4)}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Daily</span>
                      <Badge variant="outline">${costs.daily.toFixed(2)}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Monthly</span>
                      <Badge variant="default">${costs.monthly.toFixed(2)}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Yearly</span>
                      <Badge variant="default">${costs.yearly.toFixed(2)}</Badge>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="font-medium text-sm">Token Usage Breakdown</h4>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Input Tokens ({inputTokens.toLocaleString()})</span>
                        <span>${usageBreakdown[0].cost.toFixed(4)}</span>
                      </div>
                      <Progress value={inputPercentage} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Output Tokens ({outputTokens.toLocaleString()})</span>
                        <span>${usageBreakdown[1].cost.toFixed(4)}</span>
                      </div>
                      <Progress value={outputPercentage} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-3 text-left">Model</th>
                    <th className="border border-border p-3 text-left">Input (per 1K tokens)</th>
                    <th className="border border-border p-3 text-left">Output (per 1K tokens)</th>
                    <th className="border border-border p-3 text-left">Cost per Request</th>
                    <th className="border border-border p-3 text-left">Monthly Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(providers).map(([providerKey, providerData]) =>
                    Object.entries(providerData.models).map(([modelKey, modelData]) => {
                      const modelInputCost = (inputTokens / 1000) * modelData.input;
                      const modelOutputCost = (outputTokens / 1000) * modelData.output;
                      const modelPerRequest = modelInputCost + modelOutputCost;
                      const modelMonthly = modelPerRequest * requestsPerDay * 30;
                      
                      return (
                        <tr key={`${providerKey}-${modelKey}`} className={modelKey === model && providerKey === provider ? "bg-primary/5" : ""}>
                          <td className="border border-border p-3">
                            <div>
                              <div className="font-medium">{modelData.name}</div>
                              <div className="text-xs text-muted-foreground">{providerData.name}</div>
                            </div>
                          </td>
                          <td className="border border-border p-3">${modelData.input.toFixed(4)}</td>
                          <td className="border border-border p-3">${modelData.output.toFixed(4)}</td>
                          <td className="border border-border p-3">${modelPerRequest.toFixed(4)}</td>
                          <td className="border border-border p-3">${modelMonthly.toFixed(2)}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-4">
            <div className="grid gap-4">
              {optimizationTips.map((tip, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">{tip.tip}</h4>
                        <p className="text-sm text-muted-foreground">{tip.description}</p>
                      </div>
                      <Badge variant="secondary">{tip.savings} savings</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Cost Optimization Example
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-destructive mb-2">❌ Unoptimized</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Using GPT-4 for all tasks</li>
                          <li>• Long, verbose prompts</li>
                          <li>• No caching</li>
                          <li>• Individual API calls</li>
                        </ul>
                        <div className="mt-3 p-3 bg-destructive/10 rounded">
                          <strong>Monthly cost: $500</strong>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-green-600 mb-2">✅ Optimized</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• GPT-3.5 for simple tasks</li>
                          <li>• Concise, focused prompts</li>
                          <li>• 50% cache hit rate</li>
                          <li>• Batched requests</li>
                        </ul>
                        <div className="mt-3 p-3 bg-green-100 rounded">
                          <strong>Monthly cost: $125 (75% savings)</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};