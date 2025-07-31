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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            AI Solution Discovery
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let's find the perfect AI solution for your needs. Answer a few questions to get personalized recommendations.
          </p>
        </div>

        <Tabs value={isQuestionsComplete ? "solutions" : "questions"} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="questions" disabled={isQuestionsComplete}>
              Discovery Questions
            </TabsTrigger>
            <TabsTrigger value="solutions" disabled={!isQuestionsComplete}>
              Solution Selection
            </TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-6">
            {/* Progress */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Question {Math.min(currentStep, questions.length)} of {questions.length}</CardTitle>
                  <Badge variant="secondary">{Math.round(progress)}% Complete</Badge>
                </div>
                <Progress value={progress} className="mt-2" />
              </CardHeader>
            </Card>

            {/* Current Question */}
            {currentStep <= questions.length && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {questions[currentStep - 1].title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {questions[currentStep - 1].options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="justify-start h-auto p-4 text-left"
                        onClick={() => handleQuestionAnswer(questions[currentStep - 1].id, option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Summary of answers */}
            {Object.keys(answers).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Answers So Far</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(answers).map(([questionId, answer]) => {
                      const question = questions.find(q => q.id === questionId);
                      return (
                        <div key={questionId} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-medium">{question?.title}</p>
                            <p className="text-muted-foreground">{answer}</p>
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
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Ready to build your {solutionTypes.find(s => s.id === selectedSolution)?.title}?</h3>
                      <p className="text-muted-foreground">We'll guide you through the setup process step by step.</p>
                    </div>
                    <Button onClick={handleComplete} size="lg" className="gap-2">
                      Continue to Model Lab
                      <ArrowRight className="h-4 w-4" />
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