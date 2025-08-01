import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, Heart, Coffee, Shield, ArrowRight, User, Zap, Crown } from "lucide-react";

export const IntroductionToAI = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userLevel, setUserLevel] = useState<string | null>(null);

  const steps = [
    {
      id: "welcome",
      title: "Welcome to Your AI Journey",
      content: (
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <Heart className="w-16 h-16 text-primary mx-auto" />
            <h2 className="text-2xl font-bold">You're Safe Here</h2>
            <p className="text-muted-foreground text-lg">
              This is your judgment-free space to learn AI at your own pace.
            </p>
          </div>

          <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/50">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                🐕 Imagine This Scenario...
              </h3>
              <p className="text-green-700 dark:text-green-300">
                You've just been put in the body of someone who has never seen a dog before. 
                You're standing in a park, and a friendly golden retriever approaches. 
                You want to pet it, but you have no idea how.
              </p>
              <p className="text-green-700 dark:text-green-300 mt-3">
                <strong>You would need instructions, right?</strong> Step-by-step guidance on how to approach, 
                where to place your hand, what to watch for in the dog's body language.
              </p>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              AI is exactly the same. It's powerful, but only if you know how to approach it.
            </p>
            <Badge variant="secondary" className="text-sm">
              That's what we're here to teach you
            </Badge>
          </div>
        </div>
      )
    },
    {
      id: "kitchen-analogy",
      title: "Why AI Isn't Magic (But Can Feel Like It)",
      content: (
        <div className="space-y-6">
          <Card className="border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
                <Coffee className="w-5 h-5" />
                The Kitchen Analogy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-orange-700 dark:text-orange-300">
              <p>
                Imagine you've inherited a beautiful kitchen filled with every ingredient and gadget you could want—
                spices, vegetables, fancy mixers, professional knives, the works.
              </p>
              
              <div className="bg-white/50 dark:bg-black/20 p-4 rounded-lg">
                <p className="font-semibold mb-2">But there's a catch:</p>
                <ul className="space-y-1 text-sm">
                  <li>• You don't have a cookbook</li>
                  <li>• You've never seen a recipe</li>
                  <li>• No one's shown you what to do</li>
                </ul>
              </div>

              <p>
                You might be able to make something, but it'll be hit or miss. Most tools will sit unused. 
                You'll waste good ingredients trying things that don't work.
              </p>

              <div className="bg-green-100/50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <p className="font-semibold text-green-800 dark:text-green-200 mb-2">
                  Now imagine someone hands you a great, easy-to-follow cookbook:
                </p>
                <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
                  <li>• You know what goes with what</li>
                  <li>• You learn the tricks (like "don't burn the garlic!")</li>
                  <li>• You feel confident to experiment and create your own dishes</li>
                </ul>
              </div>

              <div className="text-center pt-4">
                <Badge variant="default" className="bg-orange-600 hover:bg-orange-700">
                  AI works exactly the same way
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: "mental-model",
      title: "Your AI Mental Model",
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🥘 Kitchen = AI System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  All the tools and ingredients are there, waiting to be used effectively
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📋 Recipes = Prompts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Clear instructions that tell AI exactly what you want and how to do it
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🧄 Ingredients = Your Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  The details and context you provide to get the results you want
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">👩‍🍳 Chef Skills = Your Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Practice makes perfect - you'll get better with each "dish" you create
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/50">
            <CardContent className="pt-6">
              <div className="text-center space-y-3">
                <Shield className="w-8 h-8 text-blue-600 mx-auto" />
                <h3 className="font-semibold text-blue-800 dark:text-blue-200">
                  Remember: You Can't Break Anything
                </h3>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  Just like learning to cook, you might burn a few dishes at first. 
                  That's completely normal and expected. Every mistake teaches you something valuable.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: "assessment",
      title: "Quick Self-Assessment",
      content: (
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-bold">What's Your Current AI Experience?</h2>
            <p className="text-muted-foreground">
              Choose the option that best describes you. This helps us recommend the right starting point.
            </p>
          </div>

          <div className="grid gap-4">
            <Button
              variant={userLevel === "beginner" ? "default" : "outline"}
              className="h-auto p-6 text-left flex items-start gap-4"
              onClick={() => setUserLevel("beginner")}
            >
              <User className="w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">🌱 Complete Beginner</h3>
                <p className="text-sm text-muted-foreground">
                  I've never used AI or tried it with little success. I want to start from the very beginning.
                </p>
              </div>
            </Button>

            <Button
              variant={userLevel === "intermediate" ? "default" : "outline"}
              className="h-auto p-6 text-left flex items-start gap-4"
              onClick={() => setUserLevel("intermediate")}
            >
              <Zap className="w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">⚡ Some Experience</h3>
                <p className="text-sm text-muted-foreground">
                  I've used ChatGPT or similar tools but want to get much better at prompt engineering.
                </p>
              </div>
            </Button>

            <Button
              variant={userLevel === "advanced" ? "default" : "outline"}
              className="h-auto p-6 text-left flex items-start gap-4"
              onClick={() => setUserLevel("advanced")}
            >
              <Crown className="w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">👑 Advanced User</h3>
                <p className="text-sm text-muted-foreground">
                  I build with AI regularly but want to master advanced techniques and avoid common pitfalls.
                </p>
              </div>
            </Button>
          </div>
        </div>
      )
    },
    {
      id: "next-steps",
      title: "Your Personalized Learning Path",
      content: (
        <div className="space-y-6">
          {userLevel && (
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="text-2xl">
                    {userLevel === "beginner" && "🌱"}
                    {userLevel === "intermediate" && "⚡"}
                    {userLevel === "advanced" && "👑"}
                  </div>
                  <h3 className="text-xl font-semibold">
                    {userLevel === "beginner" && "Perfect! Let's Start with the Basics"}
                    {userLevel === "intermediate" && "Great! Let's Level Up Your Skills"}
                    {userLevel === "advanced" && "Excellent! Let's Master Advanced Techniques"}
                  </h3>
                  <p className="text-muted-foreground">
                    {userLevel === "beginner" && 
                      "We'll start with Foundation concepts using simple, step-by-step lessons that build your confidence gradually."
                    }
                    {userLevel === "intermediate" && 
                      "We'll focus on Practitioner-level prompt engineering to help you avoid common pitfalls and get consistent results."
                    }
                    {userLevel === "advanced" && 
                      "We'll dive into Power User techniques including advanced prompting patterns and multi-model workflows."
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            <h3 className="font-semibold">Recommended Next Steps:</h3>
            
            {userLevel === "beginner" && (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800">
                  <div className="w-6 h-6 rounded-full bg-green-600 text-white text-xs flex items-center justify-center font-bold">1</div>
                  <span className="font-medium dark:text-green-100">🎯 Foundation (30 min)</span>
                  <ArrowRight className="w-4 h-4 ml-auto text-green-600 dark:text-green-400" />
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                  <div className="w-6 h-6 rounded-full bg-muted-foreground text-white text-xs flex items-center justify-center font-bold">2</div>
                  <span className="dark:text-muted-foreground">⚡ Practitioner (when ready)</span>
                </div>
              </div>
            )}

            {userLevel === "intermediate" && (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                  <div className="w-6 h-6 rounded-full bg-muted-foreground text-white text-xs flex items-center justify-center font-bold">1</div>
                  <span className="dark:text-muted-foreground">🎯 Foundation (optional review)</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">2</div>
                  <span className="font-medium dark:text-blue-100">⚡ Practitioner (45 min)</span>
                  <ArrowRight className="w-4 h-4 ml-auto text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            )}

            {userLevel === "advanced" && (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                  <div className="w-6 h-6 rounded-full bg-muted-foreground text-white text-xs flex items-center justify-center font-bold">1</div>
                  <span className="dark:text-muted-foreground">⚡ Practitioner (quick review recommended)</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800">
                  <div className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">2</div>
                  <span className="font-medium dark:text-purple-100">👑 Power User (60 min)</span>
                  <ArrowRight className="w-4 h-4 ml-auto text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            )}
          </div>

          <Card className="border-yellow-200 bg-yellow-50/50 dark:border-yellow-700 dark:bg-yellow-900/20">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <div className="text-yellow-600 mt-1">💡</div>
                <div>
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-100 mb-1">Pro Tip</h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-50">
                    Even if you're advanced, the Practitioner section contains case studies of real AI failures 
                    that can help you avoid expensive mistakes. It's worth a quick review!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Introduction Progress</span>
          <span>{currentStep + 1} of {steps.length}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Main Content */}
      <Card className="min-h-[600px]">
        <CardHeader>
          <CardTitle className="text-2xl">{currentStepData.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {currentStepData.content}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={previousStep}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        
        {currentStep === steps.length - 1 ? (
          <Button className="flex items-center gap-2">
            Start Learning Journey
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button 
            onClick={nextStep}
            disabled={currentStep === 3 && !userLevel}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};