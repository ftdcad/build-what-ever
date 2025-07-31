import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
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
  CheckCircle,
  Star,
  TrendingUp,
  Shield,
  Lightbulb,
  BarChart3,
  Calculator,
  Award,
  Sparkles
} from "lucide-react";

interface AIDiscoveryLandingProps {
  onComplete: (discoveryData: any) => void;
}

export const AIDiscoveryLanding: React.FC<AIDiscoveryLandingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [selectedSolution, setSelectedSolution] = useState<string | null>(null);
  const [usageVolume, setUsageVolume] = useState([5000]);
  const [showROICalculator, setShowROICalculator] = useState(false);

  const solutionTypes = [
    {
      id: "assistant",
      title: "AI Assistant",
      description: "Q&A, help desk, information retrieval",
      icon: Bot,
      useCases: ["Customer support", "Internal knowledge base", "FAQ automation"],
      complexity: "Low",
      estimatedCost: "$50-200/month",
      timeToLaunch: "1-2 weeks",
      roi: "250%",
      satisfaction: 4.8,
      testimonial: "Reduced support tickets by 60% in first month",
      successMetrics: { accuracy: 94, response_time: "< 2s", user_satisfaction: 4.8 }
    },
    {
      id: "agent",
      title: "AI Agent",
      description: "Autonomous task execution, workflow automation",
      icon: Zap,
      useCases: ["Process automation", "Task delegation", "Multi-step workflows"],
      complexity: "High",
      estimatedCost: "$200-800/month",
      timeToLaunch: "4-8 weeks",
      roi: "400%",
      satisfaction: 4.7,
      testimonial: "Automated 80% of manual processes",
      successMetrics: { efficiency_gain: 80, error_reduction: 95, time_saved: "15h/week" }
    },
    {
      id: "chatbot",
      title: "AI Chatbot",
      description: "Conversational interfaces, customer service",
      icon: MessageSquare,
      useCases: ["Website chat", "Customer onboarding", "Lead qualification"],
      complexity: "Medium",
      estimatedCost: "$100-400/month",
      timeToLaunch: "2-4 weeks",
      roi: "300%",
      satisfaction: 4.6,
      testimonial: "Increased lead conversion by 45%",
      successMetrics: { conversion_rate: 45, availability: "24/7", response_time: "instant" }
    },
    {
      id: "analyzer",
      title: "Document Analyzer",
      description: "Extract insights from documents/PDFs",
      icon: FileSearch,
      useCases: ["Contract analysis", "Research summarization", "Data extraction"],
      complexity: "Medium",
      estimatedCost: "$150-500/month",
      timeToLaunch: "2-3 weeks",
      roi: "350%",
      satisfaction: 4.5,
      testimonial: "Cut document processing time from hours to minutes",
      successMetrics: { processing_speed: "10x faster", accuracy: 97, cost_reduction: 70 }
    },
    {
      id: "generator",
      title: "Content Generator",
      description: "Marketing copy, articles, creative writing",
      icon: PenTool,
      useCases: ["Blog posts", "Marketing materials", "Product descriptions"],
      complexity: "Low",
      estimatedCost: "$75-300/month",
      timeToLaunch: "1-2 weeks",
      roi: "200%",
      satisfaction: 4.4,
      testimonial: "Scaled content production 5x with same team",
      successMetrics: { content_volume: "5x increase", quality_score: 92, time_saved: "20h/week" }
    },
    {
      id: "recommender",
      title: "Recommendation Engine",
      description: "Product/content recommendations",
      icon: Target,
      useCases: ["E-commerce", "Content platforms", "Personalization"],
      complexity: "High",
      estimatedCost: "$300-1000/month",
      timeToLaunch: "6-12 weeks",
      roi: "500%",
      satisfaction: 4.9,
      testimonial: "Boosted revenue per user by 35%",
      successMetrics: { revenue_lift: 35, engagement: "2x increase", click_rate: 12 }
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
    const scores: Record<string, number> = {};
    
    // Problem-based scoring
    const problemAnswer = answers.problem;
    if (problemAnswer?.includes("customer questions")) {
      scores.assistant = (scores.assistant || 0) + 3;
      scores.chatbot = (scores.chatbot || 0) + 2;
    }
    if (problemAnswer?.includes("business processes")) {
      scores.agent = (scores.agent || 0) + 3;
    }
    if (problemAnswer?.includes("documents")) {
      scores.analyzer = (scores.analyzer || 0) + 3;
    }
    if (problemAnswer?.includes("content")) {
      scores.generator = (scores.generator || 0) + 3;
    }
    if (problemAnswer?.includes("recommendations")) {
      scores.recommender = (scores.recommender || 0) + 3;
    }
    if (problemAnswer?.includes("conversational")) {
      scores.chatbot = (scores.chatbot || 0) + 2;
      scores.assistant = (scores.assistant || 0) + 1;
    }
    
    // Data availability scoring
    const dataAnswer = answers.data;
    if (dataAnswer?.includes("lots of documents")) {
      scores.analyzer = (scores.analyzer || 0) + 2;
      scores.assistant = (scores.assistant || 0) + 1;
    }
    if (dataAnswer?.includes("customer interaction")) {
      scores.chatbot = (scores.chatbot || 0) + 2;
      scores.assistant = (scores.assistant || 0) + 1;
    }
    if (dataAnswer?.includes("behavior/preference")) {
      scores.recommender = (scores.recommender || 0) + 2;
    }
    
    // Timeline scoring
    const timelineAnswer = answers.timeline;
    if (timelineAnswer?.includes("ASAP")) {
      scores.assistant = (scores.assistant || 0) + 1;
      scores.generator = (scores.generator || 0) + 1;
      scores.chatbot = (scores.chatbot || 0) + 1;
    }
    
    // Technical level scoring
    const technicalAnswer = answers.technical;
    if (technicalAnswer?.includes("Non-technical")) {
      scores.assistant = (scores.assistant || 0) + 1;
      scores.chatbot = (scores.chatbot || 0) + 1;
      scores.generator = (scores.generator || 0) + 1;
    }
    if (technicalAnswer?.includes("Full developer")) {
      scores.agent = (scores.agent || 0) + 1;
      scores.recommender = (scores.recommender || 0) + 1;
    }
    
    // Usage volume scoring
    const usageAnswer = answers.usage;
    if (usageAnswer?.includes("Enterprise")) {
      scores.agent = (scores.agent || 0) + 2;
      scores.recommender = (scores.recommender || 0) + 2;
    }
    
    // Sort by score and return top recommendations
    const sorted = Object.entries(scores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);
    
    return sorted.map(([id, score]) => ({ id, score, confidence: Math.min(100, (score / 5) * 100) }));
  };

  const calculateROI = (solutionId: string, volume: number) => {
    const solution = solutionTypes.find(s => s.id === solutionId);
    if (!solution) return { monthlyCost: 0, monthlySavings: 0, roi: 0 };
    
    const baseCost = parseInt(solution.estimatedCost.match(/\$(\d+)/)?.[1] || "100");
    const volumeMultiplier = Math.max(1, volume / 10000);
    const monthlyCost = Math.round(baseCost * volumeMultiplier);
    
    // Estimate savings based on solution type
    const savingsMap: Record<string, number> = {
      assistant: volume * 0.5, // $0.50 per query saved
      agent: volume * 2, // $2 per automation saved
      chatbot: volume * 0.3, // $0.30 per interaction saved
      analyzer: volume * 1.5, // $1.50 per document saved
      generator: volume * 0.8, // $0.80 per content piece saved
      recommender: volume * 3 // $3 per recommendation value
    };
    
    const monthlySavings = Math.round(savingsMap[solutionId] || 0);
    const roi = monthlyCost > 0 ? Math.round(((monthlySavings - monthlyCost) / monthlyCost) * 100) : 0;
    
    return { monthlyCost, monthlySavings, roi };
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
  const selectedSolutionData = selectedSolution ? solutionTypes.find(s => s.id === selectedSolution) : null;
  const roiData = selectedSolution ? calculateROI(selectedSolution, usageVolume[0]) : null;

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
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary text-lg font-medium"
            >
              <Brain className="h-5 w-5 mr-2" />
              Discovery Questions
            </TabsTrigger>
            <TabsTrigger 
              value="solutions" 
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
                         className="justify-start h-auto p-6 text-left text-lg font-medium border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group hover:scale-[1.02] hover:shadow-lg animate-fade-in"
                         style={{ animationDelay: `${index * 0.1}s` }}
                         onClick={() => handleQuestionAnswer(questions[currentStep - 1].id, option)}
                       >
                         <div className="flex items-center w-full">
                           <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent group-hover:scale-110 transition-transform mr-4"></div>
                           <span className="flex-1">{option}</span>
                           <div className="flex items-center gap-2">
                             <Sparkles className="h-4 w-4 text-primary/50 group-hover:text-primary transition-colors" />
                             <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                           </div>
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
            {/* Smart Recommendations */}
            {recommendations.length > 0 && (
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-slide-up">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Brain className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">AI-Powered Recommendations</CardTitle>
                        <CardDescription>
                          Intelligent matches based on your specific requirements
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Smart Match
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {recommendations.map((rec, index) => {
                      const solution = solutionTypes.find(s => s.id === rec.id);
                      if (!solution) return null;
                      const Icon = solution.icon;
                      return (
                        <Card
                          key={rec.id}
                          className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] animate-fade-in ${
                            selectedSolution === rec.id
                              ? "ring-2 ring-primary bg-primary/10 shadow-lg"
                              : "hover:border-primary/50 bg-card/50"
                          }`}
                          style={{ animationDelay: `${index * 0.1}s` }}
                          onClick={() => handleSolutionSelect(rec.id)}
                        >
                          <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                                  <Icon className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                  <CardTitle className="text-xl">{solution.title}</CardTitle>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="secondary" className="bg-primary/20 text-primary">
                                      #{index + 1} Match
                                    </Badge>
                                    <div className="flex items-center gap-1">
                                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                      <span className="text-xs font-medium">{solution.satisfaction}/5</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-primary">
                                  {Math.round(rec.confidence)}%
                                </div>
                                <div className="text-xs text-muted-foreground">Confidence</div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-muted-foreground">{solution.description}</p>
                            
                            {/* Success Metrics */}
                            <div className="grid grid-cols-3 gap-4 p-3 rounded-lg bg-muted/30">
                              {Object.entries(solution.successMetrics).map(([key, value]) => (
                                <div key={key} className="text-center">
                                  <div className="text-lg font-bold text-primary">{value}</div>
                                  <div className="text-xs text-muted-foreground capitalize">{key.replace('_', ' ')}</div>
                                </div>
                              ))}
                            </div>
                            
                            {/* Testimonial */}
                            <div className="p-3 rounded-lg bg-primary/5 border-l-4 border-primary">
                              <p className="text-sm italic text-muted-foreground">"{solution.testimonial}"</p>
                            </div>
                            
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span>{solution.timeToLaunch}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <TrendingUp className="h-4 w-4 text-green-500" />
                                  <span className="text-green-600 font-medium">{solution.roi} ROI</span>
                                </div>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {solution.complexity} Complexity
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* ROI Calculator */}
            {selectedSolution && (
              <Card className="glass-card animate-slide-up border-accent/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-accent" />
                      <CardTitle className="text-xl">ROI Calculator</CardTitle>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowROICalculator(!showROICalculator)}
                    >
                      {showROICalculator ? 'Hide' : 'Show'} Details
                    </Button>
                  </div>
                  <CardDescription>
                    Estimate your return on investment for {selectedSolutionData?.title}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Expected Monthly Volume: {usageVolume[0].toLocaleString()} requests
                    </label>
                    <Slider
                      value={usageVolume}
                      onValueChange={setUsageVolume}
                      max={100000}
                      min={100}
                      step={500}
                      className="w-full"
                    />
                  </div>
                  
                  {roiData && (
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-2xl font-bold text-red-600">
                          ${roiData.monthlyCost.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">Monthly Cost</div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-2xl font-bold text-green-600">
                          ${roiData.monthlySavings.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">Monthly Savings</div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                        <div className="text-2xl font-bold text-primary">
                          {roiData.roi}%
                        </div>
                        <div className="text-sm text-muted-foreground">ROI</div>
                      </div>
                    </div>
                  )}
                  
                  {showROICalculator && roiData && (
                    <div className="space-y-4 p-4 rounded-lg bg-muted/30">
                      <h4 className="font-semibold">12-Month Projection</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>Total Investment: ${(roiData.monthlyCost * 12).toLocaleString()}</div>
                        <div>Total Savings: ${(roiData.monthlySavings * 12).toLocaleString()}</div>
                        <div>Net Benefit: ${((roiData.monthlySavings - roiData.monthlyCost) * 12).toLocaleString()}</div>
                        <div>Payback Period: {roiData.monthlyCost > 0 ? Math.round(roiData.monthlyCost / (roiData.monthlySavings - roiData.monthlyCost)) : 0} months</div>
                      </div>
                    </div>
                  )}
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
                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                   {solutionTypes.map((solution, index) => {
                     const Icon = solution.icon;
                     const isRecommended = recommendations.some(r => r.id === solution.id);
                     const recommendation = recommendations.find(r => r.id === solution.id);
                     return (
                       <Card
                         key={solution.id}
                         className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] animate-fade-in ${
                           selectedSolution === solution.id
                             ? "ring-2 ring-primary bg-primary/10 shadow-lg"
                             : "hover:border-primary/50 bg-card/80"
                         }`}
                         style={{ animationDelay: `${index * 0.1}s` }}
                         onClick={() => handleSolutionSelect(solution.id)}
                       >
                         <CardHeader className="pb-4">
                           <div className="flex items-center justify-between mb-2">
                             <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                               <Icon className="h-6 w-6 text-primary" />
                             </div>
                             {isRecommended && (
                               <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                                 <Award className="h-3 w-3 mr-1" />
                                 Recommended
                               </Badge>
                             )}
                           </div>
                           <div>
                             <CardTitle className="text-xl mb-1">{solution.title}</CardTitle>
                             <div className="flex items-center gap-3">
                               <div className="flex items-center gap-1">
                                 <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                 <span className="text-sm font-medium">{solution.satisfaction}/5</span>
                               </div>
                               <Badge variant="outline" className="text-xs">
                                 {solution.complexity}
                               </Badge>
                               {recommendation && (
                                 <div className="text-xs text-primary font-medium">
                                   {Math.round(recommendation.confidence)}% match
                                 </div>
                               )}
                             </div>
                           </div>
                         </CardHeader>
                         <CardContent className="space-y-4">
                           <p className="text-muted-foreground">{solution.description}</p>
                           
                           {/* Key Metrics */}
                           <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-muted/30">
                             <div className="text-center">
                               <div className="text-lg font-bold text-green-600">{solution.roi}</div>
                               <div className="text-xs text-muted-foreground">ROI</div>
                             </div>
                             <div className="text-center">
                               <div className="text-lg font-bold text-primary">{solution.timeToLaunch}</div>
                               <div className="text-xs text-muted-foreground">Launch Time</div>
                             </div>
                           </div>
                           
                           {/* Use Cases */}
                           <div>
                             <p className="text-sm font-medium mb-2">Popular use cases:</p>
                             <div className="flex flex-wrap gap-1">
                               {solution.useCases.slice(0, 2).map(useCase => (
                                 <Badge key={useCase} variant="outline" className="text-xs">
                                   {useCase}
                                 </Badge>
                               ))}
                               {solution.useCases.length > 2 && (
                                 <Badge variant="outline" className="text-xs opacity-60">
                                   +{solution.useCases.length - 2} more
                                 </Badge>
                               )}
                             </div>
                           </div>
                           
                           {/* Quick Preview */}
                           <div className="flex items-center justify-between text-sm">
                             <div className="flex items-center gap-1">
                               <DollarSign className="h-4 w-4 text-muted-foreground" />
                               <span>{solution.estimatedCost}</span>
                             </div>
                             <Button variant="ghost" size="sm" className="h-6 text-xs">
                               <Lightbulb className="h-3 w-3 mr-1" />
                               Preview
                             </Button>
                           </div>
                         </CardContent>
                       </Card>
                     );
                   })}
                 </div>
              </CardContent>
            </Card>

            {/* Enhanced Continue Section */}
            {selectedSolution && (
              <Card className="glass-card animate-slide-up animate-glow border-primary/20 bg-gradient-to-r from-primary/5 via-transparent to-accent/5">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                    <div className="text-center lg:text-left flex-1">
                      <div className="flex items-center gap-3 justify-center lg:justify-start mb-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                          <Shield className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">
                            Launch Your {selectedSolutionData?.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-muted-foreground">
                              {selectedSolutionData?.satisfaction}/5 customer satisfaction
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-lg mb-4">
                        Our intelligent model laboratory will configure the perfect AI solution for your specific needs.
                      </p>
                      <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>No technical expertise required</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Ready in {selectedSolutionData?.timeToLaunch}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{selectedSolutionData?.roi} average ROI</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      {roiData && (
                        <div className="mb-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
                          <div className="text-sm text-muted-foreground mb-1">Estimated Monthly ROI</div>
                          <div className="text-3xl font-bold text-primary">{roiData.roi}%</div>
                          <div className="text-sm text-green-600">
                            ${(roiData.monthlySavings - roiData.monthlyCost).toLocaleString()} net gain
                          </div>
                        </div>
                      )}
                      <Button 
                        onClick={handleComplete} 
                        size="lg" 
                        className="btn-modern text-lg px-8 py-4 h-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <Sparkles className="h-5 w-5" />
                          <span>Launch AI Builder</span>
                          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        Free to start • No credit card required
                      </p>
                    </div>
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