import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Brain, Database, Code, Shield, Zap, BookOpen, Settings } from "lucide-react";

export const AIGlossary = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const glossaryTerms = [
    {
      term: "API",
      definition: "Application Programming Interface - A set of rules and protocols that allows different software systems to communicate with each other.",
      example: "The OpenAI API lets your app send questions to GPT-4 and receive responses.",
      category: "Technical",
      icon: <Code className="w-4 h-4" />,
      relatedTerms: ["SDK", "Authentication", "Rate Limiting"]
    },
    {
      term: "Artificial Intelligence (AI)",
      definition: "Technology that enables machines to perform tasks that typically require human intelligence, such as understanding language, recognizing patterns, and making decisions.",
      example: "Voice assistants like Siri use AI to understand speech and provide helpful responses.",
      category: "Fundamentals",
      icon: <Brain className="w-4 h-4" />,
      relatedTerms: ["Machine Learning", "LLM", "Neural Networks"]
    },
    {
      term: "Chunking",
      definition: "Breaking large documents into smaller, manageable pieces for more precise retrieval in AI systems.",
      example: "A 100-page manual might be split into 20-paragraph chunks so AI can find exactly relevant sections.",
      category: "RAG",
      icon: <BookOpen className="w-4 h-4" />,
      relatedTerms: ["RAG", "Vector Database", "Embeddings"]
    },
    {
      term: "Context Window",
      definition: "The maximum amount of text (measured in tokens) that an AI model can 'remember' and process in a single conversation.",
      example: "GPT-4 has a 8,000-32,000 token context window - about 6,000-24,000 words of memory.",
      category: "Core Concepts",
      icon: <Brain className="w-4 h-4" />,
      relatedTerms: ["Tokens", "Memory", "Input Length"]
    },
    {
      term: "Embeddings",
      definition: "Mathematical representations of text that capture meaning in numerical form, enabling computers to understand semantic similarity.",
      example: "The words 'happy' and 'joyful' would have similar embeddings because they mean similar things.",
      category: "Core Concepts",
      icon: <Brain className="w-4 h-4" />,
      relatedTerms: ["Vector Database", "Semantic Search", "RAG"]
    },
    {
      term: "Fine-tuning",
      definition: "Taking a pre-trained AI model and specializing it with domain-specific data to improve performance on particular tasks.",
      example: "Fine-tuning GPT-4 on legal documents to make it better at analyzing contracts and regulations.",
      category: "Model Training",
      icon: <Settings className="w-4 h-4" />,
      relatedTerms: ["Pre-training", "RAG", "Model Specialization"]
    },
    {
      term: "Hallucination",
      definition: "When an AI model confidently generates false, nonsensical, or fabricated information that wasn't in its training data.",
      example: "An AI claiming a person was born in 1985 when they were actually born in 1990, or inventing fake research studies.",
      category: "Safety",
      icon: <Shield className="w-4 h-4" />,
      relatedTerms: ["Accuracy", "Guardrails", "Verification"]
    },
    {
      term: "Large Language Model (LLM)",
      definition: "AI systems trained specifically on vast amounts of text to understand and generate human-like language.",
      example: "ChatGPT, Claude, and GPT-4 are all LLMs - they're the 'chatbots' you interact with.",
      category: "Fundamentals",
      icon: <Brain className="w-4 h-4" />,
      relatedTerms: ["AI", "Machine Learning", "Natural Language Processing"]
    },
    {
      term: "Machine Learning (ML)",
      definition: "A subset of AI focused on teaching computers to learn patterns from data without being explicitly programmed for every scenario.",
      example: "Email spam filters use ML to learn what spam looks like from thousands of examples.",
      category: "Fundamentals",
      icon: <Brain className="w-4 h-4" />,
      relatedTerms: ["AI", "Training Data", "Neural Networks"]
    },
    {
      term: "Prompt Engineering",
      definition: "The art and science of crafting inputs (prompts) to AI models to produce desired, accurate, and consistent responses.",
      example: "Instead of 'analyze this', using 'As a financial expert, identify the top 3 risks in this investment proposal and explain each.'",
      category: "Practical",
      icon: <Settings className="w-4 h-4" />,
      relatedTerms: ["System Prompt", "Few-shot Learning", "Chain of Thought"]
    },
    {
      term: "Quantization",
      definition: "Compressing AI models by reducing numerical precision to make them smaller and faster, with some trade-off in quality.",
      example: "A Q4 model uses 4-bit precision instead of 32-bit, making it 8x smaller but slightly less accurate.",
      category: "Optimization",
      icon: <Zap className="w-4 h-4" />,
      relatedTerms: ["Model Compression", "Inference Speed", "Edge Computing"]
    },
    {
      term: "RAG (Retrieval Augmented Generation)",
      definition: "A hybrid AI approach that retrieves relevant information from databases or documents and feeds it to a language model for more accurate, current responses.",
      example: "When you ask about company policies, RAG searches your policy database first, then uses that info to give you an accurate, up-to-date answer.",
      category: "RAG",
      icon: <BookOpen className="w-4 h-4" />,
      relatedTerms: ["Vector Database", "Embeddings", "Knowledge Base"]
    },
    {
      term: "Rate Limiting",
      definition: "Controlling how many requests can be made to an API within a specific time period to prevent overuse and manage costs.",
      example: "OpenAI might limit you to 1,000 requests per hour to prevent spam and ensure fair usage across all users.",
      category: "API Management",
      icon: <Shield className="w-4 h-4" />,
      relatedTerms: ["API", "Cost Management", "Throttling"]
    },
    {
      term: "SDK",
      definition: "Software Development Kit - A collection of tools, libraries, and documentation for building applications with specific platforms.",
      example: "The Python SDK for OpenAI includes pre-written code that makes it easy to send requests to ChatGPT.",
      category: "Technical",
      icon: <Code className="w-4 h-4" />,
      relatedTerms: ["API", "Integration", "Development Tools"]
    },
    {
      term: "Temperature",
      definition: "A setting that controls how creative or predictable AI responses are. Low temperature = consistent, high temperature = creative and varied.",
      example: "Temperature 0.1 for legal documents (precise), temperature 0.8 for creative writing (varied and interesting).",
      category: "Core Concepts",
      icon: <Zap className="w-4 h-4" />,
      relatedTerms: ["Creativity", "Randomness", "Output Control"]
    },
    {
      term: "Tokens",
      definition: "Chunks of text that AI processes - roughly equivalent to words, but can be parts of words or punctuation.",
      example: "The sentence 'Hello world!' might be 3 tokens: ['Hello', ' world', '!'] - this affects costs and context limits.",
      category: "Core Concepts",
      icon: <Brain className="w-4 h-4" />,
      relatedTerms: ["Context Window", "Tokenization", "Pricing"]
    },
    {
      term: "Vector Database",
      definition: "A specialized database for storing and quickly searching embeddings (mathematical representations of text meaning).",
      example: "When you search for 'water damage', a vector database can instantly find documents about floods, leaks, and moisture issues.",
      category: "Database",
      icon: <Database className="w-4 h-4" />,
      relatedTerms: ["Embeddings", "RAG", "Semantic Search"]
    }
  ];

  const filteredTerms = useMemo(() => {
    if (!searchTerm) return glossaryTerms;
    
    return glossaryTerms.filter(term =>
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.relatedTerms.some(related => 
        related.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const categories = ["All", "Fundamentals", "Core Concepts", "RAG", "Technical", "Safety", "Optimization", "API Management", "Database", "Model Training", "Practical"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categoryFilteredTerms = useMemo(() => {
    if (selectedCategory === "All") return filteredTerms;
    return filteredTerms.filter(term => term.category === selectedCategory);
  }, [filteredTerms, selectedCategory]);

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      "Fundamentals": <Brain className="w-3 h-3" />,
      "Core Concepts": <Brain className="w-3 h-3" />,
      "RAG": <BookOpen className="w-3 h-3" />,
      "Technical": <Code className="w-3 h-3" />,
      "Safety": <Shield className="w-3 h-3" />,
      "Optimization": <Zap className="w-3 h-3" />,
      "API Management": <Shield className="w-3 h-3" />,
      "Database": <Database className="w-3 h-3" />,
      "Model Training": <Settings className="w-3 h-3" />,
      "Practical": <Settings className="w-3 h-3" />
    };
    return iconMap[category] || <Brain className="w-3 h-3" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">AI Glossary & Terminology</CardTitle>
              <p className="text-muted-foreground mt-1">
                Searchable definitions with examples and cross-references
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search terms, definitions, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Category Filter */}
      <Card>
        <CardContent className="pt-6">
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
        </CardContent>
      </Card>

      {/* Results Counter */}
      <div className="text-sm text-muted-foreground">
        Showing {categoryFilteredTerms.length} of {glossaryTerms.length} terms
      </div>

      {/* Glossary Terms */}
      <ScrollArea className="h-[600px]">
        <div className="grid gap-4">
          {categoryFilteredTerms.map((term, index) => (
            <Card key={index} className="hover:bg-muted/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {term.icon}
                    <CardTitle className="text-lg">{term.term}</CardTitle>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {getCategoryIcon(term.category)}
                    <span className="ml-1">{term.category}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{term.definition}</p>
                
                <div className="bg-muted/50 p-3 rounded-lg">
                  <h4 className="font-semibold text-sm mb-1">Example:</h4>
                  <p className="text-sm text-muted-foreground">{term.example}</p>
                </div>

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
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {categoryFilteredTerms.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">
              No terms found matching "{searchTerm}" in category "{selectedCategory}"
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Try a different search term or select "All" categories
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};