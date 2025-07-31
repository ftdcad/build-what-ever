import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Zap, DollarSign, Shield, Brain } from "lucide-react";

export const ModelComparison = () => {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  const models = [
    {
      id: "gpt-4o",
      name: "GPT-4o",
      provider: "OpenAI",
      strengths: ["Multimodal", "Fast", "Reliable"],
      pricing: "$$$",
      speed: 85,
      accuracy: 90,
      contextWindow: "128K",
      useCases: ["General tasks", "Image analysis", "Customer support"],
      icon: "🤖"
    },
    {
      id: "claude-opus",
      name: "Claude Opus 4",
      provider: "Anthropic",
      strengths: ["Complex reasoning", "Safety", "Long context"],
      pricing: "$$$$",
      speed: 70,
      accuracy: 95,
      contextWindow: "200K",
      useCases: ["Complex analysis", "Research", "Content creation"],
      icon: "🧠"
    },
    {
      id: "grok-4",
      name: "Grok-4",
      provider: "xAI",
      strengths: ["Real-time data", "Humor", "X integration"],
      pricing: "$$$",
      speed: 80,
      accuracy: 85,
      contextWindow: "256K",
      useCases: ["Real-time analysis", "Social media", "Current events"],
      icon: "🚀"
    },
    {
      id: "deepseek-coder",
      name: "DeepSeek Coder",
      provider: "DeepSeek",
      strengths: ["Code generation", "OCR", "Open source"],
      pricing: "$",
      speed: 90,
      accuracy: 88,
      contextWindow: "32K",
      useCases: ["Programming", "Document OCR", "Code review"],
      icon: "💻"
    },
    {
      id: "o3",
      name: "OpenAI o3",
      provider: "OpenAI",
      strengths: ["Complex reasoning", "Math", "Planning"],
      pricing: "$$$$$",
      speed: 30,
      accuracy: 98,
      contextWindow: "128K",
      useCases: ["Scientific research", "Complex analysis", "Strategic planning"],
      icon: "🧮"
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

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">⚖️</span>
          AI Model Selection Guide
        </CardTitle>
        <Badge variant="secondary">Compare Performance & Use Cases</Badge>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="comparison">Direct Comparison</TabsTrigger>
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
                <Badge variant="outline">Recommended: GPT-4o, Grok-4</Badge>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="w-5 h-5 text-purple-500" />
                  <h3 className="font-semibold">Complex Reasoning</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Research, analysis, strategic planning, complex problem solving
                </p>
                <Badge variant="outline">Recommended: Claude Opus 4, OpenAI o3</Badge>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <h3 className="font-semibold">Cost-Effective</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  High-volume tasks, development, document processing
                </p>
                <Badge variant="outline">Recommended: DeepSeek Coder</Badge>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold">Safety & Compliance</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Regulated industries, sensitive content, ethical AI
                </p>
                <Badge variant="outline">Recommended: Claude Opus 4</Badge>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};