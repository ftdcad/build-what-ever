import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Settings, 
  ChefHat, 
  User, 
  Briefcase, 
  GraduationCap, 
  Heart,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Copy,
  RotateCcw
} from 'lucide-react';

const BehaviorRulesModule = () => {
  const [customRules, setCustomRules] = useState({
    tone: '',
    format: '',
    avoid: '',
    always: ''
  });
  
  const [selectedExample, setSelectedExample] = useState('');
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);

  const userTypes = [
    {
      id: 'student',
      title: 'Student',
      icon: GraduationCap,
      description: 'Learning and research focused',
      rules: [
        'Always break complex topics into simple steps',
        'Give me practice questions after explanations',
        'Explain why something is important before diving into details',
        'Use everyday examples I can relate to',
        'Check my understanding with follow-up questions'
      ]
    },
    {
      id: 'professional',
      title: 'Professional',
      icon: Briefcase,
      description: 'Business and efficiency focused',
      rules: [
        'Be concise and professional in tone',
        'Format responses for easy scanning (bullets, numbers)',
        'Skip unnecessary pleasantries and get to the point',
        'Include actionable next steps when relevant',
        'Provide data-backed insights when possible'
      ]
    },
    {
      id: 'retiree',
      title: 'Retiree/Senior',
      icon: Heart,
      description: 'Patient and detailed guidance',
      rules: [
        'Use patient, encouraging language',
        'Provide step-by-step instructions with detail',
        'Avoid technical jargon unless necessary',
        'Repeat important information for clarity',
        'Include context about why something matters'
      ]
    },
    {
      id: 'creative',
      title: 'Creative',
      icon: User,
      description: 'Inspiration and collaboration focused',
      rules: [
        'Be enthusiastic and encouraging about ideas',
        'Offer multiple creative alternatives',
        'Ask thought-provoking questions to spark inspiration',
        'Build on ideas rather than just critique them',
        'Use vivid, descriptive language'
      ]
    }
  ];

  const beforeAfterExamples = [
    {
      scenario: 'Password Reset Help',
      before: "I'd be happy to help you with resetting your password! This is a common request and I'm here to assist. Password resetting is an important security feature that allows users to regain access to their accounts when they've forgotten their credentials. Here's a comprehensive guide...",
      after: "1. Click 'Forgot Password' on login page\n2. Enter your email\n3. Check email for reset link\n4. Create new password\n5. Log in with new password",
      rule: 'Always be concise, skip pleasantries'
    },
    {
      scenario: 'Explaining Photosynthesis',
      before: "Photosynthesis is the process by which plants convert light energy into chemical energy...",
      after: "Think of photosynthesis like a plant's kitchen:\n\n🌱 Ingredients: Sunlight + water + CO2\n🍽️ Recipe: Chlorophyll mixes them together\n🎂 Result: Sugar (food) + oxygen (bonus!)\n\nJust like you need ingredients to bake, plants need these three things to make their food!",
      rule: 'Always use everyday examples and emojis'
    }
  ];

  const buildingSteps = [
    {
      id: 1,
      title: 'Identify Your Style',
      description: 'How do you want AI to talk to you?',
      prompt: 'I want my AI to always speak to me like:'
    },
    {
      id: 2,
      title: 'Define Your Pet Peeves',
      description: 'What annoys you about AI responses?',
      prompt: 'I hate it when AI:'
    },
    {
      id: 3,
      title: 'Specify Your Needs',
      description: 'What do you always need help with?',
      prompt: 'I always need help with:'
    },
    {
      id: 4,
      title: 'Set Your Format',
      description: 'How do you like information presented?',
      prompt: 'I prefer responses that:'
    }
  ];

  const toggleStep = (stepId: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const progress = (completedSteps.length / buildingSteps.length) * 100;

  const generateFinalRules = () => {
    const rules = [];
    if (customRules.tone) rules.push(`Tone: ${customRules.tone}`);
    if (customRules.format) rules.push(`Format: ${customRules.format}`);
    if (customRules.avoid) rules.push(`Never: ${customRules.avoid}`);
    if (customRules.always) rules.push(`Always: ${customRules.always}`);
    return rules.join('\n');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Settings className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Make AI Work YOUR Way</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          You've built the habit and tracked your preferences. Now let's teach AI exactly how YOU like things done.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <ChefHat className="h-4 w-4" />
          <span>Setting up your AI kitchen for perfect results every time</span>
        </div>
      </div>

      <Tabs defaultValue="why" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="why">Why Rules?</TabsTrigger>
          <TabsTrigger value="builder">Rule Builder</TabsTrigger>
          <TabsTrigger value="examples">User Types</TabsTrigger>
          <TabsTrigger value="beforeafter">Before & After</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
          <TabsTrigger value="bridge">Next Level</TabsTrigger>
        </TabsList>

        <TabsContent value="why" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChefHat className="h-5 w-5" />
                The Kitchen Setup Principle
              </CardTitle>
              <CardDescription>
                Remember our kitchen analogy? You've learned to cook (write prompts) and collaborate with other chefs (multiple AIs). 
                Now let's set up YOUR kitchen exactly how you like it.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-destructive">Without Behavior Rules</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span>Say "please be concise" EVERY time</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span>Repeat "explain simply" in every prompt</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span>Get frustrated with long-winded responses</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span>Waste time clarifying preferences</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary">With Behavior Rules</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Set "always be concise" ONCE</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Every response fits your style automatically</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>AI feels like "yours" - personalized assistant</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Save time, reduce frustration</span>
                    </div>
                  </div>
                </div>
              </div>

              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <strong>From Your Daily Tracking:</strong> Remember those annoyances you tracked during your 7-day challenge? 
                  Those become your behavior rules! "Too wordy" → "Always be concise". "Uses jargon" → "Explain in simple terms".
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="builder" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Behavior Rule Builder</CardTitle>
              <CardDescription>
                Let's turn your tracked preferences into clear, actionable rules for AI.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Your Progress</h3>
                  <span className="text-sm text-muted-foreground">{completedSteps.length}/4 completed</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="grid gap-4">
                {buildingSteps.map((step) => (
                  <Card key={step.id} className={`border-2 transition-colors ${
                    completedSteps.includes(step.id) ? 'border-primary bg-primary/5' : 'border-muted'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={completedSteps.includes(step.id)}
                          onCheckedChange={() => toggleStep(step.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 space-y-3">
                          <div>
                            <h4 className="font-medium">{step.title}</h4>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">{step.prompt}</label>
                            <Textarea
                              placeholder="Describe your preference..."
                              value={
                                step.id === 1 ? customRules.tone :
                                step.id === 2 ? customRules.avoid :
                                step.id === 3 ? customRules.always :
                                customRules.format
                              }
                              onChange={(e) => {
                                const field = step.id === 1 ? 'tone' : 
                                             step.id === 2 ? 'avoid' : 
                                             step.id === 3 ? 'always' : 'format';
                                setCustomRules(prev => ({ ...prev, [field]: e.target.value }));
                              }}
                              className="min-h-[80px]"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {progress === 100 && (
                <Card className="border-primary bg-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Your Custom Behavior Rules
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Textarea
                        value={generateFinalRules()}
                        readOnly
                        className="min-h-[120px] font-mono text-sm"
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={() => navigator.clipboard.writeText(generateFinalRules())}
                          variant="outline"
                          size="sm"
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Rules
                        </Button>
                        <Button
                          onClick={() => {
                            setCustomRules({ tone: '', format: '', avoid: '', always: '' });
                            setCompletedSteps([]);
                          }}
                          variant="outline"
                          size="sm"
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Start Over
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {userTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <Card key={type.id} className={`cursor-pointer transition-all ${
                  selectedExample === type.id ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                }`} onClick={() => setSelectedExample(selectedExample === type.id ? '' : type.id)}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IconComponent className="h-5 w-5" />
                      {type.title}
                    </CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {type.rules.map((rule, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{rule}</span>
                        </div>
                      ))}
                    </div>
                    {selectedExample === type.id && (
                      <div className="mt-4 pt-4 border-t">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            const rules = type.rules.join('\n');
                            navigator.clipboard.writeText(rules);
                          }}
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy These Rules
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="beforeafter" className="space-y-6">
          <div className="space-y-6">
            <div className="text-center">
              <Button
                onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                variant="outline"
              >
                {showBeforeAfter ? 'Hide' : 'Show'} Before & After Examples
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {showBeforeAfter && (
              <div className="space-y-6">
                {beforeAfterExamples.map((example, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{example.scenario}</CardTitle>
                      <Badge variant="outline">{example.rule}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-destructive">❌ Before (No Rules)</h4>
                          <div className="p-3 bg-destructive/5 border border-destructive/20 rounded text-sm">
                            {example.before}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium text-primary">✅ After (With Rules)</h4>
                          <div className="p-3 bg-primary/5 border border-primary/20 rounded text-sm whitespace-pre-line">
                            {example.after}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="testing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Testing & Refining Your Rules</CardTitle>
              <CardDescription>
                Your behavior rules aren't set in stone. Here's how to perfect them.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-base">🧪 Test for 3 Days</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>Use your new rules for all AI interactions</p>
                    <p>Notice what works and what doesn't</p>
                    <p>Keep a quick note of any issues</p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-base">📝 Track Results</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>"Still too wordy" → Adjust rules</p>
                    <p>"Perfect tone" → Keep this rule</p>
                    <p>"Needs more examples" → Add rule</p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-base">🔄 Iterate</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>Adjust one rule at a time</p>
                    <p>Test again for a few days</p>
                    <p>Perfect over time, not overnight</p>
                  </CardContent>
                </Card>
              </div>

              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <strong>Pro Tip:</strong> Start with 2-3 simple rules, then add more. 
                  Too many rules at once can make AI responses feel robotic or overly constrained.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bridge" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ready for the Next Level?</CardTitle>
              <CardDescription>
                You've mastered behavior rules. Now let's talk about Custom GPTs and specialized AI assistants.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="text-6xl">🎓</div>
                <h3 className="text-2xl font-bold">Congratulations!</h3>
                <p className="text-lg text-muted-foreground">
                  You now know how to make ANY AI work exactly how you want it to.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg">What You've Learned</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>How to set behavior rules that stick</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Converting frustrations into clear instructions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Testing and refining your AI preferences</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Making AI feel like a personal assistant</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg">What's Next</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-primary" />
                      <span>Custom GPTs: Build specialized assistants</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-primary" />
                      <span>Add files and knowledge to your AI</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-primary" />
                      <span>Share your AI assistants with others</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-primary" />
                      <span>Advanced multi-model workflows</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Remember: Behavior rules are universal. Custom GPTs are specialized tools built on this foundation.
                </p>
                <Button>
                  Continue to Custom GPT Building
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BehaviorRulesModule;