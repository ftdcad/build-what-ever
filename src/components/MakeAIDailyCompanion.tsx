import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Calendar, 
  Coffee, 
  Sun, 
  Moon, 
  CheckCircle, 
  AlertTriangle, 
  Heart, 
  Lightbulb,
  Users,
  MessageSquare,
  Clock,
  Target,
  TrendingUp,
  BookOpen
} from "lucide-react";

export const MakeAIDailyCompanion = () => {
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [trackedItems, setTrackedItems] = useState<{[key: number]: {annoyances: string[], successes: string[], wishes: string[]}}>({});

  const dailyChallenges = [
    {
      day: 1,
      title: "Morning Routine",
      icon: <Sun className="w-5 h-5" />,
      tasks: [
        "What's the weather looking like today?",
        "Give me a positive thought for the day",
        "What should I focus on today?"
      ],
      timeEstimate: "2 minutes"
    },
    {
      day: 2,
      title: "Meal Help",
      icon: <Coffee className="w-5 h-5" />,
      tasks: [
        "What can I make with [ingredients in fridge]?",
        "Is this recipe healthy?",
        "Suggest a quick lunch idea"
      ],
      timeEstimate: "2 minutes"
    },
    {
      day: 3,
      title: "Quick Math & Planning",
      icon: <Target className="w-5 h-5" />,
      tasks: [
        "If I leave at 2:30, what time will I arrive?",
        "Split this restaurant bill 4 ways with 20% tip",
        "Calculate my monthly budget breakdown"
      ],
      timeEstimate: "2 minutes"
    },
    {
      day: 4,
      title: "Writing Help",
      icon: <MessageSquare className="w-5 h-5" />,
      tasks: [
        "Help me reply to this text politely",
        "Make this email sound friendlier",
        "Write a thank you message"
      ],
      timeEstimate: "2 minutes"
    },
    {
      day: 5,
      title: "Learning Something",
      icon: <BookOpen className="w-5 h-5" />,
      tasks: [
        "Explain why the sky is blue",
        "What's happening in [news topic] simply?",
        "Teach me one interesting fact"
      ],
      timeEstimate: "2 minutes"
    },
    {
      day: 6,
      title: "Creative Help",
      icon: <Lightbulb className="w-5 h-5" />,
      tasks: [
        "Give me gift ideas for [person]",
        "Help me plan a fun weekend",
        "Suggest a creative hobby to try"
      ],
      timeEstimate: "2 minutes"
    },
    {
      day: 7,
      title: "Reflection",
      icon: <Moon className="w-5 h-5" />,
      tasks: [
        "What are 3 things I did well this week?",
        "Help me organize my thoughts about [topic]",
        "What should I improve next week?"
      ],
      timeEstimate: "2 minutes"
    }
  ];

  const collaborativeExample = {
    originalChallenge: "You can't customize what you don't use!",
    claude1: "Suggested putting behavior rules first",
    user: "Challenged this approach - felt backwards",
    chatgpt: "Agreed and provided nuanced perspective on both approaches",
    synthesis: "Created the 'Daily Companion' module as the bridge"
  };

  const habitLoops = [
    {
      trigger: "Morning Coffee",
      routine: "Check weather with AI",
      reward: "Better planning for the day"
    },
    {
      trigger: "Stuck on email",
      routine: "Ask AI for help",
      reward: "Clear, professional communication"
    },
    {
      trigger: "Planning dinner",
      routine: "AI recipe search",
      reward: "Delicious, stress-free meal"
    },
    {
      trigger: "Before bed",
      routine: "Ask AI to summarize your day",
      reward: "Sense of accomplishment and clarity"
    }
  ];

  const toggleDayComplete = (day: number) => {
    setCompletedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const progress = (completedDays.length / 7) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">📅 Make AI Your Daily Companion (Week 1)</h2>
        <p className="text-muted-foreground mb-6">
          Build the habit FIRST, then customize. You can't rearrange a kitchen you've only cooked in once!
        </p>
      </div>

      <Tabs defaultValue="why" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="why">Why Daily Use</TabsTrigger>
          <TabsTrigger value="challenge">7-Day Challenge</TabsTrigger>
          <TabsTrigger value="tracking">Track Patterns</TabsTrigger>
          <TabsTrigger value="habits">Habit Loops</TabsTrigger>
          <TabsTrigger value="meta">Meta Learning</TabsTrigger>
        </TabsList>

        <TabsContent value="why" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                The Kitchen Rearrangement Principle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                <p className="text-sm">
                  <strong>You can't customize what you don't use!</strong><br/>
                  It's like trying to rearrange a kitchen you've only cooked in once. How would you know where to put things?
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-600 dark:text-green-400">✅ The Truth About AI "Learning"</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Myth:</strong> "AI learns my preferences over time"</li>
                    <li>• <strong>Reality:</strong> Most AI starts fresh each conversation</li>
                    <li>• <strong>BUT:</strong> YOU learn what works through regular use</li>
                    <li>• <strong>Magic:</strong> After 2 weeks, you'll know EXACTLY what behavior rules you need</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400">🎯 Why Daily Use Matters</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• You discover what you actually need (not what you think you need)</li>
                    <li>• You find your personal friction points (too wordy? too formal?)</li>
                    <li>• You build confidence (it becomes natural)</li>
                    <li>• You earn the right to customize (through experience)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold mb-2">Time Investment Reality Check</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>⏱️ Yes, this takes more time:</strong></p>
                    <p>• Single AI: 30 seconds</p>
                    <p>• Daily practice: 2-3 minutes</p>
                  </div>
                  <div>
                    <p><strong>💎 But consider:</strong></p>
                    <p>• Wrong answer costs: Hours/days/money</p>
                    <p>• Better habits value: Priceless</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenge" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                7-Day AI Challenge: One Small Task Per Day
              </CardTitle>
              <div className="space-y-2">
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-muted-foreground">
                  Progress: {completedDays.length}/7 days completed ({Math.round(progress)}%)
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {dailyChallenges.map((challenge) => (
                  <Card key={challenge.day} className={`${completedDays.includes(challenge.day) ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' : ''}`}>
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            checked={completedDays.includes(challenge.day)}
                            onCheckedChange={() => toggleDayComplete(challenge.day)}
                          />
                          {challenge.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">Day {challenge.day}: {challenge.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {challenge.timeEstimate}
                            </Badge>
                          </div>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {challenge.tasks.map((task, idx) => (
                              <li key={idx}>• "{task}"</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                The Magic Tracking Sheet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">📊 Track Your Annoyances! (This is KEY)</h4>
                <p className="text-sm text-muted-foreground">
                  Keep a note of your daily AI interactions. These patterns become your behavior rules later!
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-red-200 dark:border-red-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-red-600 dark:text-red-400">😤 Daily Frustrations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div>• "I hate when AI..."</div>
                    <div>• "Always too long-winded"</div>
                    <div>• "Uses big words unnecessarily"</div>
                    <div>• "Too cheerful in the morning"</div>
                    <div className="text-xs text-muted-foreground mt-3">
                      👆 These become your behavior rules!
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200 dark:border-green-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-green-600 dark:text-green-400">😊 Success Moments</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div>• "Loved when AI..."</div>
                    <div>• "Perfect recipe suggestion"</div>
                    <div>• "Explained it clearly"</div>
                    <div>• "Saved me time planning"</div>
                    <div className="text-xs text-muted-foreground mt-3">
                      👆 Double down on what works!
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-blue-200 dark:border-blue-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-blue-600 dark:text-blue-400">💡 The "Aha!" Moment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <p>By Day 7, you'll have REAL data:</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-background p-3 rounded border">
                        <div className="font-medium">"Always too cheerful"</div>
                        <div className="text-xs text-muted-foreground">→ Rule: Professional tone</div>
                      </div>
                      <div className="bg-background p-3 rounded border">
                        <div className="font-medium">"Explains too much"</div>
                        <div className="text-xs text-muted-foreground">→ Rule: Be concise</div>
                      </div>
                      <div className="bg-background p-3 rounded border">
                        <div className="font-medium">"Uses jargon"</div>
                        <div className="text-xs text-muted-foreground">→ Rule: Simple language only</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="habits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coffee className="w-5 h-5 text-primary" />
                Build Your AI Habit Loops
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-primary/5 p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">🔄 The Habit Loop Formula</h4>
                <p className="text-sm text-muted-foreground">
                  Trigger (environmental cue) → Routine (AI interaction) → Reward (benefit received)
                </p>
              </div>

              <div className="grid gap-4">
                {habitLoops.map((loop, idx) => (
                  <Card key={idx} className="border-l-4 border-l-primary">
                    <CardContent className="pt-4">
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="font-semibold text-blue-600 dark:text-blue-400 mb-1">🎯 Trigger</div>
                          <div>{loop.trigger}</div>
                        </div>
                        <div>
                          <div className="font-semibold text-purple-600 dark:text-purple-400 mb-1">⚡ Routine</div>
                          <div>{loop.routine}</div>
                        </div>
                        <div>
                          <div className="font-semibold text-green-600 dark:text-green-400 mb-1">🎉 Reward</div>
                          <div>{loop.reward}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200 dark:border-green-800">
                <CardContent className="pt-4">
                  <h4 className="font-semibold mb-2">🌱 Your First Habit (Try This Now!)</h4>
                  <div className="space-y-2 text-sm">
                    <div>1. <strong>Morning trigger:</strong> While your coffee brews...</div>
                    <div>2. <strong>AI routine:</strong> "What's the weather and one thing to look forward to today?"</div>
                    <div>3. <strong>Reward:</strong> Start your day with clarity and positivity</div>
                    <div className="text-xs text-muted-foreground mt-3">
                      After 7 days, this becomes automatic. Then add more loops!
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meta" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Meta-Learning: How This Module Was Created
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                <h4 className="font-semibold mb-2">🔄 This Whole Exchange Proves:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>Single AI</strong> = Limited perspective (Claude missed the obvious)</li>
                  <li>• <strong>Human challenge</strong> = Critical thinking (User caught it)</li>
                  <li>• <strong>Multiple AI</strong> = Complete picture (ChatGPT added nuance)</li>
                  <li>• <strong>Synthesis</strong> = Best outcome (We built something better together)</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">📋 The Collaborative Timeline:</h4>
                <div className="space-y-2">
                  {[
                    { step: "1", actor: "Claude (me)", action: "Suggested putting behavior rules first", color: "blue" },
                    { step: "2", actor: "User", action: "Challenged: 'You can't customize what you don't use!'", color: "green" },
                    { step: "3", actor: "ChatGPT", action: "Agreed and provided nuanced analysis", color: "purple" },
                    { step: "4", actor: "Synthesis", action: "Created this 'Daily Companion' module as the bridge", color: "amber" }
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3 p-3 rounded border-l-4 border-l-primary/30 bg-background">
                      <Badge variant="outline" className="mt-0.5">{item.step}</Badge>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{item.actor}</div>
                        <div className="text-sm text-muted-foreground">{item.action}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-4">
                  <h4 className="font-semibold mb-2">🎯 Key Teaching Moment</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    This exchange demonstrates the collaborative AI principles we're teaching:
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li>• Don't accept AI's first answer (user challenged me)</li>
                    <li>• Use multiple perspectives (brought in ChatGPT)</li>
                    <li>• Synthesize the best parts (created this module)</li>
                    <li>• Practice makes perfect (you're learning by doing)</li>
                  </ul>
                </CardContent>
              </Card>

              <div className="text-center pt-4">
                <Badge variant="secondary" className="px-4 py-2">
                  <Heart className="w-4 h-4 mr-2" />
                  This is how AI mastery really happens: through practice and collaboration
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardContent className="pt-4">
          <div className="text-center space-y-3">
            <h3 className="font-semibold">🎓 Bridge to Behavior Rules</h3>
            <p className="text-sm text-muted-foreground">
              "After a week of daily use, you'll have a list of real frustrations and preferences. 
              <strong> NOW you're ready to set behavior rules that actually matter!</strong>"
            </p>
            <div className="flex justify-center">
              <Badge variant="outline">Next: Foundation Level → Behavior Rules & Customization</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};