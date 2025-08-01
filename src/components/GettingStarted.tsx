import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Cpu, MessageSquare, Lightbulb, ArrowRight, BookOpen } from "lucide-react";

export const GettingStarted = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">Welcome to AI Education</CardTitle>
              <p className="text-muted-foreground mt-1">
                Your comprehensive guide to understanding artificial intelligence from the ground up
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">Learn Concepts</h3>
              <p className="text-sm text-muted-foreground">Start with fundamentals</p>
            </div>
            <div className="text-center p-4">
              <Cpu className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">Interactive Demos</h3>
              <p className="text-sm text-muted-foreground">Hands-on practice</p>
            </div>
            <div className="text-center p-4">
              <Lightbulb className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">Real Applications</h3>
              <p className="text-sm text-muted-foreground">Practical use cases</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What is AI Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            What is Artificial Intelligence?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Artificial Intelligence (AI) is technology that enables machines to perform tasks that typically require human intelligence, 
            such as understanding language, recognizing patterns, and making decisions.
          </p>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Real-World Example:</h4>
            <p className="text-sm">
              When you ask Siri a question, AI helps it understand what you're saying, find relevant information, 
              and respond in natural language - just like having a conversation with a knowledgeable assistant.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* AI vs ML vs LLM Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Understanding the Differences</CardTitle>
          <p className="text-muted-foreground">AI, Machine Learning, and Large Language Models explained</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {/* AI */}
            <div className="flex gap-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <Brain className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100">Artificial Intelligence (AI)</h4>
                <p className="text-sm text-blue-700 dark:text-blue-200 mb-2">
                  The broad field of making machines smart
                </p>
                <Badge variant="secondary" className="text-xs">Umbrella Term</Badge>
                <p className="text-xs mt-2 text-muted-foreground">
                  Examples: Chess computers, recommendation systems, voice assistants
                </p>
              </div>
            </div>

            {/* ML */}
            <div className="flex gap-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <Cpu className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-green-900 dark:text-green-100">Machine Learning (ML)</h4>
                <p className="text-sm text-green-700 dark:text-green-200 mb-2">
                  Teaching computers to learn patterns from data
                </p>
                <Badge variant="secondary" className="text-xs">Subset of AI</Badge>
                <p className="text-xs mt-2 text-muted-foreground">
                  Examples: Email spam detection, image recognition, predictive analytics
                </p>
              </div>
            </div>

            {/* LLM */}
            <div className="flex gap-4 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
              <MessageSquare className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-purple-900 dark:text-purple-100">Large Language Models (LLMs)</h4>
                <p className="text-sm text-purple-700 dark:text-purple-200 mb-2">
                  AI systems trained specifically on text to understand and generate human language
                </p>
                <Badge variant="secondary" className="text-xs">Type of AI/ML</Badge>
                <p className="text-xs mt-2 text-muted-foreground">
                  Examples: ChatGPT, Claude, GPT-4 - the "chatbots" you interact with
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              Think of it this way:
            </h4>
            <p className="text-sm text-muted-foreground">
              <strong>AI</strong> is like "being smart" • <strong>ML</strong> is like "learning from experience" • 
              <strong>LLMs</strong> are like "specialists in language and conversation"
            </p>
          </div>
        </CardContent>
      </Card>

      {/* How AI Systems Work */}
      <Card>
        <CardHeader>
          <CardTitle>How AI Systems Work (Simple Overview)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Traditional Computer Programs</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>Follow exact rules written by programmers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>Same input = same output, always</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>Can't handle unexpected situations</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">AI Systems</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Learn patterns from millions of examples</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Make educated guesses on new situations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Adapt and improve with more data</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Simple Analogy:</h4>
            <p className="text-sm text-muted-foreground">
              Traditional programming is like giving someone a detailed recipe to follow exactly. 
              AI is like teaching someone to cook by showing them thousands of different dishes, 
              so they can create something new based on what they've learned.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Why These Tools Matter */}
      <Card>
        <CardHeader>
          <CardTitle>Why Learn About AI Tools?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex gap-3 p-3 border rounded-lg">
              <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">Practical Applications</h4>
                <p className="text-sm text-muted-foreground">
                  AI tools can help with writing, analysis, coding, customer service, and automation
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3 border rounded-lg">
              <Brain className="w-6 h-6 text-blue-500 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">Better Decision Making</h4>
                <p className="text-sm text-muted-foreground">
                  Understanding AI helps you choose the right tools and use them effectively
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3 border rounded-lg">
              <MessageSquare className="w-6 h-6 text-green-500 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">Future-Ready Skills</h4>
                <p className="text-sm text-muted-foreground">
                  AI literacy is becoming as important as computer literacy was 20 years ago
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">Ready to Start Learning?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Now that you understand the basics, you can explore specific topics:
          </p>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary" />
              <span><strong>Glossary:</strong> Learn key terms and definitions</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary" />
              <span><strong>Core Concepts:</strong> Hands-on with temperature, context windows</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary" />
              <span><strong>Learning Path:</strong> Follow a structured progression</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary" />
              <span><strong>Practical Tools:</strong> API keys, security, cost management</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};