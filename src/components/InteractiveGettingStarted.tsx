import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Brain, CheckCircle, XCircle, ArrowRight, ArrowLeft, Trophy, BookOpen } from "lucide-react";

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface LearningStep {
  id: number;
  title: string;
  content: string;
  example?: string;
  quiz: QuizQuestion;
}

const learningSteps: LearningStep[] = [
  {
    id: 1,
    title: "What Is AI?",
    content: "Artificial Intelligence (AI) is the science of making computers do tasks that normally require human intelligence, such as learning, problem-solving, and decision-making.",
    example: "When you ask Siri a question, AI helps it understand what you're saying and respond naturally.",
    quiz: {
      question: "AI helps computers perform tasks that usually require:",
      options: ["Human intelligence", "Faster processors", "More memory", "Better graphics"],
      correct: 0,
      explanation: "Correct! AI enables computers to perform tasks like learning, reasoning, and decision-making that typically require human intelligence."
    }
  },
  {
    id: 2,
    title: "What Is Machine Learning (ML)?",
    content: "Machine Learning (ML) is a subset of AI. ML systems 'learn' from data and improve their performance over time without being explicitly programmed.",
    example: "Email spam filters learn from examples of spam emails to better detect future spam.",
    quiz: {
      question: "Machine Learning systems improve by:",
      options: ["Following exact rules", "Learning from data", "Getting faster processors", "Having more storage"],
      correct: 1,
      explanation: "Exactly! ML systems learn patterns from data and improve their performance over time without being explicitly programmed for every scenario."
    }
  },
  {
    id: 3,
    title: "What Is a Large Language Model (LLM)?",
    content: "Large Language Models (LLMs) are advanced AI systems trained on massive amounts of text. They can generate, summarize, and understand human language (examples: ChatGPT, Claude, Gemini).",
    example: "ChatGPT is an LLM that can have conversations, write emails, and answer questions in natural language.",
    quiz: {
      question: "LLMs are specifically trained to work with:",
      options: ["Images and videos", "Human language and text", "Numbers and calculations", "Sound and music"],
      correct: 1,
      explanation: "Perfect! LLMs are specifically designed to understand and generate human language, making them excellent for conversations and text-based tasks."
    }
  },
  {
    id: 4,
    title: "How Do AI Systems Work?",
    content: "AI systems use data to recognize patterns and make decisions. They use algorithms (step-by-step rules) to process input (like text, images, or numbers) and generate useful outputs. The more data they have, the better they can learn and perform.",
    example: "Like teaching someone to cook by showing them thousands of different dishes, so they can create something new based on what they've learned.",
    quiz: {
      question: "AI systems get better when they have:",
      options: ["More expensive computers", "More data to learn from", "Faster internet", "Better keyboards"],
      correct: 1,
      explanation: "Correct! AI systems improve their performance as they have access to more data to learn patterns from."
    }
  },
  {
    id: 5,
    title: "Why Are AI Tools Important?",
    content: "AI tools provide efficiency by automating tasks, consistency by reducing human error, insights by analyzing large datasets quickly, and innovation by helping create new services and solve problems faster.",
    quiz: {
      question: "AI tools help with all of these EXCEPT:",
      options: ["Automating repetitive tasks", "Reducing human error", "Replacing human creativity entirely", "Analyzing large amounts of data"],
      correct: 2,
      explanation: "Good catch! AI tools enhance human capabilities but don't replace human creativity entirely. They're designed to support and augment human work."
    }
  },
  {
    id: 6,
    title: "Where Is AI Used?",
    content: "AI is everywhere around us: customer service chatbots, document analysis, fraud detection, claims automation, medical diagnostics, and personal assistants like Siri and Alexa.",
    quiz: {
      question: "Which of these is NOT a common use of AI?",
      options: ["Customer service chatbots", "Reading people's minds", "Email spam detection", "Medical diagnostics"],
      correct: 1,
      explanation: "Exactly! AI cannot read minds. It works with data it can observe and analyze, not private thoughts."
    }
  },
  {
    id: 7,
    title: "Types of AI You'll Encounter",
    content: "There are two main types: Rule-based AI that follows explicit rules (good for simple, predictable tasks) and Learning-based AI (ML/LLM) that learns patterns from data and adapts over time.",
    quiz: {
      question: "Rule-based AI is best for:",
      options: ["Complex creative tasks", "Simple, predictable tasks", "Learning new patterns", "Understanding emotions"],
      correct: 1,
      explanation: "Correct! Rule-based AI excels at simple, predictable tasks where the rules can be clearly defined in advance."
    }
  },
  {
    id: 8,
    title: "Limits of AI",
    content: "AI is only as good as its training data. It can make mistakes, especially with incomplete or biased data. Not every task is suitable for AI—human oversight is critical.",
    quiz: {
      question: "AI systems can make mistakes when:",
      options: ["They process data too quickly", "The training data is incomplete or biased", "They have too much computing power", "They work on weekends"],
      correct: 1,
      explanation: "Exactly! AI quality depends heavily on the data it was trained on. Poor or biased data leads to poor AI performance."
    }
  },
  {
    id: 9,
    title: "How to Use AI Responsibly",
    content: "Always understand what your AI tool is designed to do, verify AI-generated outputs if accuracy is critical, and never share sensitive information unless the system is secure and authorized.",
    quiz: {
      question: "When using AI tools, you should:",
      options: ["Trust every AI answer completely", "Never verify AI outputs", "Always check important AI results", "Share all your personal information"],
      correct: 2,
      explanation: "Perfect! Always verify important AI outputs and be cautious about sharing sensitive information."
    }
  },
  {
    id: 10,
    title: "Your Role as an AI User",
    content: "Use AI tools to support—not replace—good judgment. Provide feedback on tools and results to help improve systems. Keep learning about new capabilities as AI evolves.",
    quiz: {
      question: "AI tools should be used to:",
      options: ["Replace human judgment completely", "Support and enhance human judgment", "Make all decisions automatically", "Eliminate the need for learning"],
      correct: 1,
      explanation: "Exactly! AI tools are most effective when they support and enhance human judgment rather than replacing it entirely."
    }
  }
];

const competencyQuestions: QuizQuestion[] = [
  {
    question: "What does AI stand for?",
    options: ["Automated Information", "Artificial Intelligence", "Advanced Input", "Algorithmic Inference"],
    correct: 1,
    explanation: "AI stands for Artificial Intelligence - the science of making computers perform tasks that typically require human intelligence."
  },
  {
    question: "Machine Learning (ML) is best described as:",
    options: ["Writing computer code by hand", "Computers learning from data and improving over time", "Using calculators for math problems", "Drawing images automatically"],
    correct: 1,
    explanation: "ML enables computers to learn patterns from data and improve their performance over time without explicit programming for each scenario."
  },
  {
    question: "Large Language Models (LLMs) are mainly used for:",
    options: ["Understanding and generating human language", "Controlling robots", "Making phone calls", "Painting pictures"],
    correct: 0,
    explanation: "LLMs are specifically designed to understand and generate human language, making them perfect for text-based interactions."
  },
  {
    question: "Which of the following is an example of AI in action?",
    options: ["A paper calendar", "A spreadsheet with formulas", "An email spam filter", "A printed user manual"],
    correct: 2,
    explanation: "Email spam filters use AI to learn patterns in spam emails and automatically detect future spam messages."
  },
  {
    question: "The more data an AI has, the better it can:",
    options: ["Sleep", "Make phone calls", "Learn patterns and make predictions", "Print documents"],
    correct: 2,
    explanation: "AI systems improve their ability to recognize patterns and make accurate predictions as they have access to more training data."
  },
  {
    question: "Which task is not a good fit for AI?",
    options: ["Automating simple math calculations", "Reading someone's mind", "Sorting email by priority", "Analyzing customer feedback"],
    correct: 1,
    explanation: "AI cannot read minds as it requires observable data to work with. Mind reading involves private thoughts that can't be measured or analyzed."
  },
  {
    question: "What is a risk when using AI tools?",
    options: ["AI never makes mistakes", "AI can produce errors if the data is bad", "AI works best without any data", "AI can read minds"],
    correct: 1,
    explanation: "AI quality is directly tied to the quality of its training data. Poor, incomplete, or biased data can lead to incorrect results."
  },
  {
    question: "What is your responsibility when using AI at work?",
    options: ["Trust every AI answer without review", "Use AI tools to support your decisions and check their outputs", "Never use AI", "Only use AI for personal tasks"],
    correct: 1,
    explanation: "Responsible AI use means leveraging these tools to support your decision-making while always verifying important outputs."
  },
  {
    question: "Why is human oversight important when using AI?",
    options: ["Because AI can get tired", "Because AI always tells jokes", "Because AI can make mistakes or miss context", "Because humans are faster than AI"],
    correct: 2,
    explanation: "AI systems can make errors, miss important context, or produce unexpected results, making human oversight essential for important decisions."
  },
  {
    question: "Which of these is not an AI tool?",
    options: ["ChatGPT", "Siri", "Hammer", "Alexa"],
    correct: 2,
    explanation: "A hammer is a traditional physical tool, while ChatGPT, Siri, and Alexa are all AI-powered digital assistants."
  }
];

export const InteractiveGettingStarted = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [stepAnswers, setStepAnswers] = useState<boolean[]>(new Array(learningSteps.length).fill(false));
  const [showCompetency, setShowCompetency] = useState(false);
  const [competencyAnswers, setCompetencyAnswers] = useState<number[]>(new Array(competencyQuestions.length).fill(-1));
  const [currentCompetencyQuestion, setCurrentCompetencyQuestion] = useState(0);
  const [competencyComplete, setCompetencyComplete] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const isInLearningMode = !showCompetency;
  const totalSteps = learningSteps.length;
  const progressPercentage = ((currentStep + (stepAnswers.filter(Boolean).length)) / totalSteps) * 100;

  const handleStepAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    const isCorrect = parseInt(answer) === learningSteps[currentStep].quiz.correct;
    const newAnswers = [...stepAnswers];
    newAnswers[currentStep] = isCorrect;
    setStepAnswers(newAnswers);
  };

  const nextStep = () => {
    if (currentStep < learningSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedAnswer("");
      setShowFeedback(false);
    } else {
      setShowCompetency(true);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setSelectedAnswer("");
      setShowFeedback(false);
    }
  };

  const handleCompetencyAnswer = (questionIndex: number, answer: number) => {
    const newAnswers = [...competencyAnswers];
    newAnswers[questionIndex] = answer;
    setCompetencyAnswers(newAnswers);
  };

  const submitCompetencyCheck = () => {
    const score = competencyAnswers.reduce((acc, answer, index) => {
      return acc + (answer === competencyQuestions[index].correct ? 1 : 0);
    }, 0);
    setFinalScore(score);
    setCompetencyComplete(true);
  };

  const restartLearning = () => {
    setCurrentStep(0);
    setSelectedAnswer("");
    setShowFeedback(false);
    setStepAnswers(new Array(learningSteps.length).fill(false));
    setShowCompetency(false);
    setCompetencyAnswers(new Array(competencyQuestions.length).fill(-1));
    setCurrentCompetencyQuestion(0);
    setCompetencyComplete(false);
    setFinalScore(0);
  };

  if (showCompetency && !competencyComplete) {
    return (
      <div className="space-y-6">
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-primary" />
              <div>
                <CardTitle className="text-2xl">Competency Check</CardTitle>
                <p className="text-muted-foreground mt-1">
                  Test your understanding with these 10 questions
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-6">
          {competencyQuestions.map((question, index) => (
            <Card key={index} className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">{index + 1}</Badge>
                  <h3 className="font-medium text-lg">{question.question}</h3>
                </div>
                
                <RadioGroup
                  value={competencyAnswers[index]?.toString()}
                  onValueChange={(value) => handleCompetencyAnswer(index, parseInt(value))}
                >
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <RadioGroupItem value={optionIndex.toString()} id={`q${index}-${optionIndex}`} />
                      <Label htmlFor={`q${index}-${optionIndex}`} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => setShowCompetency(false)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Learning
          </Button>
          <Button 
            onClick={submitCompetencyCheck}
            disabled={competencyAnswers.includes(-1)}
            className="flex items-center gap-2"
          >
            Submit Assessment
            <Trophy className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  if (competencyComplete) {
    const percentage = Math.round((finalScore / competencyQuestions.length) * 100);
    const isPassing = percentage >= 70;

    return (
      <div className="space-y-6">
        <Card className={`border-2 ${isPassing ? 'border-green-500/20 bg-green-50/50 dark:bg-green-950/20' : 'border-orange-500/20 bg-orange-50/50 dark:bg-orange-950/20'}`}>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {isPassing ? (
                <CheckCircle className="w-16 h-16 text-green-500" />
              ) : (
                <XCircle className="w-16 h-16 text-orange-500" />
              )}
            </div>
            <CardTitle className="text-3xl">
              {isPassing ? "Congratulations!" : "Keep Learning!"}
            </CardTitle>
            <p className="text-xl font-semibold">
              You scored {finalScore}/{competencyQuestions.length} ({percentage}%)
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-muted-foreground">
                {isPassing 
                  ? "You have a solid understanding of AI fundamentals! You're ready to explore more advanced topics."
                  : "You're on the right track! Review the concepts and try again to strengthen your understanding."
                }
              </p>
            </div>

            {/* Detailed Results */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Detailed Results:</h3>
              {competencyQuestions.map((question, index) => {
                const userAnswer = competencyAnswers[index];
                const isCorrect = userAnswer === question.correct;
                
                return (
                  <Card key={index} className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium">{question.question}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Your answer: {question.options[userAnswer]} 
                            {!isCorrect && (
                              <span className="text-green-600 dark:text-green-400">
                                {" "}(Correct: {question.options[question.correct]})
                              </span>
                            )}
                          </p>
                          <p className="text-sm mt-2 p-2 bg-muted/50 rounded">
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="flex gap-3 justify-center">
              <Button onClick={restartLearning}>
                <BookOpen className="w-4 h-4 mr-2" />
                Start Over
              </Button>
              {!isPassing && (
                <Button variant="outline" onClick={() => {
                  setCompetencyComplete(false);
                  setCompetencyAnswers(new Array(competencyQuestions.length).fill(-1));
                }}>
                  Retake Assessment
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentStepData = learningSteps[currentStep];

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-primary" />
            <div className="flex-1">
              <CardTitle className="text-2xl">AI Fundamentals: Interactive Learning</CardTitle>
              <p className="text-muted-foreground mt-1">
                Step {currentStep + 1} of {totalSteps}: {currentStepData.title}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      {/* Learning Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">{currentStep + 1}</Badge>
            {currentStepData.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              {currentStepData.content}
            </p>
            
            {currentStepData.example && (
              <div className="bg-muted/50 p-4 rounded-lg mt-4">
                <h4 className="font-semibold mb-2">Example:</h4>
                <p className="text-sm">{currentStepData.example}</p>
              </div>
            )}
          </div>

          {/* Quiz Section */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-lg mb-4">Quick Check:</h3>
            <div className="space-y-4">
              <p className="font-medium">{currentStepData.quiz.question}</p>
              
              <RadioGroup value={selectedAnswer} onValueChange={handleStepAnswer}>
                {currentStepData.quiz.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {showFeedback && (
                <div className={`p-4 rounded-lg ${
                  parseInt(selectedAnswer) === currentStepData.quiz.correct 
                    ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
                    : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
                } border`}>
                  <div className="flex items-start gap-2">
                    {parseInt(selectedAnswer) === currentStepData.quiz.correct ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium">
                        {parseInt(selectedAnswer) === currentStepData.quiz.correct ? "Correct!" : "Not quite right."}
                      </p>
                      <p className="text-sm mt-1">{currentStepData.quiz.explanation}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={previousStep}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {currentStep === learningSteps.length - 1 ? (
            <Button onClick={() => setShowCompetency(true)} disabled={!showFeedback}>
              Take Final Assessment
              <Trophy className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={nextStep} disabled={!showFeedback}>
              Next Step
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};