import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, 
  MessageSquare, 
  FileSearch, 
  PenTool, 
  Target, 
  Zap,
  Brain,
  Clock,
  DollarSign,
  Users,
  ArrowRight,
  CheckCircle
} from "lucide-react";

interface AIDiscoveryLandingProps {
  onComplete: (discoveryData: any) => void;
}

export const AIDiscoveryLanding: React.FC<AIDiscoveryLandingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [selectedSolution, setSelectedSolution] = useState<string | null>(null);

  const solutionTypes = [
    {
      id: "assistant",
      title: "AI Assistant",
      description: "Q&A, help desk, information retrieval",
      icon: Bot,
      useCases: ["Customer support", "Internal knowledge base", "FAQ automation"],
      complexity: "Low",
      estimatedCost: "$50-200/month",
      timeToLaunch: "1-2 weeks"
    },
    {
      id: "agent",
      title: "AI Agent",
      description: "Autonomous task execution, workflow automation",
      icon: Zap,
      useCases: ["Process automation", "Task delegation", "Multi-step workflows"],
      complexity: "High",
      estimatedCost: "$200-800/month",
      timeToLaunch: "4-8 weeks"
    },
    {
      id: "chatbot",
      title: "AI Chatbot",
      description: "Conversational interfaces, customer service",
      icon: MessageSquare,
      useCases: ["Website chat", "Customer onboarding", "Lead qualification"],
      complexity: "Medium",
      estimatedCost: "$100-400/month",
      timeToLaunch: "2-4 weeks"
    },
    {
      id: "analyzer",
      title: "Document Analyzer",
      description: "Extract insights from documents/PDFs",
      icon: FileSearch,
      useCases: ["Contract analysis", "Research summarization", "Data extraction"],
      complexity: "Medium",
      estimatedCost: "$150-500/month",
      timeToLaunch: "2-3 weeks"
    },
    {
      id: "generator",
      title: "Content Generator",
      description: "Marketing copy, articles, creative writing",
      icon: PenTool,
      useCases: ["Blog posts", "Marketing materials", "Product descriptions"],
      complexity: "Low",
      estimatedCost: "$75-300/month",
      timeToLaunch: "1-2 weeks"
    },
    {
      id: "recommender",
      title: "Recommendation Engine",
      description: "Product/content recommendations",
      icon: Target,
      useCases: ["E-commerce", "Content platforms", "Personalization"],
      complexity: "High",
      estimatedCost: "$300-1000/month",
      timeToLaunch: "6-12 weeks"
    }
  ];

  const questions = [
    {
      id: "problem",
      title: "What problem are you trying to solve?",
      options: [
        "Answer customer questions automatically",
        "Automate repetitive business processes",
        "Analyze and extract insights from documents",
        "Generate content at scale",
        "Provide personalized recommendations",
        "Create conversational experiences"
      ]
    },
    {
      id: "data",
      title: "Do you have existing data to work with?",
      options: [
        "Yes, lots of documents/knowledge base",
        "Yes, customer interaction data",
        "Yes, user behavior/preference data",
        "Some data, but not organized",
        "No existing data"
      ]
    },
    {
      id: "timeline",
      title: "What's your expected timeline?",
      options: [
        "ASAP (1-2 weeks)",
        "Within a month",
        "2-3 months",
        "6+ months"
      ]
    },
    {
      id: "technical",
      title: "What's your technical comfort level?",
      options: [
        "Non-technical (need ready-to-use solution)",
        "Some technical knowledge",
        "Comfortable with APIs and integrations",
        "Full developer (want to customize everything)"
      ]
    },
    {
      id: "usage",
      title: "Expected usage volume?",
      options: [
        "Low (< 1,000 requests/month)",
        "Medium (1,000 - 10,000 requests/month)",
        "High (10,000 - 100,000 requests/month)",
        "Enterprise (100,000+ requests/month)"
      ]
    }
  ];

  const getRecommendations = () => {
    const problemAnswer = answers.problem;
    if (problemAnswer?.includes("customer questions")) return ["assistant", "chatbot"];
    if (problemAnswer?.includes("business processes")) return ["agent"];
    if (problemAnswer?.includes("documents")) return ["analyzer"];
    if (problemAnswer?.includes("content")) return ["generator"];
    if (problemAnswer?.includes("recommendations")) return ["recommender"];
    if (problemAnswer?.includes("conversational")) return ["chatbot"];
    return [];
  };

  const handleQuestionAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSolutionSelect = (solutionId: string) => {
    setSelectedSolution(solutionId);
  };

  const handleComplete = () => {
    const discoveryData = {
      answers,
      selectedSolution,
      recommendedSolutions: getRecommendations(),
      solutionDetails: solutionTypes.find(s => s.id === selectedSolution)
    };
    onComplete(discoveryData);
  };

  const progress = (currentStep / questions.length) * 100;
  const isQuestionsComplete = currentStep > questions.length;
  const recommendations = getRecommendations();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 wireframe-pattern opacity-30"></div>
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Brain className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI Solution Discovery Platform</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Build Your Perfect
            </span>
            <br />
            <span className="text-foreground">AI Solution</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform your business with intelligent AI systems. Our guided discovery process helps you identify, 
            design, and deploy the perfect AI solution tailored to your specific needs.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>No-code required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>Enterprise-ready</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>Deploy in minutes</span>
            </div>
          </div>
        </div>

        <Tabs value={isQuestionsComplete ? "solutions" : "questions"} className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-12 glass-card h-14">
            <TabsTrigger 
              value="questions" 
              disabled={isQuestionsComplete}
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary text-lg font-medium"
            >
              <Brain className="h-5 w-5 mr-2" />
              Discovery Questions
            </TabsTrigger>
            <TabsTrigger 
              value="solutions" 
              disabled={!isQuestionsComplete}
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary text-lg font-medium"
            >
              <Target className="h-5 w-5 mr-2" />
              Solution Selection
            </TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-8">
            {/* Progress */}
            <Card className="glass-card animate-slide-up">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center mb-4">
                  <CardTitle className="text-2xl font-semibold">
                    Question {Math.min(currentStep, questions.length)} of {questions.length}
                  </CardTitle>
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 px-4 py-2">
                    {Math.round(progress)}% Complete
                  </Badge>
                </div>
                <div className="relative">
                  <Progress value={progress} className="h-3 bg-secondary" />
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </CardHeader>
            </Card>

            {/* Current Question */}
            {currentStep <= questions.length && (
              <Card className="glass-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <CardHeader className="pb-6">
                  <CardTitle className="text-3xl font-bold leading-tight">
                    {questions[currentStep - 1].title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {questions[currentStep - 1].options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="justify-start h-auto p-6 text-left text-lg font-medium border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                        onClick={() => handleQuestionAnswer(questions[currentStep - 1].id, option)}
                      >
                        <div className="flex items-center w-full">
                          <div className="w-2 h-2 rounded-full bg-primary/30 group-hover:bg-primary transition-colors mr-4"></div>
                          <span className="flex-1">{option}</span>
                          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Summary of answers */}
            {Object.keys(answers).length > 0 && (
              <Card className="glass-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Your Discovery Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {Object.entries(answers).map(([questionId, answer]) => {
                      const question = questions.find(q => q.id === questionId);
                      return (
                        <div key={questionId} className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                            <div className="flex-1">
                              <p className="font-medium text-sm text-muted-foreground mb-1">{question?.title}</p>
                              <p className="text-foreground font-medium">{answer}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="solutions" className="space-y-6">
            {/* Recommendations */}
            {recommendations.length > 0 && (
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Recommended for You
                  </CardTitle>
                  <CardDescription>
                    Based on your answers, these solutions match your needs best.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {recommendations.map(solutionId => {
                      const solution = solutionTypes.find(s => s.id === solutionId);
                      if (!solution) return null;
                      const Icon = solution.icon;
                      return (
                        <Card
                          key={solutionId}
                          className={`cursor-pointer transition-all hover:shadow-lg ${
                            selectedSolution === solutionId
                              ? "ring-2 ring-primary bg-primary/5"
                              : "hover:border-primary/50"
                          }`}
                          onClick={() => handleSolutionSelect(solutionId)}
                        >
                          <CardHeader>
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-primary/10">
                                <Icon className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{solution.title}</CardTitle>
                                <Badge variant="secondary">Recommended</Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground mb-4">{solution.description}</p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{solution.timeToLaunch}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                <span>{solution.estimatedCost}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* All Solutions */}
            <Card>
              <CardHeader>
                <CardTitle>All AI Solution Types</CardTitle>
                <CardDescription>
                  Explore all available solutions or choose a different one if you prefer.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {solutionTypes.map(solution => {
                    const Icon = solution.icon;
                    const isRecommended = recommendations.includes(solution.id);
                    return (
                      <Card
                        key={solution.id}
                        className={`cursor-pointer transition-all hover:shadow-lg ${
                          selectedSolution === solution.id
                            ? "ring-2 ring-primary bg-primary/5"
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => handleSolutionSelect(solution.id)}
                      >
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg">{solution.title}</CardTitle>
                              {isRecommended && (
                                <Badge variant="secondary" className="mt-1">
                                  Recommended
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">{solution.description}</p>
                          
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{solution.timeToLaunch}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                <span>{solution.estimatedCost}</span>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-sm font-medium mb-2">Common use cases:</p>
                              <div className="flex flex-wrap gap-1">
                                {solution.useCases.slice(0, 2).map(useCase => (
                                  <Badge key={useCase} variant="outline" className="text-xs">
                                    {useCase}
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
              </CardContent>
            </Card>

            {/* Continue Button */}
            {selectedSolution && (
              <Card className="glass-card animate-slide-up animate-glow">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                      <h3 className="text-2xl font-bold mb-2">
                        Ready to build your {solutionTypes.find(s => s.id === selectedSolution)?.title}?
                      </h3>
                      <p className="text-muted-foreground text-lg">
                        We'll guide you through the setup process with our intelligent model laboratory.
                      </p>
                    </div>
                    <Button 
                      onClick={handleComplete} 
                      size="lg" 
                      className="btn-modern text-lg px-8 py-4 h-auto"
                    >
                      <div className="flex items-center gap-3">
                        <span>Continue to Model Lab</span>
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};