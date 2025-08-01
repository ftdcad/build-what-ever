import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, Clock, Target, Zap } from "lucide-react";

export const PromptEngineeringFundamentals = () => {
  const [activeModule, setActiveModule] = useState("psychology");
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  const modules = [
    {
      id: "psychology",
      title: "Psychology of Structure",
      duration: "15 min",
      description: "How prompt structure shapes AI behavior and user experience",
      icon: <Target className="w-5 h-5" />
    },
    {
      id: "claude-case",
      title: "Claude Overreach Case",
      duration: "10 min", 
      description: "Real failure example: How weak prompts cause AI hallucination",
      icon: <AlertTriangle className="w-5 h-5" />
    },
    {
      id: "clear-framework",
      title: "CLEAR Framework",
      duration: "15 min",
      description: "Context-Length-Examples-Actions-Restrictions methodology",
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      id: "meta-prompts",
      title: "Meta-Prompt Lab",
      duration: "10 min",
      description: "Build prompts that interview users before executing",
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: "insurance-workshop",
      title: "Insurance Applications",
      duration: "5 min",
      description: "Transform generic prompts for claims and policy work",
      icon: <Clock className="w-5 h-5" />
    }
  ];

  const toggleComplete = (moduleId: string) => {
    setCompletedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const progress = (completedModules.length / modules.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Prompt Engineering Fundamentals</h2>
        <p className="text-muted-foreground mb-4">
          Learn the architecture of effective prompts through real examples and hands-on practice
        </p>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Module Progress</span>
              <span className="text-sm text-muted-foreground">{completedModules.length}/{modules.length} completed</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Module Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {modules.map((module) => (
          <Button
            key={module.id}
            variant={activeModule === module.id ? "default" : "outline"}
            className="h-auto p-4 flex-col gap-2"
            onClick={() => setActiveModule(module.id)}
          >
            <div className="flex items-center gap-2">
              {module.icon}
              {completedModules.includes(module.id) && (
                <CheckCircle className="w-4 h-4 text-green-500" />
              )}
            </div>
            <div className="text-center">
              <div className="font-medium text-sm">{module.title}</div>
              <div className="text-xs text-muted-foreground">{module.duration}</div>
            </div>
          </Button>
        ))}
      </div>

      {/* Module Content */}
      <div className="space-y-6">
        {activeModule === "psychology" && (
          <PsychologyOfStructure onComplete={() => toggleComplete("psychology")} />
        )}
        
        {activeModule === "claude-case" && (
          <ClaudeOverreachCase onComplete={() => toggleComplete("claude-case")} />
        )}
        
        {activeModule === "clear-framework" && (
          <CLEARFramework onComplete={() => toggleComplete("clear-framework")} />
        )}
        
        {activeModule === "meta-prompts" && (
          <MetaPromptLab onComplete={() => toggleComplete("meta-prompts")} />
        )}
        
        {activeModule === "insurance-workshop" && (
          <InsuranceWorkshop onComplete={() => toggleComplete("insurance-workshop")} />
        )}
      </div>
    </div>
  );
};

// Individual Module Components
const PsychologyOfStructure = ({ onComplete }: { onComplete: () => void }) => {
  const [showComparison, setShowComparison] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Psychology of Structure (15 minutes)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Structure isn't just organization—it's psychological engineering. How you arrange words determines user behavior and AI responses.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Key Insight: "Craft" vs "Run"</h3>
          <p className="text-sm text-muted-foreground">
            One word changes everything. Compare these prompt openings:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-red-200 bg-red-50/50">
              <CardHeader>
                <CardTitle className="text-sm text-red-700">Hard Mode (Overwhelming)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">"Our shared mission is to <strong>craft</strong> a Prompt Blueprint..."</p>
                <p className="text-xs text-muted-foreground mt-2">
                  "Craft" implies work, creation, effort. Users expect complexity.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50/50">
              <CardHeader>
                <CardTitle className="text-sm text-green-700">Easy Mode (Approachable)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">"Our shared mission is to <strong>run</strong> a personal AI-tutor program..."</p>
                <p className="text-xs text-muted-foreground mt-2">
                  "Run" implies it's already built—just press start.
                </p>
              </CardContent>
            </Card>
          </div>

          <Button 
            onClick={() => setShowComparison(!showComparison)}
            variant="outline"
            className="w-full"
          >
            {showComparison ? "Hide" : "Show"} Full Comparison Demo
          </Button>

          {showComparison && (
            <Card className="mt-4">
              <CardContent className="pt-6">
                <Tabs defaultValue="batch" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="batch">Batch Questions (Overwhelming)</TabsTrigger>
                    <TabsTrigger value="single">Single Question (Gentle)</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="batch" className="space-y-4">
                    <div className="bg-red-50 p-4 rounded border border-red-200">
                      <h4 className="font-medium mb-2">Bad: All Questions At Once</h4>
                      <p className="text-sm">Please answer: 1) Your experience level 2) Your learning goals 3) Your time commitment 4) Your preferred style 5) Your current challenges...</p>
                      <Badge variant="destructive" className="mt-2">Cognitive Overload</Badge>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="single" className="space-y-4">
                    <div className="bg-green-50 p-4 rounded border border-green-200">
                      <h4 className="font-medium mb-2">Good: One Question Flow</h4>
                      <p className="text-sm">Let's start with a quick question: What's your current experience with AI prompts? (Beginner/Intermediate/Advanced)</p>
                      <Badge variant="default" className="mt-2">Conversational</Badge>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          <div className="space-y-2">
            <h4 className="font-medium">Practice Exercise:</h4>
            <p className="text-sm text-muted-foreground">
              Transform this overwhelming prompt: "Tell me your: 1) Experience 2) Goals 3) Timeline 4) Budget 5) Constraints"
            </p>
            <Card className="bg-primary/5 border-primary/20 p-4">
              <p className="text-sm font-medium">Your Turn:</p>
              <p className="text-sm text-muted-foreground">
                How would you restructure this as single-question flow? Think about the psychology of each question.
              </p>
            </Card>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={onComplete}>Mark Complete</Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ClaudeOverreachCase = ({ onComplete }: { onComplete: () => void }) => {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          Claude Overreach Case Study (10 minutes)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <AlertDescription>
            Real failure case: Claude hallucinated an entire system rebuild when asked for simple improvements.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">The Failure</h3>
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-sm text-red-700">The Weak Prompt That Caused Hallucination</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 p-3 rounded text-sm font-mono">
                "use this to set you prompt frame how will you apply this along with the bad example i showed what claude did"
              </div>
              <div className="mt-3 space-y-2">
                <Badge variant="destructive">No Context</Badge>
                <Badge variant="destructive">No Boundaries</Badge>
                <Badge variant="destructive">No Format</Badge>
                <Badge variant="destructive">Vague Task</Badge>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-lg font-semibold">What Claude Did Wrong</h3>
          <div className="bg-red-50 p-4 rounded border-l-4 border-red-500">
            <p className="text-sm">
              <strong>Claude's Hallucination:</strong> Instead of simple improvements, Claude invented an entire transformation plan involving:
            </p>
            <ul className="mt-2 text-sm space-y-1 list-disc list-inside">
              <li>Complete navigation restructuring</li>
              <li>New component architecture</li>
              <li>Industry-specific customization</li>
              <li>Advanced user personas (Foundation/Practitioner/Power User)</li>
              <li>Multi-phase implementation plan</li>
            </ul>
            <p className="text-sm mt-2 font-medium text-red-700">
              This was scope creep hallucination—exactly what weak prompts cause.
            </p>
          </div>

          <Button 
            onClick={() => setShowSolution(!showSolution)}
            variant="outline"
            className="w-full"
          >
            {showSolution ? "Hide" : "Show"} How to Prevent This
          </Button>

          {showSolution && (
            <Card className="border-green-200 bg-green-50/50">
              <CardHeader>
                <CardTitle className="text-sm text-green-700">The Strong Prompt That Would Have Prevented It</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-100 p-3 rounded text-sm font-mono">
                  "CONTEXT: I have an existing AI education system with current prompt engineering content.<br/>
                  TASK: Apply the attached document's principles to improve ONLY the current prompt engineering section.<br/>
                  BOUNDARIES: Do not restructure navigation or create new components.<br/>
                  FORMAT: Suggest specific improvements to existing content with examples.<br/>
                  RESTRICTIONS: Maximum 3 actionable suggestions, each under 100 words."
                </div>
                <div className="mt-3 space-y-2">
                  <Badge variant="default">Clear Context</Badge>
                  <Badge variant="default">Specific Task</Badge>
                  <Badge variant="default">Explicit Boundaries</Badge>
                  <Badge variant="default">Output Format</Badge>
                  <Badge variant="default">Word Limits</Badge>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-2">
            <h4 className="font-medium">Key Lesson: CLEAR Framework</h4>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-xs">
              <Card className="p-2 text-center">
                <div className="font-bold text-blue-600">C</div>
                <div>Context</div>
              </Card>
              <Card className="p-2 text-center">
                <div className="font-bold text-blue-600">L</div>
                <div>Length</div>
              </Card>
              <Card className="p-2 text-center">
                <div className="font-bold text-blue-600">E</div>
                <div>Examples</div>
              </Card>
              <Card className="p-2 text-center">
                <div className="font-bold text-blue-600">A</div>
                <div>Actions</div>
              </Card>
              <Card className="p-2 text-center">
                <div className="font-bold text-blue-600">R</div>
                <div>Restrictions</div>
              </Card>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={onComplete}>Mark Complete</Button>
        </div>
      </CardContent>
    </Card>
  );
};

const CLEARFramework = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          CLEAR Framework Workshop (15 minutes)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-muted-foreground">Interactive builder coming soon - practice the 5-component prompt structure.</p>
        <div className="flex justify-end">
          <Button onClick={onComplete}>Mark Complete</Button>
        </div>
      </CardContent>
    </Card>
  );
};

const MetaPromptLab = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Meta-Prompt Creation Lab (10 minutes)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-muted-foreground">Build prompts that interview users first - hands-on practice coming soon.</p>
        <div className="flex justify-end">
          <Button onClick={onComplete}>Mark Complete</Button>
        </div>
      </CardContent>
    </Card>
  );
};

const InsuranceWorkshop = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Insurance Applications Workshop (5 minutes)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-muted-foreground">Transform generic prompts for claims processing and policy analysis.</p>
        <div className="flex justify-end">
          <Button onClick={onComplete}>Mark Complete</Button>
        </div>
      </CardContent>
    </Card>
  );
};