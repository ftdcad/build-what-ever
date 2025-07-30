import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", label: "Overview", icon: "🎯" },
    { id: "core-terms", label: "Core AI Terms", icon: "🧠" },
    { id: "models", label: "Models & Training", icon: "🤖" },
    { id: "rag", label: "RAG & Embeddings", icon: "🗂️" },
    { id: "technical", label: "Technical Terms", icon: "🏗️" },
    { id: "control", label: "AI Control & Safety", icon: "🛡️" },
    { id: "model-selection", label: "Model Selection", icon: "📊" },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-foreground mb-2">AI Assistant Design Guide</h1>
          <p className="text-xl text-muted-foreground">Complete terminology and concepts for AI implementation</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "default" : "ghost"}
                size="sm"
                onClick={() => scrollToSection(section.id)}
                className="whitespace-nowrap"
              >
                <span className="mr-2">{section.icon}</span>
                {section.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Overview Section */}
        <section id="overview" className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">🎯 Overview</h2>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-primary">What This Guide Covers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Core Concepts</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• LLMs, tokens, and context windows</li>
                    <li>• Temperature and model parameters</li>
                    <li>• Embeddings and vector databases</li>
                    <li>• RAG (Retrieval Augmented Generation)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Advanced Topics</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Fine-tuning vs pre-training</li>
                    <li>• AI agents and architectures</li>
                    <li>• Safety and control mechanisms</li>
                    <li>• Model selection strategies</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Core AI Terms */}
        <section id="core-terms" className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">🧠 Core AI Terms</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🤖</span>
                  LLM
                </CardTitle>
                <Badge variant="secondary">Large Language Model</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  AI trained on vast text data to understand and generate human-like text.
                </p>
                <div className="bg-muted p-3 rounded">
                  <p className="text-sm font-medium">Examples:</p>
                  <p className="text-sm text-muted-foreground">GPT-4, Claude, Gemini</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🎲</span>
                  Token
                </CardTitle>
                <Badge variant="secondary">Text Unit</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Basic unit of text processing. ~1.5 tokens per word on average.
                </p>
                <div className="bg-muted p-3 rounded">
                  <p className="text-sm font-medium">Example:</p>
                  <p className="text-sm text-muted-foreground">"Hello world" = 2 tokens</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🌡️</span>
                  Temperature
                </CardTitle>
                <Badge variant="secondary">Creativity Control</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Controls randomness in AI responses (0.0-2.0).
                </p>
                <div className="bg-muted p-3 rounded">
                  <p className="text-sm font-medium">Settings:</p>
                  <p className="text-sm text-muted-foreground">0.1 = Focused, 1.0 = Creative</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📏</span>
                  Context Window
                </CardTitle>
                <Badge variant="secondary">Memory Limit</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Maximum tokens the AI can process at once.
                </p>
                <div className="bg-muted p-3 rounded">
                  <p className="text-sm font-medium">Typical Sizes:</p>
                  <p className="text-sm text-muted-foreground">8K, 32K, 128K tokens</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">💭</span>
                  Hallucination
                </CardTitle>
                <Badge variant="destructive">AI Error</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  When AI generates false or fabricated information confidently.
                </p>
                <div className="bg-muted p-3 rounded">
                  <p className="text-sm font-medium">Prevention:</p>
                  <p className="text-sm text-muted-foreground">Use RAG, fact-checking, lower temperature</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Prompt
                </CardTitle>
                <Badge variant="secondary">AI Instruction</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  The input text/instructions given to an AI model.
                </p>
                <div className="bg-muted p-3 rounded">
                  <p className="text-sm font-medium">Best Practice:</p>
                  <p className="text-sm text-muted-foreground">Be specific, provide context</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Models & Training */}
        <section id="models" className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">🤖 Models & Training</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-2 border-muted">
              <CardHeader>
                <CardTitle className="text-primary">Pre-training</CardTitle>
                <Badge variant="outline">From Scratch</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Building a model from scratch by training on massive general datasets.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Data Volume:</span>
                    <span className="text-sm text-muted-foreground">Billions of tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Cost:</span>
                    <span className="text-sm text-muted-foreground">$1M - $100M+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Time:</span>
                    <span className="text-sm text-muted-foreground">Months to years</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-muted rounded">
                  <p className="text-sm font-medium text-muted-foreground">
                    Note: You'll never do this - always start with existing models!
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary">
              <CardHeader>
                <CardTitle className="text-primary">Fine-tuning</CardTitle>
                <Badge variant="default">Specialization</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Taking a pre-trained model and specializing it with domain-specific data.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Data Volume:</span>
                    <span className="text-sm text-muted-foreground">Hundreds to thousands</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Cost:</span>
                    <span className="text-sm text-muted-foreground">$100 - $10,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Time:</span>
                    <span className="text-sm text-muted-foreground">Hours to days</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-primary/10 rounded">
                  <p className="text-sm font-medium">
                    Best for: Style, format, domain language
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary">
              <CardHeader>
                <CardTitle className="text-primary">RAG</CardTitle>
                <Badge variant="default">Retrieval Augmented Generation</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Augmenting any model with real-time information retrieval from databases.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Data Volume:</span>
                    <span className="text-sm text-muted-foreground">Any size</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Cost:</span>
                    <span className="text-sm text-muted-foreground">$10 - $1,000/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Time:</span>
                    <span className="text-sm text-muted-foreground">Minutes to hours</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-primary/10 rounded">
                  <p className="text-sm font-medium">
                    Best for: Current data, fact retrieval
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* RAG & Embeddings */}
        <section id="rag" className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">🗂️ RAG & Embeddings</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>🌉 Embeddings: The Bridge to Understanding</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Embeddings convert words into mathematical vectors that capture meaning and relationships.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <h4 className="font-semibold mb-2">Words</h4>
                  <div className="space-y-2">
                    <div className="bg-muted p-2 rounded">cat</div>
                    <div className="bg-muted p-2 rounded">dog</div>
                    <div className="bg-muted p-2 rounded">banana</div>
                  </div>
                </div>
                <div className="text-center flex items-center justify-center">
                  <div className="text-2xl">→</div>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold mb-2">Vector Space</h4>
                  <div className="bg-muted p-4 rounded">
                    <p className="text-sm">cat & dog (close)</p>
                    <p className="text-sm">banana (far)</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary/10 p-4 rounded">
                <p className="font-medium">Key insight: Distance between vectors = semantic similarity!</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🔍</span>
                  Basic RAG
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Static system with fixed retrieval algorithm.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <span>1.</span>
                    <span>Query → Retrieve → Generate → Response</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-muted rounded">
                  <p className="text-sm">No learning from usage, same results every time</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🔄</span>
                  Feedback-Enhanced RAG
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Learning system that improves over time.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <span>1.</span>
                    <span>Query → Retrieve → Generate → Response</span>
                  </div>
                  <div className="flex gap-2">
                    <span>2.</span>
                    <span><strong>→ Feedback → Learn</strong></span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-primary/10 rounded">
                  <p className="text-sm">Adaptive retrieval, self-optimizing rankings</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Technical Terms */}
        <section id="technical" className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">🏗️ Technical Terms</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🔌</span>
                  API
                </CardTitle>
                <Badge variant="secondary">Application Programming Interface</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Rules and protocols for software systems to communicate.
                </p>
                <div className="bg-muted p-3 rounded">
                  <p className="text-sm font-medium">Examples:</p>
                  <p className="text-sm text-muted-foreground">OpenAI API, Claude API, REST APIs</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  ETL
                </CardTitle>
                <Badge variant="secondary">Extract, Transform, Load</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Data pipeline process for preparing data for AI systems.
                </p>
                <div className="bg-muted p-3 rounded">
                  <p className="text-sm font-medium">AI Context:</p>
                  <p className="text-sm text-muted-foreground">Prepares data for vector databases</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">💾</span>
                  CRUD
                </CardTitle>
                <Badge variant="secondary">Create, Read, Update, Delete</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Four basic operations on data in databases or APIs.
                </p>
                <div className="bg-muted p-3 rounded">
                  <p className="text-sm font-medium">AI Usage:</p>
                  <p className="text-sm text-muted-foreground">AI might need READ access but not DELETE</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* AI Control & Safety */}
        <section id="control" className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">🛡️ AI Control & Safety</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">✍️</span>
                  Prompt Engineering
                </CardTitle>
                <Badge variant="secondary">First Layer of Control</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Crafting precise instructions to improve AI reasoning and accuracy.
                </p>
                <div className="bg-primary/10 p-3 rounded">
                  <p className="text-sm font-medium">Impact:</p>
                  <p className="text-sm">Good prompts can improve accuracy by 40-60%</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">👥</span>
                  Human-in-the-Loop
                </CardTitle>
                <Badge variant="secondary">HITL</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Human supervision for critical decisions and compliance.
                </p>
                <div className="bg-muted p-3 rounded">
                  <p className="text-sm font-medium">Process:</p>
                  <p className="text-sm text-muted-foreground">AI drafts → Human reviews → Approves/modifies</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🚦</span>
                  Guardrails
                </CardTitle>
                <Badge variant="secondary">Safety Filters</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Automated filters preventing harmful outputs and policy violations.
                </p>
                <div className="bg-muted p-3 rounded">
                  <p className="text-sm font-medium">Types:</p>
                  <p className="text-sm text-muted-foreground">Content filters, PII detection, compliance validators</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📈</span>
                  Performance Monitoring
                </CardTitle>
                <Badge variant="secondary">Quality Metrics</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Tracking AI system performance and quality indicators.
                </p>
                <div className="bg-muted p-3 rounded">
                  <p className="text-sm font-medium">Key Metrics:</p>
                  <p className="text-sm text-muted-foreground">Accuracy &gt;95%, Response time &lt;30s</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Model Selection */}
        <section id="model-selection" className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">📊 Model Selection Guide</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>🎯 Quick Decision Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-semibold">Task Type</th>
                      <th className="text-left p-3 font-semibold">Recommended Model</th>
                      <th className="text-left p-3 font-semibold">Why</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="p-3">Daily Processing</td>
                      <td className="p-3"><Badge variant="outline">GPT-4o</Badge></td>
                      <td className="p-3 text-muted-foreground">Fast, reliable, multimodal</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3">Customer Communications</td>
                      <td className="p-3"><Badge variant="outline">GPT-4.5</Badge></td>
                      <td className="p-3 text-muted-foreground">Better tone control, empathy</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3">Technical Development</td>
                      <td className="p-3"><Badge variant="outline">GPT-4.1</Badge></td>
                      <td className="p-3 text-muted-foreground">Precise coding, debugging</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3">Complex Analysis</td>
                      <td className="p-3"><Badge variant="outline">OpenAI o3</Badge></td>
                      <td className="p-3 text-muted-foreground">Deep reasoning, multi-step analysis</td>
                    </tr>
                    <tr>
                      <td className="p-3">High-Volume Simple Tasks</td>
                      <td className="p-3"><Badge variant="outline">Claude Haiku</Badge></td>
                      <td className="p-3 text-muted-foreground">Fast, cost-effective</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">OpenAI Models</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">GPT-4o</span>
                      <Badge variant="secondary">Unlimited</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">General tasks, multimodal</p>
                  </div>
                  <Separator />
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">GPT-4.1</span>
                      <Badge variant="secondary">500/3h</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Coding, precise instructions</p>
                  </div>
                  <Separator />
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">o3</span>
                      <Badge variant="secondary">100/week</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Complex reasoning</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Claude Models</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Opus 4</span>
                      <Badge variant="secondary">Most Powerful</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Complex analysis, coding</p>
                  </div>
                  <Separator />
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Sonnet 4</span>
                      <Badge variant="secondary">Balanced</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">General tasks, fast</p>
                  </div>
                  <Separator />
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Haiku 3</span>
                      <Badge variant="secondary">Fastest</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Simple tasks, high volume</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Cost Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-red-600">Tier 1 (Critical)</span>
                    <p className="text-sm text-muted-foreground">Premium models for high-stakes decisions</p>
                  </div>
                  <Separator />
                  <div>
                    <span className="font-medium text-yellow-600">Tier 2 (Important)</span>
                    <p className="text-sm text-muted-foreground">Balanced models for daily operations</p>
                  </div>
                  <Separator />
                  <div>
                    <span className="font-medium text-green-600">Tier 3 (Routine)</span>
                    <p className="text-sm text-muted-foreground">Fast models for simple tasks</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center py-8 border-t border-border">
          <h3 className="text-2xl font-bold text-primary mb-4">🎓 You're Now Speaking AI!</h3>
          <p className="text-lg text-muted-foreground mb-6">
            From understanding basic concepts like RAG and embeddings to advanced techniques, 
            you're equipped to lead AI transformation.
          </p>
          <div className="bg-primary/10 p-6 rounded-lg max-w-2xl mx-auto">
            <p className="italic text-muted-foreground">
              "The best way to predict the future is to invent it." - Alan Kay
            </p>
            <p className="font-semibold text-primary mt-2">
              Let's invent the future of AI-powered solutions together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;