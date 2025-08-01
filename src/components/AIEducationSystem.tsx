import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Zap, Shield, Settings, Database, Code, TrendingUp, Star, Play, Target, Users, Crown } from "lucide-react";

// Import all demo components
import { TemperatureGauge } from "./TemperatureGauge";
import { ContextWindowDemo } from "./ContextWindowDemo";
import { ChunkingStrategyDemo } from "./ChunkingStrategyDemo";
import { RAGSimulator } from "./RAGSimulator";
import { ModelComparison } from "./ModelComparison";
import { HallucinationDetector } from "./HallucinationDetector";
import { DatabaseComparison } from "./DatabaseComparison";
import { QueryComparison } from "./QueryComparison";
import { CompressionAlgorithmsDemo } from "./CompressionAlgorithmsDemo";
import { AICompressionTechniques } from "./AICompressionTechniques";
import { RAGCompressionDemo } from "./RAGCompressionDemo";
import { CompressionLab } from "./CompressionLab";
import { SchemaFundamentals } from "./SchemaFundamentals";
import { RelationalConcepts } from "./RelationalConcepts";
import { ACIDvsBase } from "./ACIDvsBase";
import { DataModelingWorkshop } from "./DataModelingWorkshop";
import { APIKeyManagement } from "./APIKeyManagement";
import { AuthenticationMethods } from "./AuthenticationMethods";
import { RateLimitingDemo } from "./RateLimitingDemo";
import { APISecurityScanner } from "./APISecurityScanner";
import { APICostCalculator } from "./APICostCalculator";
import { ErrorHandlingPlayground } from "./ErrorHandlingPlayground";
import { InteractiveGettingStarted } from "./InteractiveGettingStarted";
import { EnhancedInteractiveGettingStarted } from "./EnhancedInteractiveGettingStarted";
import { AIGlossary } from "./AIGlossary";
import { LearningPath } from "./LearningPath";
import { PromptEngineeringFundamentals } from "./PromptEngineeringFundamentals";

export const AIEducationSystem = () => {
  const [activeSection, setActiveSection] = useState("foundation");

  const sections = [
    // Foundation Level (30 min)
    {
      id: "foundation",
      title: "🎯 Foundation (30 min)",
      icon: <Play className="w-5 h-5" />,
      description: "Complete beginner's guide to AI fundamentals and concepts",
      components: []
    },
    // Practitioner Level (45 min) - NEW PROMPT ENGINEERING FOCUS
    {
      id: "practitioner",
      title: "⚡ Practitioner (45 min)",
      icon: <Target className="w-5 h-5" />,
      description: "Prompt engineering mastery - prevent AI overreach and hallucination",
      components: []
    },
    // Power User Level (60 min)
    {
      id: "power-user",
      title: "👑 Power User (60 min)",
      icon: <Crown className="w-5 h-5" />,
      description: "Advanced prompting patterns and multi-model workflows",
      components: []
    },
    // Reference Library
    {
      id: "glossary",
      title: "📚 Glossary",
      icon: <BookOpen className="w-5 h-5" />,
      description: "Searchable definitions with examples and cross-references",
      components: []
    },
    {
      id: "learning-path",
      title: "🗺️ Learning Path",
      icon: <Star className="w-5 h-5" />,
      description: "Structured progression from beginner to advanced concepts",
      components: []
    },
    {
      id: "fundamentals",
      title: "🧠 Core AI Concepts",
      icon: <Brain className="w-5 h-5" />,
      description: "Essential AI/ML terminology and foundational concepts with interactive demos",
      components: ["temperature", "context", "embeddings"]
    },
    {
      id: "compression",
      title: "AI Compression & Optimization",
      icon: <Code className="w-5 h-5" />,
      description: "Comprehensive guide to compression algorithms and AI optimization techniques",
      components: ["classical-compression", "ai-compression", "rag-compression", "compression-lab"]
    },
    {
      id: "databases",
      title: "Database Fundamentals",
      icon: <Database className="w-5 h-5" />,
      description: "Complete guide to schemas, relationships, ACID vs BASE, and data modeling",
      components: ["schema-fundamentals", "relational-concepts", "acid-base", "data-modeling", "database-comparison", "query-comparison"]
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
      id: "api-security",
      title: "API Keys & Authentication",
      icon: <Shield className="w-5 h-5" />,
      description: "Secure API key management, authentication methods, and error handling",
      components: ["api-key-management", "authentication-methods", "rate-limiting", "security-scanner", "cost-calculator", "error-handling"]
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
              <h1 className="text-3xl font-bold">AI Prompt Engineering Mastery</h1>
              <p className="text-muted-foreground">Prevent AI overreach and hallucination through structured prompting</p>
            </div>
          </div>
          <div className="flex gap-2 text-sm">
            <Badge variant="secondary">Prompt Engineering</Badge>
            <Badge variant="secondary">Claude Case Study</Badge>
            <Badge variant="secondary">CLEAR Framework</Badge>
            <Badge variant="secondary">Interactive Practice</Badge>
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
            {activeSection === "foundation" && (
              <EnhancedInteractiveGettingStarted />
            )}

            {activeSection === "practitioner" && (
              <PromptEngineeringFundamentals />
            )}

            {activeSection === "power-user" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Power User Level (60 minutes)</h2>
                  <p className="text-muted-foreground mb-6">
                    Advanced prompting patterns, multi-model workflows, and semantic space navigation.
                  </p>
                </div>
                
                <Card className="p-6">
                  <div className="text-center space-y-4">
                    <Crown className="w-12 h-12 text-primary mx-auto" />
                    <h3 className="text-xl font-semibold">Advanced Prompting Mastery</h3>
                    <p className="text-muted-foreground">
                      Chain-of-thought reasoning, few-shot learning, semantic space navigation, and reusable template systems.
                    </p>
                    <Badge variant="outline">Coming Soon</Badge>
                  </div>
                </Card>
              </div>
            )}

            {activeSection === "glossary" && (
              <AIGlossary />
            )}

            {activeSection === "learning-path" && (
              <LearningPath />
            )}

            {activeSection === "fundamentals" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Core AI Concepts</h2>
                  <p className="text-muted-foreground mb-6">
                    Master the fundamental building blocks of AI systems with interactive demonstrations.
                  </p>
                  
                  {/* Enhanced Introduction */}
                  <Card className="mb-6 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <h4 className="font-semibold mb-2">Prerequisites:</h4>
                          <p className="text-muted-foreground">Basic understanding of AI terminology (check Glossary if needed)</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">What you'll learn:</h4>
                          <p className="text-muted-foreground">How to control AI behavior, manage memory limits, and optimize performance</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Why it matters:</h4>
                          <p className="text-muted-foreground">These are the essential controls for getting consistent, cost-effective AI results</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid gap-6">
                  <TemperatureGauge />
                  <ContextWindowDemo />
                </div>
              </div>
            )}

            {activeSection === "compression" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">AI Compression & Optimization</h2>
                  <p className="text-muted-foreground mb-6">
                    Deep dive into compression algorithms, from classical techniques to AI-specific optimizations and practical applications.
                  </p>
                </div>
                
                <div className="grid gap-6">
                  <CompressionAlgorithmsDemo />
                  <AICompressionTechniques />
                  <RAGCompressionDemo />
                  <CompressionLab />
                </div>
              </div>
            )}

            {activeSection === "databases" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Database Fundamentals</h2>
                  <p className="text-muted-foreground mb-6">
                    Master database concepts from schemas and relationships to ACID properties and data modeling strategies.
                  </p>
                </div>
                
                <div className="grid gap-6">
                  <SchemaFundamentals />
                  <RelationalConcepts />
                  <ACIDvsBase />
                  <DataModelingWorkshop />
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

            {activeSection === "api-security" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">API Keys & Authentication</h2>
                  <p className="text-muted-foreground mb-6">
                    Master secure API key management, authentication methods, cost optimization, and robust error handling for production AI applications.
                  </p>
                </div>
                
                <div className="grid gap-6">
                  <APIKeyManagement />
                  <AuthenticationMethods />
                  <RateLimitingDemo />
                  <APISecurityScanner />
                  <APICostCalculator />
                  <ErrorHandlingPlayground />
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