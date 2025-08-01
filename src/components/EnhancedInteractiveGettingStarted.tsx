import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, ArrowRight, ArrowLeft, Lightbulb, Target, Clock } from "lucide-react";

interface MicroLesson {
  id: number;
  title: string;
  content: string;
  example: string;
  diagnosticQ: string;
  options: string[];
  correct: number;
  explanation: string;
  practiceTask?: string;
  estimatedTime: string;
}

const microLessons: MicroLesson[] = [
  {
    id: 1,
    title: "What Is AI?",
    content: "Artificial Intelligence helps computers think and make decisions like humans do. Instead of following exact rules, AI learns patterns and adapts.",
    example: "When you ask Siri 'What's the weather?', AI helps it understand your words, find weather data, and respond naturally - not just follow a script.",
    diagnosticQ: "What's your current experience with AI tools?",
    options: ["Never used any", "Used ChatGPT or Siri occasionally", "Use AI tools regularly", "I build with AI tools"],
    correct: -1, // No wrong answer for diagnostic
    explanation: "Perfect! This helps me customize your learning path.",
    practiceTask: "Try asking an AI assistant (like ChatGPT) a simple question and notice how it responds naturally.",
    estimatedTime: "3 min"
  },
  {
    id: 2,
    title: "Machine Learning Basics",
    content: "Machine Learning is how AI gets smarter. Instead of programming every possible answer, we show AI thousands of examples so it learns patterns.",
    example: "Email spam filters learned by seeing millions of spam emails. Now they can spot new spam they've never seen before.",
    diagnosticQ: "How do you think AI 'learns' to get better?",
    options: ["Someone programs every possible answer", "It learns patterns from examples", "It randomly guesses", "It copies other computers"],
    correct: 1,
    explanation: "Exactly! AI learns by finding patterns in lots of examples, just like how you learned to recognize faces by seeing many different faces.",
    practiceTask: "Think of something you learned through examples (like recognizing dog breeds). That's similar to how AI learns.",
    estimatedTime: "4 min"
  },
  {
    id: 3,
    title: "Large Language Models",
    content: "LLMs like ChatGPT are AI trained on massive amounts of text from books, websites, and articles. This helps them understand and generate human language.",
    example: "ChatGPT read millions of conversations, emails, and articles. That's why it can write in different styles - formal, casual, technical, or creative.",
    diagnosticQ: "What makes ChatGPT good at writing?",
    options: ["It has a huge dictionary", "It learned from millions of text examples", "It's connected to the internet", "Humans write its responses"],
    correct: 1,
    explanation: "Correct! LLMs learn language patterns from enormous amounts of text, allowing them to write naturally in many styles.",
    practiceTask: "Ask ChatGPT to write the same message in formal and casual styles. Notice how it adapts.",
    estimatedTime: "4 min"
  },
  {
    id: 4,
    title: "Why AI Matters Now",
    content: "AI automates boring tasks, reduces errors, analyzes data quickly, and helps solve problems faster. It's like having a super-efficient assistant.",
    example: "AI can read thousands of resumes in minutes, schedule meetings across time zones, or spot patterns in sales data that humans would miss.",
    diagnosticQ: "Which AI benefit interests you most?",
    options: ["Automating repetitive work", "Analyzing data quickly", "Reducing human errors", "Solving complex problems"],
    correct: -1, // No wrong answer
    explanation: "Great choice! All of these are key AI benefits that can transform how we work.",
    practiceTask: "Identify one repetitive task in your work that AI might help with.",
    estimatedTime: "3 min"
  },
  {
    id: 5,
    title: "AI Safety Basics",
    content: "AI sometimes makes mistakes or 'hallucinates' - confidently stating wrong information. Good prompts and verification help prevent this.",
    example: "If you ask AI for medical advice, it might sound confident but be wrong. Always verify important AI outputs with experts.",
    diagnosticQ: "What should you do with important AI-generated information?",
    options: ["Use it immediately", "Verify with reliable sources", "Assume it's always correct", "Never trust AI outputs"],
    correct: 1,
    explanation: "Perfect! AI is powerful but not perfect. Always verify important information, especially for critical decisions.",
    practiceTask: "Next time you use AI, fact-check one important claim it makes.",
    estimatedTime: "4 min"
  }
];

export const EnhancedInteractiveGettingStarted = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<boolean[]>(new Array(microLessons.length).fill(false));
  const [showPractice, setShowPractice] = useState(false);
  const [userLevel, setUserLevel] = useState<string>("");

  const progress = (completedLessons.filter(Boolean).length / microLessons.length) * 100;
  const lesson = microLessons[currentLesson];
  const isCompleted = completedLessons[currentLesson];

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    // Store user level from first diagnostic
    if (currentLesson === 0) {
      const levels = ["Beginner", "Casual User", "Regular User", "Advanced User"];
      setUserLevel(levels[answerIndex] || "Beginner");
    }
  };

  const completeLesson = () => {
    const newCompleted = [...completedLessons];
    newCompleted[currentLesson] = true;
    setCompletedLessons(newCompleted);
    setShowPractice(true);
  };

  const nextLesson = () => {
    if (currentLesson < microLessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowPractice(false);
    }
  };

  const previousLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowPractice(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Foundation: AI Fundamentals (30 minutes)</h2>
        <p className="text-muted-foreground mb-4">
          Learn what AI is and why it matters through micro-lessons and hands-on practice
        </p>
        
        {userLevel && (
          <Alert className="mb-4">
            <Target className="h-4 w-4" />
            <AlertDescription>
              Customized for: <strong>{userLevel}</strong> - Content adapted to your experience level
            </AlertDescription>
          </Alert>
        )}

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedLessons.filter(Boolean).length}/{microLessons.length} lessons completed
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Lesson Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {microLessons.map((_, index) => (
          <Button
            key={index}
            variant={currentLesson === index ? "default" : "outline"}
            size="sm"
            className="min-w-fit flex items-center gap-2"
            onClick={() => {
              setCurrentLesson(index);
              setSelectedAnswer(null);
              setShowFeedback(false);
              setShowPractice(false);
            }}
          >
            <span>{index + 1}</span>
            {completedLessons[index] && <CheckCircle className="w-4 h-4 text-green-500" />}
          </Button>
        ))}
      </div>

      {/* Main Lesson Card */}
      <Card className="min-h-[400px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                {lesson.id}
              </div>
              {lesson.title}
            </CardTitle>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {lesson.estimatedTime}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Concept (≤250 words) */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Concept</h3>
            <p className="text-muted-foreground">{lesson.content}</p>
            
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Real Example</h4>
                  <p className="text-blue-800 text-sm">{lesson.example}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Single Diagnostic Question */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">
              {currentLesson === 0 ? "Quick Question" : "Check Understanding"}
            </h3>
            <p className="font-medium">{lesson.diagnosticQ}</p>
            
            <div className="grid gap-2">
              {lesson.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className="justify-start h-auto p-3 text-left"
                  onClick={() => handleAnswer(index)}
                  disabled={showFeedback}
                >
                  <span className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-sm mr-3">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </Button>
              ))}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  {lesson.explanation}
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Practice Task */}
          {showFeedback && !showPractice && (
            <div className="space-y-4">
              <Button onClick={completeLesson} className="w-full">
                Continue to Practice Task
              </Button>
            </div>
          )}

          {showPractice && lesson.practiceTask && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Practice Task</h3>
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                <p className="text-yellow-800">{lesson.practiceTask}</p>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={nextLesson}
                  disabled={currentLesson >= microLessons.length - 1}
                  className="flex items-center gap-2"
                >
                  Next Lesson <ArrowRight className="w-4 h-4" />
                </Button>
                {currentLesson > 0 && (
                  <Button variant="outline" onClick={previousLesson}>
                    <ArrowLeft className="w-4 h-4" /> Previous
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Completion Message */}
          {currentLesson === microLessons.length - 1 && isCompleted && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6 text-center">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-900 mb-2">Foundation Complete!</h3>
                <p className="text-green-800 mb-4">
                  You've mastered the AI fundamentals. Ready for the next level?
                </p>
                <Button className="bg-green-600 hover:bg-green-700">
                  Continue to Practitioner Level →
                </Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};