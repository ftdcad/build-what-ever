import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, ArrowRight, Clock, Star, Brain, BookOpen, Shield, Zap } from "lucide-react";

export const LearningPath = () => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const learningSteps = [
    {
      id: 1,
      title: "Getting Started",
      description: "Understand what AI is and why it matters",
      category: "Foundation",
      estimatedTime: "10 min",
      difficulty: "Beginner",
      icon: <Brain className="w-5 h-5" />,
      prerequisites: [],
      whatYouLearn: ["What AI, ML, and LLMs are", "How AI systems work", "Why AI tools are important"],
      section: "getting-started"
    },
    {
      id: 2,
      title: "Essential Terminology",
      description: "Learn key terms and definitions",
      category: "Foundation",
      estimatedTime: "15 min",
      difficulty: "Beginner",
      icon: <BookOpen className="w-5 h-5" />,
      prerequisites: ["Getting Started"],
      whatYouLearn: ["Core AI vocabulary", "Technical terms", "Industry standards"],
      section: "glossary"
    },
    {
      id: 3,
      title: "Temperature Control",
      description: "Master AI creativity and consistency settings",
      category: "Core Concepts",
      estimatedTime: "20 min",
      difficulty: "Beginner",
      icon: <Zap className="w-5 h-5" />,
      prerequisites: ["Essential Terminology"],
      whatYouLearn: ["How temperature affects outputs", "When to use different settings", "Practical applications"],
      section: "fundamentals"
    },
    {
      id: 4,
      title: "Context Windows",
      description: "Understand AI memory and input limitations",
      category: "Core Concepts",
      estimatedTime: "15 min",
      difficulty: "Beginner",
      icon: <Brain className="w-5 h-5" />,
      prerequisites: ["Temperature Control"],
      whatYouLearn: ["Token limits and costs", "Memory management", "Conversation strategies"],
      section: "fundamentals"
    },
    {
      id: 5,
      title: "Model Selection",
      description: "Choose the right AI model for your needs",
      category: "Practical",
      estimatedTime: "25 min",
      difficulty: "Intermediate",
      icon: <Star className="w-5 h-5" />,
      prerequisites: ["Context Windows"],
      whatYouLearn: ["Model comparison", "Cost vs performance", "Use case matching"],
      section: "models"
    },
    {
      id: 6,
      title: "RAG Systems",
      description: "Learn how AI accesses external knowledge",
      category: "Advanced",
      estimatedTime: "30 min",
      difficulty: "Intermediate",
      icon: <BookOpen className="w-5 h-5" />,
      prerequisites: ["Model Selection"],
      whatYouLearn: ["Retrieval Augmented Generation", "Vector databases", "Knowledge bases"],
      section: "rag"
    },
    {
      id: 7,
      title: "API Security",
      description: "Secure API usage and cost management",
      category: "Practical",
      estimatedTime: "25 min",
      difficulty: "Intermediate",
      icon: <Shield className="w-5 h-5" />,
      prerequisites: ["RAG Systems"],
      whatYouLearn: ["API key management", "Rate limiting", "Security best practices"],
      section: "api-security"
    },
    {
      id: 8,
      title: "Safety & Control",
      description: "Implement guardrails and monitoring",
      category: "Advanced",
      estimatedTime: "20 min",
      difficulty: "Advanced",
      icon: <Shield className="w-5 h-5" />,
      prerequisites: ["API Security"],
      whatYouLearn: ["Hallucination detection", "Content filtering", "Quality assurance"],
      section: "safety"
    }
  ];

  const toggleStep = (stepId: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const progressPercentage = (completedSteps.length / learningSteps.length) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Foundation": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Core Concepts": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "Practical": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "Advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">Learning Path Guide</CardTitle>
              <p className="text-muted-foreground mt-1">
                Structured progression from beginner to advanced AI concepts
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedSteps.length} of {learningSteps.length} completed
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Path Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Why Follow This Path?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">📚 Structured Learning</h4>
              <p className="text-sm text-muted-foreground">
                Each step builds on the previous one, ensuring you have the foundation needed for advanced topics.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">⏱️ Time Efficient</h4>
              <p className="text-sm text-muted-foreground">
                Estimated times help you plan your learning sessions and track progress effectively.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🎯 Practical Focus</h4>
              <p className="text-sm text-muted-foreground">
                Learn concepts that you can immediately apply to real-world AI projects and workflows.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🔄 Flexible Pace</h4>
              <p className="text-sm text-muted-foreground">
                Skip ahead if you're familiar with basics, or take your time with complex concepts.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Steps */}
      <div className="space-y-4">
        {learningSteps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const canStart = step.prerequisites.length === 0 || step.prerequisites.every(prereq => 
            learningSteps.find(s => s.title === prereq)?.id && 
            completedSteps.includes(learningSteps.find(s => s.title === prereq)!.id)
          );

          return (
            <Card key={step.id} className={`transition-all ${isCompleted ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' : ''}`}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto"
                    onClick={() => toggleStep(step.id)}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <Circle className="w-6 h-6 text-muted-foreground" />
                    )}
                  </Button>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        {step.icon}
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getCategoryColor(step.category)} variant="secondary">
                          {step.category}
                        </Badge>
                        <Badge className={getDifficultyColor(step.difficulty)} variant="secondary">
                          {step.difficulty}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">{step.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {step.estimatedTime}
                      </div>
                      {step.prerequisites.length > 0 && (
                        <div>
                          Prerequisites: {step.prerequisites.join(", ")}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">What you'll learn:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {step.whatYouLearn.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center gap-2">
                            <ArrowRight className="w-3 h-3" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex justify-between items-center">
                  {!canStart && (
                    <p className="text-sm text-muted-foreground">
                      Complete prerequisites first
                    </p>
                  )}
                  <Button 
                    variant={isCompleted ? "outline" : "default"}
                    disabled={!canStart}
                    className="ml-auto"
                  >
                    {isCompleted ? "Review" : "Start Learning"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Completion Message */}
      {completedSteps.length === learningSteps.length && (
        <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20">
          <CardContent className="pt-6 text-center">
            <div className="space-y-4">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
              <h3 className="text-xl font-semibold text-green-900 dark:text-green-100">
                Congratulations! 🎉
              </h3>
              <p className="text-green-700 dark:text-green-200">
                You've completed the entire AI learning path. You now have a solid foundation 
                in AI concepts and are ready to tackle advanced implementations.
              </p>
              <Button className="mt-4">
                Explore Advanced Topics
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};