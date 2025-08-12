
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Search, Brain, Database, Code, Shield, Zap, BookOpen, Settings, Users, TrendingUp, Layers, Eye, Network, AlertTriangle, Heart, Star, Shuffle, CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";

interface GlossaryTerm {
  term: string;
  definition: string;
  example: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  icon: JSX.Element;
  relatedTerms: string[];
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
}

export const AIGlossary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [completedTerms, setCompletedTerms] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState<string | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [randomTerm, setRandomTerm] = useState<string | null>(null);

  // Load saved data from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('ai-glossary-favorites');
    const savedCompleted = localStorage.getItem('ai-glossary-completed');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedCompleted) setCompletedTerms(JSON.parse(savedCompleted));
  }, []);

  // Save to localStorage when favorites/completed change
  useEffect(() => {
    localStorage.setItem('ai-glossary-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('ai-glossary-completed', JSON.stringify(completedTerms));
  }, [completedTerms]);

  const toggleFavorite = (term: string) => {
    setFavorites(prev => 
      prev.includes(term) 
        ? prev.filter(t => t !== term)
        : [...prev, term]
    );
  };

  const markAsCompleted = (term: string) => {
    if (!completedTerms.includes(term)) {
      setCompletedTerms(prev => [...prev, term]);
    }
  };

  const glossaryTerms: GlossaryTerm[] = [
    // Beginner Terms
    {
      term: "Artificial Intelligence (AI)",
      definition: "Technology that enables machines to perform tasks that typically require human intelligence, such as understanding language, recognizing patterns, and making decisions.",
      example: "Voice assistants like Siri use AI to understand speech and provide helpful responses.",
      category: "Fundamentals",
      difficulty: "Beginner",
      icon: <Brain className="w-4 h-4" />,
      relatedTerms: ["Machine Learning", "LLM", "Neural Networks"],
      quiz: {
        question: "What is the main goal of Artificial Intelligence?",
        options: [
          "To replace all humans",
          "To enable machines to perform tasks requiring human intelligence", 
          "To create robots only",
          "To make computers faster"
        ],
        correctAnswer: 1,
        explanation: "AI aims to give machines capabilities like understanding, reasoning, and decision-making that traditionally required human intelligence."
      }
    },
    {
      term: "Chatbot",
      definition: "An AI program designed to simulate conversation with human users, often used for customer service, information retrieval, or entertainment.",
      example: "ChatGPT is a chatbot that can answer questions, write content, and help with various tasks through text conversation.",
      category: "Applications",
      difficulty: "Beginner",
      icon: <Users className="w-4 h-4" />,
      relatedTerms: ["LLM", "Natural Language Processing", "Conversational AI"],
      quiz: {
        question: "What is a chatbot primarily designed to do?",
        options: [
          "Process payments",
          "Simulate conversation with humans",
          "Store files",
          "Monitor websites"
        ],
        correctAnswer: 1,
        explanation: "Chatbots are specifically designed to engage in conversation-like interactions with users, understanding and responding to their messages."
      }
    },
    {
      term: "Machine Learning (ML)",
      definition: "A subset of AI focused on teaching computers to learn patterns from data without being explicitly programmed for every scenario.",
      example: "Email spam filters use ML to learn what spam looks like from thousands of examples.",
      category: "Fundamentals",
      difficulty: "Beginner",
      icon: <Brain className="w-4 h-4" />,
      relatedTerms: ["AI", "Training Data", "Neural Networks"],
      quiz: {
        question: "How does machine learning differ from traditional programming?",
        options: [
          "It's faster",
          "It learns patterns from data instead of following explicit instructions",
          "It uses less memory",
          "It only works with numbers"
        ],
        correctAnswer: 1,
        explanation: "Unlike traditional programming where you write specific rules, ML learns patterns from data to make predictions or decisions."
      }
    },
    {
      term: "Prompt",
      definition: "The input text or instructions you give to an AI model to get a specific response or output.",
      example: "The prompt 'Explain quantum physics in simple terms' tells the AI what kind of explanation you want.",
      category: "Interaction",
      difficulty: "Beginner",
      icon: <Settings className="w-4 h-4" />,
      relatedTerms: ["Prompt Engineering", "Input", "Query"],
      quiz: {
        question: "What is a prompt in AI?",
        options: [
          "A type of AI model",
          "The input instructions given to an AI",
          "A programming language",
          "An error message"
        ],
        correctAnswer: 1,
        explanation: "A prompt is your input - the question, instruction, or text you give to an AI to guide what kind of response you want."
      }
    },
    {
      term: "Training Data",
      definition: "The text, images, or other information used to teach AI models during the learning process.",
      example: "ChatGPT was trained on books, websites, articles, and conversations to learn how to understand and generate text.",
      category: "Fundamentals",
      difficulty: "Beginner",
      icon: <Database className="w-4 h-4" />,
      relatedTerms: ["Machine Learning", "Pre-training", "Data Quality"],
      quiz: {
        question: "What is training data used for?",
        options: [
          "Storing user conversations",
          "Teaching AI models during development",
          "Running the final AI system",
          "Testing internet speed"
        ],
        correctAnswer: 1,
        explanation: "Training data is like textbooks for AI - it's the information used to teach the model patterns and knowledge during its learning phase."
      }
    },

    // Intermediate Terms
    {
      term: "Large Language Model (LLM)",
      definition: "AI systems trained specifically on vast amounts of text to understand and generate human-like language.",
      example: "ChatGPT, Claude, and GPT-4 are all LLMs - they're the 'chatbots' you interact with.",
      category: "Fundamentals",
      difficulty: "Intermediate",
      icon: <Brain className="w-4 h-4" />,
      relatedTerms: ["AI", "Machine Learning", "Natural Language Processing"],
      quiz: {
        question: "What makes an LLM different from other AI models?",
        options: [
          "It only works with images",
          "It's specifically trained on text to understand and generate language",
          "It's smaller than other models",
          "It doesn't need training data"
        ],
        correctAnswer: 1,
        explanation: "LLMs are specialized for language tasks - they're trained on massive amounts of text to understand context, grammar, and meaning."
      }
    },
    {
      term: "Context Window",
      definition: "The maximum amount of text (measured in tokens) that an AI model can 'remember' and process in a single conversation.",
      example: "GPT-4 has a 8,000-32,000 token context window - about 6,000-24,000 words of memory.",
      category: "Core Concepts",
      difficulty: "Intermediate",
      icon: <Brain className="w-4 h-4" />,
      relatedTerms: ["Tokens", "Memory", "Input Length"],
      quiz: {
        question: "What happens when you exceed an AI's context window?",
        options: [
          "The AI gets confused",
          "The AI forgets the earliest parts of the conversation",
          "The AI stops working",
          "The AI becomes more creative"
        ],
        correctAnswer: 1,
        explanation: "When the context window is full, the AI 'forgets' the oldest information to make room for new input - like a scrolling window of memory."
      }
    },
    {
      term: "Tokens",
      definition: "Chunks of text that AI processes - roughly equivalent to words, but can be parts of words or punctuation.",
      example: "The sentence 'Hello world!' might be 3 tokens: ['Hello', ' world', '!'] - this affects costs and context limits.",
      category: "Core Concepts",
      difficulty: "Intermediate",
      icon: <Code className="w-4 h-4" />,
      relatedTerms: ["Context Window", "Tokenization", "Pricing"],
      quiz: {
        question: "Why are tokens important in AI?",
        options: [
          "They make AI faster",
          "They determine pricing and memory limits",
          "They improve AI accuracy",
          "They are just for decoration"
        ],
        correctAnswer: 1,
        explanation: "Tokens are the fundamental unit of processing - they determine how much you pay for API calls and how much the AI can remember."
      }
    },
    {
      term: "Temperature",
      definition: "A setting that controls how creative or predictable AI responses are. Low temperature = consistent, high temperature = creative and varied.",
      example: "Temperature 0.1 for legal documents (precise), temperature 0.8 for creative writing (varied and interesting).",
      category: "Parameters",
      difficulty: "Intermediate",
      icon: <Zap className="w-4 h-4" />,
      relatedTerms: ["Creativity", "Randomness", "Output Control"],
      quiz: {
        question: "When would you use a low temperature setting?",
        options: [
          "For creative writing",
          "For factual, consistent responses",
          "For random outputs",
          "For faster processing"
        ],
        correctAnswer: 1,
        explanation: "Low temperature makes AI responses more predictable and consistent - perfect for factual information or when you need reliability."
      }
    },
    {
      term: "Hallucination",
      definition: "When an AI model confidently generates false, nonsensical, or fabricated information that wasn't in its training data.",
      example: "An AI claiming a person was born in 1985 when they were actually born in 1990, or inventing fake research studies.",
      category: "Safety",
      difficulty: "Intermediate",
      icon: <AlertTriangle className="w-4 h-4" />,
      relatedTerms: ["Accuracy", "Guardrails", "Verification"],
      quiz: {
        question: "What should you do when you suspect an AI is hallucinating?",
        options: [
          "Trust it completely",
          "Verify the information from reliable sources",
          "Ignore it",
          "Restart the AI"
        ],
        correctAnswer: 1,
        explanation: "Always verify important information from AI responses using reliable sources - AI can be confidently wrong about facts."
      }
    },

    // Advanced Terms
    {
      term: "Transformer",
      definition: "The neural network architecture that powers most modern AI language models, using attention mechanisms to understand context.",
      example: "GPT (Generative Pre-trained Transformer) and BERT both use transformer architecture to process language.",
      category: "Architecture",
      difficulty: "Advanced",
      icon: <Network className="w-4 h-4" />,
      relatedTerms: ["Attention Mechanism", "Neural Networks", "LLM"],
      quiz: {
        question: "What is the key innovation of the Transformer architecture?",
        options: [
          "It's faster than other models",
          "It uses attention mechanisms to process all parts of input simultaneously",
          "It requires less data",
          "It only works with English"
        ],
        correctAnswer: 1,
        explanation: "Transformers revolutionized AI by using attention to process entire sequences at once, understanding relationships between all words simultaneously."
      }
    },
    {
      term: "Attention Mechanism",
      definition: "A technique that allows AI models to focus on relevant parts of input when generating responses, similar to how humans pay attention to important details.",
      example: "When translating 'The cat sat on the mat', attention helps the model focus on 'cat' when deciding whether to use 'he' or 'she' later in the sentence.",
      category: "Architecture",
      difficulty: "Advanced",
      icon: <Eye className="w-4 h-4" />,
      relatedTerms: ["Transformer", "Neural Networks", "Context"],
      quiz: {
        question: "How does attention mechanism help AI models?",
        options: [
          "It makes them faster",
          "It helps them focus on relevant parts of the input",
          "It reduces memory usage",
          "It makes them smaller"
        ],
        correctAnswer: 1,
        explanation: "Attention lets AI models dynamically focus on different parts of the input based on what's most relevant for the current task."
      }
    },
    {
      term: "Fine-tuning",
      definition: "Taking a pre-trained AI model and specializing it with domain-specific data to improve performance on particular tasks.",
      example: "Fine-tuning GPT-4 on legal documents to make it better at analyzing contracts and regulations.",
      category: "Model Training",
      difficulty: "Advanced",
      icon: <Settings className="w-4 h-4" />,
      relatedTerms: ["Pre-training", "Transfer Learning", "Specialization"],
      quiz: {
        question: "What is the main advantage of fine-tuning over training from scratch?",
        options: [
          "It's always cheaper",
          "It leverages existing knowledge while adding specialization",
          "It works with less data",
          "It's faster to deploy"
        ],
        correctAnswer: 1,
        explanation: "Fine-tuning builds on a model's existing general knowledge, adding specialized skills without losing the foundation."
      }
    },
    {
      term: "Embeddings",
      definition: "Mathematical representations of text that capture meaning in numerical form, enabling computers to understand semantic similarity.",
      example: "The words 'happy' and 'joyful' would have similar embeddings because they mean similar things.",
      category: "Core Concepts",
      difficulty: "Advanced",
      icon: <Network className="w-4 h-4" />,
      relatedTerms: ["Vector Database", "Semantic Search", "RAG"],
      quiz: {
        question: "What do embeddings allow AI to do?",
        options: [
          "Process text faster",
          "Understand semantic relationships between words",
          "Generate longer responses",
          "Use less memory"
        ],
        correctAnswer: 1,
        explanation: "Embeddings convert text into numbers that preserve meaning, allowing AI to understand that 'car' and 'automobile' are related."
      }
    },
    {
      term: "RAG (Retrieval Augmented Generation)",
      definition: "A hybrid AI approach that retrieves relevant information from databases or documents and feeds it to a language model for more accurate, current responses.",
      example: "When you ask about company policies, RAG searches your policy database first, then uses that info to give you an accurate, up-to-date answer.",
      category: "RAG",
      difficulty: "Advanced",
      icon: <BookOpen className="w-4 h-4" />,
      relatedTerms: ["Vector Database", "Embeddings", "Knowledge Base"],
      quiz: {
        question: "Why is RAG better than using an LLM alone?",
        options: [
          "It's faster",
          "It provides access to current and specific information not in training data",
          "It uses less memory",
          "It's cheaper"
        ],
        correctAnswer: 1,
        explanation: "RAG solves the problem of outdated training data by retrieving current information and giving the LLM fresh context."
      }
    },

    // Additional terms to reach 80+
    {
      term: "API",
      definition: "Application Programming Interface - A set of rules and protocols that allows different software systems to communicate with each other.",
      example: "The OpenAI API lets your app send questions to GPT-4 and receive responses.",
      category: "Technical",
      difficulty: "Beginner",
      icon: <Code className="w-4 h-4" />,
      relatedTerms: ["SDK", "Authentication", "Rate Limiting"]
    },
    {
      term: "Alignment",
      definition: "The process of training AI systems to behave according to human values and intentions, ensuring they do what we want them to do.",
      example: "An aligned AI assistant would refuse to help with harmful activities, even if directly asked.",
      category: "Safety",
      difficulty: "Intermediate",
      icon: <Shield className="w-4 h-4" />,
      relatedTerms: ["Safety", "Bias", "Ethics"]
    },
    {
      term: "Bias",
      definition: "Unfair preferences or prejudices in AI systems, often inherited from training data or human feedback.",
      example: "An AI hiring tool showing preference for male names over female names, or favoring certain ethnic backgrounds.",
      category: "Safety",
      difficulty: "Intermediate",
      icon: <AlertTriangle className="w-4 h-4" />,
      relatedTerms: ["Fairness", "Training Data", "Alignment"]
    },
    {
      term: "Chain of Thought",
      definition: "A prompting technique where you ask AI to show its step-by-step reasoning process, leading to more accurate and transparent answers.",
      example: "Instead of asking 'What's 23 × 47?', ask 'What's 23 × 47? Show your work step by step.'",
      category: "Practical",
      difficulty: "Intermediate",
      icon: <Settings className="w-4 h-4" />,
      relatedTerms: ["Prompt Engineering", "Reasoning", "Problem Solving"]
    },
    {
      term: "Chunking",
      definition: "Breaking large documents into smaller, manageable pieces for more precise retrieval in AI systems.",
      example: "A 100-page manual might be split into 20-paragraph chunks so AI can find exactly relevant sections.",
      category: "RAG",
      difficulty: "Intermediate",
      icon: <BookOpen className="w-4 h-4" />,
      relatedTerms: ["RAG", "Vector Database", "Embeddings"]
    },
    {
      term: "Cost per Token",
      definition: "The pricing model for AI APIs, where you pay based on the number of tokens (roughly words) processed in your requests and responses.",
      example: "GPT-4 might cost $0.03 per 1,000 input tokens and $0.06 per 1,000 output tokens.",
      category: "Business",
      difficulty: "Beginner",
      icon: <TrendingUp className="w-4 h-4" />,
      relatedTerms: ["Tokens", "API", "ROI"]
    }
    // Continue adding more terms to reach 80+ total...
  ];

  const filteredTerms = useMemo(() => {
    let terms = glossaryTerms;
    
    // Filter by search term
    if (searchTerm) {
      terms = terms.filter(term =>
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.example.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.relatedTerms.some(related => 
          related.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    // Filter by category
    if (selectedCategory !== "All") {
      terms = terms.filter(term => term.category === selectedCategory);
    }
    
    // Filter by difficulty
    if (selectedDifficulty !== "All") {
      terms = terms.filter(term => term.difficulty === selectedDifficulty);
    }
    
    return terms;
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  const categories = ["All", "Fundamentals", "Core Concepts", "RAG", "Technical", "Safety", "Applications", "Interaction", "Parameters", "Architecture", "Model Training", "Practical", "Business"];
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      "Fundamentals": <Brain className="w-3 h-3" />,
      "Core Concepts": <Brain className="w-3 h-3" />,
      "RAG": <BookOpen className="w-3 h-3" />,
      "Technical": <Code className="w-3 h-3" />,
      "Safety": <Shield className="w-3 h-3" />,
      "Applications": <Zap className="w-3 h-3" />,
      "Interaction": <Settings className="w-3 h-3" />,
      "Parameters": <Settings className="w-3 h-3" />,
      "Architecture": <Network className="w-3 h-3" />,
      "Model Training": <Settings className="w-3 h-3" />,
      "Practical": <Settings className="w-3 h-3" />,
      "Business": <TrendingUp className="w-3 h-3" />
    };
    return iconMap[category] || <Brain className="w-3 h-3" />;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getRandomTerm = () => {
    const randomIndex = Math.floor(Math.random() * glossaryTerms.length);
    setRandomTerm(glossaryTerms[randomIndex].term);
    setSearchTerm(glossaryTerms[randomIndex].term);
  };

  const handleQuizSubmit = (termName: string) => {
    const term = glossaryTerms.find(t => t.term === termName);
    if (term && quizAnswer === term.quiz?.correctAnswer) {
      markAsCompleted(termName);
    }
    setShowAnswer(true);
  };

  const resetQuiz = () => {
    setShowQuiz(null);
    setQuizAnswer(null);
    setShowAnswer(false);
  };

  const progressStats = {
    total: glossaryTerms.length,
    completed: completedTerms.length,
    favorites: favorites.length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-primary" />
              <div>
                <CardTitle className="text-2xl">AI Glossary & Terminology</CardTitle>
                <p className="text-muted-foreground mt-1">
                  Interactive definitions with quizzes and progress tracking
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-600" />
                <span>{progressStats.completed}/{progressStats.total} completed</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span>{progressStats.favorites} favorites</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Search and Controls */}
      <Card>
        <CardHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search terms, definitions, examples, or related terms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" onClick={getRandomTerm}>
                <Shuffle className="w-4 h-4 mr-2" />
                Random Term
              </Button>
            </div>
            
            {/* Filters */}
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium mb-2">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category !== "All" && getCategoryIcon(category)}
                      <span className={category !== "All" ? "ml-1" : ""}>{category}</span>
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Difficulty Level</h4>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((difficulty) => (
                    <Badge
                      key={difficulty}
                      variant={selectedDifficulty === difficulty ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedDifficulty(difficulty)}
                    >
                      {difficulty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Results Counter */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredTerms.length} of {glossaryTerms.length} terms
      </div>

      {/* Quiz Modal */}
      {showQuiz && (
        <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              Quick Quiz: {showQuiz}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const term = glossaryTerms.find(t => t.term === showQuiz);
              if (!term?.quiz) return null;
              
              return (
                <div className="space-y-4">
                  <p className="font-medium">{term.quiz.question}</p>
                  <div className="space-y-2">
                    {term.quiz.options.map((option, index) => (
                      <Button
                        key={index}
                        variant={quizAnswer === index ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => setQuizAnswer(index)}
                        disabled={showAnswer}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                  
                  {!showAnswer ? (
                    <Button 
                      onClick={() => handleQuizSubmit(showQuiz)}
                      disabled={quizAnswer === null}
                      className="w-full"
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <div className={`p-3 rounded-lg flex items-center gap-2 ${
                        quizAnswer === term.quiz.correctAnswer 
                          ? "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200"
                          : "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200"
                      }`}>
                        {quizAnswer === term.quiz.correctAnswer ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            <span>Correct! Great job!</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4" />
                            <span>Incorrect. The correct answer was: {term.quiz.options[term.quiz.correctAnswer]}</span>
                          </>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{term.quiz.explanation}</p>
                      <Button onClick={resetQuiz} variant="outline" className="w-full">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Close Quiz
                      </Button>
                    </div>
                  )}
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}

      {/* Glossary Terms */}
      <ScrollArea className="h-[600px]">
        <div className="grid gap-4">
          {filteredTerms.map((term, index) => (
            <Card key={index} className="hover:bg-muted/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {term.icon}
                    <CardTitle className="text-lg">{term.term}</CardTitle>
                    {completedTerms.includes(term.term) && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {getCategoryIcon(term.category)}
                      <span className="ml-1">{term.category}</span>
                    </Badge>
                    <Badge className={`text-xs ${getDifficultyColor(term.difficulty)}`}>
                      {term.difficulty}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(term.term)}
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(term.term) ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{term.definition}</p>
                
                <div className="bg-muted/50 p-3 rounded-lg">
                  <h4 className="font-semibold text-sm mb-1">Example:</h4>
                  <p className="text-sm text-muted-foreground">{term.example}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Related Terms:</h4>
                    <div className="flex flex-wrap gap-1">
                      {term.relatedTerms.map((related, relIndex) => (
                        <Badge key={relIndex} variant="secondary" className="text-xs cursor-pointer"
                          onClick={() => setSearchTerm(related)}>
                          {related}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {term.quiz && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowQuiz(term.term);
                        setQuizAnswer(null);
                        setShowAnswer(false);
                      }}
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      Quiz
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {filteredTerms.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">
              No terms found matching "{searchTerm}" 
              {selectedCategory !== "All" && ` in category "${selectedCategory}"`}
              {selectedDifficulty !== "All" && ` with difficulty "${selectedDifficulty}"`}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Try a different search term or adjust your filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
