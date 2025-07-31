import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Zap, Shield, Settings, Database, Code, TrendingUp } from "lucide-react";

// Import all demo components
import { TemperatureGauge } from "./TemperatureGauge";
import { ContextWindowDemo } from "./ContextWindowDemo";
import { ChunkingStrategyDemo } from "./ChunkingStrategyDemo";
import { RAGSimulator } from "./RAGSimulator";
import { ModelComparison } from "./ModelComparison";
import { HallucinationDetector } from "./HallucinationDetector";
import { DatabaseComparison } from "./DatabaseComparison";
import { QueryComparison } from "./QueryComparison";

export const AIEducationSystem = () => {
  const [activeSection, setActiveSection] = useState("fundamentals");

  const sections = [
    {
      id: "fundamentals",
      title: "Core AI Concepts",
      icon: <Brain className="w-5 h-5" />,
      description: "Essential AI/ML terminology and foundational concepts",
      components: ["temperature", "context", "embeddings"]
    },
    {
      id: "databases",
      title: "Data Storage & Databases",
      icon: <Database className="w-5 h-5" />,
      description: "SQL vs NoSQL databases, query comparison, and data modeling",
      components: ["database-comparison", "query-comparison", "data-modeling"]
    },
    {
      id: "rag",
      title: "RAG & Retrieval",
      icon: <BookOpen className="w-5 h-5" />,
      description: "Retrieval Augmented Generation and knowledge systems",
      components: ["rag-simulator", "chunking", "vector-search"]
    },
    {
      id: "models",
      title: "Model Selection",
      icon: <Zap className="w-5 h-5" />,
      description: "AI model comparison and selection strategies",
      components: ["model-comparison", "quantization", "fine-tuning"]
    },
    {
      id: "safety",
      title: "AI Safety & Control",
      icon: <Shield className="w-5 h-5" />,
      description: "Hallucination detection, guardrails, and monitoring",
      components: ["hallucination", "guardrails", "monitoring"]
    },
    {
      id: "advanced",
      title: "Advanced Topics",
      icon: <TrendingUp className="w-5 h-5" />,
      description: "Cutting-edge AI techniques and implementations",
      components: ["agents", "multimodal", "scaling-laws"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">AI Assistant Design Guide</h1>
              <p className="text-muted-foreground">Complete guide to understanding AI & automation</p>
            </div>
          </div>
          <div className="flex gap-2 text-sm">
            <Badge variant="secondary">RAG Systems</Badge>
            <Badge variant="secondary">Model Selection</Badge>
            <Badge variant="secondary">Safety & Control</Badge>
            <Badge variant="secondary">Interactive Demos</Badge>
          </div>
        </div>
      </div>

      {/* Navigation Sidebar */}
      <div className="flex">
        <div className="w-64 border-r bg-card/50 min-h-screen">
          <ScrollArea className="h-full p-4">
            <div className="space-y-2">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.icon}
                  <span className="ml-2">{section.title}</span>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="container mx-auto px-6 py-6">
            {activeSection === "fundamentals" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Core AI Concepts</h2>
                  <p className="text-muted-foreground mb-6">
                    Master the fundamental building blocks of AI systems with interactive demonstrations.
                  </p>
                </div>
                
                <div className="grid gap-6">
                  <TemperatureGauge />
                  <ContextWindowDemo />
                </div>
              </div>
            )}

            {activeSection === "databases" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Data Storage & Databases</h2>
                  <p className="text-muted-foreground mb-6">
                    Understand SQL vs NoSQL databases, query patterns, and when to use each approach.
                  </p>
                </div>
                
                <div className="grid gap-6">
                  <DatabaseComparison />
                  <QueryComparison />
                </div>
              </div>
            )}

            {activeSection === "rag" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">RAG & Retrieval Systems</h2>
                  <p className="text-muted-foreground mb-6">
                    Explore Retrieval Augmented Generation and knowledge base integration strategies.
                  </p>
                </div>
                
                <div className="grid gap-6">
                  <RAGSimulator />
                  <ChunkingStrategyDemo />
                </div>
              </div>
            )}

            {activeSection === "models" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Model Selection & Optimization</h2>
                  <p className="text-muted-foreground mb-6">
                    Compare AI models and understand optimization techniques for different use cases.
                  </p>
                </div>
                
                <div className="grid gap-6">
                  <ModelComparison />
                </div>
              </div>
            )}

            {activeSection === "safety" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">AI Safety & Control</h2>
                  <p className="text-muted-foreground mb-6">
                    Learn to detect hallucinations, implement guardrails, and monitor AI systems.
                  </p>
                </div>
                
                <div className="grid gap-6">
                  <HallucinationDetector />
                </div>
              </div>
            )}

            {activeSection === "advanced" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Advanced AI Topics</h2>
                  <p className="text-muted-foreground mb-6">
                    Explore cutting-edge AI concepts including agents, multimodal systems, and scaling laws.
                  </p>
                </div>
                
                <Card className="p-6">
                  <div className="text-center space-y-4">
                    <TrendingUp className="w-12 h-12 text-primary mx-auto" />
                    <h3 className="text-xl font-semibold">Advanced Concepts</h3>
                    <p className="text-muted-foreground">
                      Advanced demos including AI agents, multimodal fusion, scaling laws, and emergent abilities.
                    </p>
                    <Badge variant="outline">Coming Soon</Badge>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};