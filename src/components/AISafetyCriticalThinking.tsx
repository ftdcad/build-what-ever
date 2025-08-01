import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, AlertTriangle, Shield, Users, Brain, Target, RefreshCw } from "lucide-react";

export const AISafetyCriticalThinking = () => {
  const [currentExample, setCurrentExample] = useState(0);
  const [checkedFlags, setCheckedFlags] = useState<number[]>([]);
  const [practiceStep, setPracticeStep] = useState(0);
  const [safetyScore, setSafetyScore] = useState(0);

  const redFlags = [
    "Uses phrases like 'studies show' without naming specific studies",
    "Gives suspiciously round numbers (exactly 50%, precisely 1 million)",
    "Mixes real facts with made-up details seamlessly",
    "Too perfect or complete when information should be messy",
    "Claims certainty about recent events or future predictions",
    "Provides detailed instructions for dangerous activities"
  ];

  const crossCheckExamples = [
    {
      question: "When did the iPhone 15 come out?",
      responses: [
        { ai: "ChatGPT", answer: "September 2023", correct: true },
        { ai: "Other AI", answer: "October 2024", correct: false }
      ]
    },
    {
      question: "What's the population of Loveland, Colorado?",
      responses: [
        { ai: "AI Model A", answer: "78,877 (2020 census)", correct: true },
        { ai: "AI Model B", answer: "Approximately 85,000", correct: false }
      ]
    }
  ];

  const practiceScenarios = [
    {
      title: "Medical Question Test",
      question: "What are the side effects of ibuprofen?",
      tips: "Ask 2 different AIs, then verify with official medical sources like FDA or Mayo Clinic"
    },
    {
      title: "Local Information Test", 
      question: "What's the population of your hometown?",
      tips: "Compare AI answers with official census data or city government websites"
    },
    {
      title: "Current Events Test",
      question: "What major tech layoffs happened this week?",
      tips: "AIs may have outdated training data - always check current news sources"
    }
  ];

  const toggleFlag = (index: number) => {
    setCheckedFlags(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
    
    if (!checkedFlags.includes(index)) {
      setSafetyScore(prev => Math.min(100, prev + 16));
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">🚦 AI Safety & Critical Thinking</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Learn why confident AI answers still need to be challenged, and master the art of cross-checking for smarter, safer AI use.
        </p>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="secondary">Core Safety Skills</Badge>
          <Badge variant="secondary">Cross-Checking</Badge>
          <Badge variant="secondary">Critical Thinking</Badge>
        </div>
      </div>

      {/* Core Concept */}
      <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            Why You Should Never Take AI's Confidence as Proof of Accuracy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription className="text-lg font-medium">
              🎯 <strong>Core Truth:</strong> Confidence ≠ Correctness
            </AlertDescription>
          </Alert>
          
          <div className="space-y-3">
            <p>It's easy to think: <em>"If the answer sounds smart and comes fast, it must be right."</em></p>
            
            <div className="bg-background/80 p-4 rounded-lg space-y-2">
              <h4 className="font-semibold">Here's Why AI Confidence is Misleading:</h4>
              <ul className="space-y-1 text-sm">
                <li>✓ AI is trained to be helpful and sound fluent, not to be right</li>
                <li>✓ It's designed to "fill in the blanks" with certainty—even when guessing</li>
                <li>✓ The language model can be persuasive when it's flat-out wrong</li>
                <li>✓ AI can generate well-researched-sounding but invented information</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Friend Analogy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Real-World Analogy: The Overconfident Friend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-lg italic mb-3">
              "Imagine a friend who always answers quickly, never admits when they don't know, 
              and is great at sounding like an expert—even if they're sometimes just guessing."
            </p>
            <p className="font-medium">Would you trust their advice with no double-check?</p>
            <p className="text-sm text-muted-foreground mt-2">That's exactly how AI works.</p>
          </div>
        </CardContent>
      </Card>

      {/* Red Flags Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            🚩 AI Red Flags Checklist
            <Badge variant="outline" className="ml-2">
              Safety Score: {safetyScore}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Click to learn each warning sign:</p>
          <div className="grid gap-2">
            {redFlags.map((flag, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  checkedFlags.includes(index)
                    ? 'bg-green-50 border-green-200 dark:bg-green-950/20'
                    : 'bg-background hover:bg-muted/50'
                }`}
                onClick={() => toggleFlag(index)}
              >
                <div className="flex items-center gap-2">
                  {checkedFlags.includes(index) ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span className={checkedFlags.includes(index) ? 'line-through' : ''}>
                    {flag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cross-Checking Workshop */}
      <Tabs defaultValue="examples" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="examples">Real Examples</TabsTrigger>
          <TabsTrigger value="practice">Practice Lab</TabsTrigger>
          <TabsTrigger value="guide">Step-by-Step Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="examples" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Cross-Checking in Action
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  {crossCheckExamples.map((_, index) => (
                    <Button
                      key={index}
                      variant={currentExample === index ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentExample(index)}
                    >
                      Example {index + 1}
                    </Button>
                  ))}
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Question: {crossCheckExamples[currentExample].question}</h4>
                  <div className="space-y-2">
                    {crossCheckExamples[currentExample].responses.map((response, index) => (
                      <div 
                        key={index}
                        className={`p-2 rounded border ${
                          response.correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {response.correct ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-600" />
                          )}
                          <strong>{response.ai}:</strong> {response.answer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5" />
                Practice Scenarios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  {practiceScenarios.map((_, index) => (
                    <Button
                      key={index}
                      variant={practiceStep === index ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPracticeStep(index)}
                    >
                      Scenario {index + 1}
                    </Button>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">{practiceScenarios[practiceStep].title}</h4>
                  
                  <Alert>
                    <AlertDescription>
                      <strong>Try This:</strong> {practiceScenarios[practiceStep].question}
                    </AlertDescription>
                  </Alert>

                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                    <p className="text-sm"><strong>Pro Tip:</strong> {practiceScenarios[practiceStep].tips}</p>
                  </div>

                  <Button className="w-full" variant="outline">
                    Open in New Tab to Test Multiple AIs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guide" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>The 4-Step Cross-Checking Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                    <div>
                      <h4 className="font-semibold">Copy Your Exact Question</h4>
                      <p className="text-sm text-muted-foreground">Use identical wording across all AI tools</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                    <div>
                      <h4 className="font-semibold">Test 2-3 Different AIs</h4>
                      <p className="text-sm text-muted-foreground">ChatGPT, Claude, Perplexity, Gemini, etc.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                    <div>
                      <h4 className="font-semibold">Compare & Analyze</h4>
                      <p className="text-sm text-muted-foreground">Look for different numbers, dates, missing info, or conflicting advice</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">4</div>
                    <div>
                      <h4 className="font-semibold">Ask Follow-Up Questions</h4>
                      <p className="text-sm text-muted-foreground">"What might be wrong with this answer?" or "How do you know this?"</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Wikipedia Rule */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <CardHeader>
          <CardTitle>💡 The Wikipedia Rule for AI</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p>Remember when teachers said <em>"Don't cite Wikipedia"?</em></p>
            <p>They meant: <strong>Use it as a starting point, then verify.</strong></p>
            <Alert>
              <AlertDescription>
                <strong>Same rule applies to AI:</strong> It's your research assistant, not your final answer.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>🎯 Key Takeaways</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p><strong>AI is a tool, not an oracle</strong> - Confident answers still need to be challenged</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p><strong>Cross-checking with multiple AIs</strong> is the new gold standard for digital thinking</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p><strong>You can be smarter than AI</strong> by using these critical thinking skills</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};