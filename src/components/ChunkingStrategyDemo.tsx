import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  FileText, 
  Code, 
  Database, 
  TrendingUp, 
  Zap, 
  AlertTriangle,
  CheckCircle,
  Info,
  DollarSign,
  Clock,
  BarChart3
} from "lucide-react";

// Document types with realistic content
const documentTypes = {
  legal: {
    name: "Legal Contract (NDA)",
    icon: "⚖️",
    content: `NON-DISCLOSURE AGREEMENT

1. CONFIDENTIAL INFORMATION
This Agreement governs the disclosure of confidential information between the parties. 

1.1 Definition: "Confidential Information" includes all proprietary data, technical specifications, business plans, customer lists, financial information, and any other non-public information disclosed by either party.

1.2 Obligations: The receiving party agrees to:
- Maintain strict confidentiality
- Use information only for evaluation purposes
- Limit access to authorized personnel
- Return or destroy information upon request

2. TERM AND TERMINATION
This Agreement shall remain in effect for a period of five (5) years from the date of execution.

2.1 Survival: Confidentiality obligations shall survive termination of this Agreement for an additional three (3) years.

3. REMEDIES
Any breach of this Agreement may result in irreparable harm for which monetary damages would be inadequate. Therefore, the disclosing party shall be entitled to seek injunctive relief.

4. GOVERNING LAW
This Agreement shall be governed by the laws of the State of California without regard to conflict of law principles.`,
    challenges: ["Section boundaries", "Legal clauses", "Cross-references"],
    optimalStrategy: "Structure-based (by clause)",
    optimalSize: 300
  },
  healthcare: {
    name: "Healthcare Record",
    icon: "🏥",
    content: `PATIENT MEDICAL RECORD
Patient ID: MR-2024-001
Date: January 15, 2024

CHIEF COMPLAINT:
Patient presents with chest pain and shortness of breath lasting 2 hours.

HISTORY OF PRESENT ILLNESS:
62-year-old male with history of hypertension and diabetes mellitus type 2 reports sudden onset of substernal chest pain. Pain described as crushing, radiating to left arm. Associated symptoms include diaphoresis and nausea.

PAST MEDICAL HISTORY:
- Hypertension (controlled with lisinopril 10mg daily)
- Type 2 Diabetes Mellitus (HbA1c 7.2% last check)
- Hyperlipidemia
- Former smoker (quit 5 years ago, 30 pack-year history)

MEDICATIONS:
1. Lisinopril 10mg once daily
2. Metformin 1000mg twice daily
3. Atorvastatin 20mg once daily
4. Aspirin 81mg once daily

PHYSICAL EXAMINATION:
Vital Signs: BP 150/95, HR 110, RR 22, O2 Sat 94% on room air
General: Anxious appearing male in moderate distress
Cardiovascular: Tachycardic, regular rhythm, no murmurs
Pulmonary: Mild bilateral crackles at bases

LABORATORY RESULTS:
Troponin I: 0.15 ng/mL (elevated)
CK-MB: 8.2 ng/mL (elevated)
BNP: 450 pg/mL (elevated)

ASSESSMENT AND PLAN:
Acute myocardial infarction
- Serial EKGs and cardiac enzymes
- Cardiology consultation
- Anticoagulation therapy
- Monitor in CCU`,
    challenges: ["HIPAA compliance", "Medical terminology", "Structured sections"],
    optimalStrategy: "Hierarchical (section-based)",
    optimalSize: 400
  },
  code: {
    name: "Source Code",
    icon: "💻",
    content: `// User Authentication Service
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

/**
 * Handles user authentication and authorization
 */
export class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
  private readonly SALT_ROUNDS = 12;

  /**
   * Registers a new user
   * @param userData - User registration data
   * @returns Promise<User> - Created user object
   */
  async registerUser(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<User> {
    try {
      // Validate email format
      if (!this.isValidEmail(userData.email)) {
        throw new Error('Invalid email format');
      }

      // Check if user already exists
      const existingUser = await User.findByEmail(userData.email);
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, this.SALT_ROUNDS);

      // Create user
      const newUser = new User({
        email: userData.email,
        password: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: 'user',
        isActive: true,
        createdAt: new Date()
      });

      await newUser.save();
      return newUser;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }

  /**
   * Authenticates a user login
   * @param email - User email
   * @param password - User password
   * @returns Promise<string> - JWT token
   */
  async loginUser(email: string, password: string): Promise<string> {
    try {
      const user = await User.findByEmail(email);
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user.id,
          email: user.email,
          role: user.role 
        },
        this.JWT_SECRET,
        { expiresIn: '24h' }
      );

      return token;
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  }

  /**
   * Validates email format using regex
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}`,
    challenges: ["Function boundaries", "Comments", "Dependencies"],
    optimalStrategy: "Function-based",
    optimalSize: 200
  },
  technical: {
    name: "Technical Manual",
    icon: "📖",
    content: `DATABASE OPTIMIZATION GUIDE

Chapter 3: Query Performance Tuning

3.1 Understanding Query Execution Plans
Query execution plans provide insight into how the database engine processes your SQL statements. The plan shows the sequence of operations, estimated costs, and resource utilization.

To view an execution plan in PostgreSQL:
EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM users WHERE age > 25;

Key metrics to examine:
- Cost: Estimated computational expense
- Rows: Expected number of rows processed
- Actual Time: Real execution duration
- Buffers: Memory usage statistics

3.2 Index Optimization Strategies
Proper indexing is crucial for query performance. Consider these guidelines:

3.2.1 B-tree Indexes
Best for equality and range queries on ordered data types:
CREATE INDEX idx_user_age ON users(age);

3.2.2 Hash Indexes
Optimal for equality comparisons only:
CREATE INDEX idx_user_email_hash ON users USING HASH(email);

3.2.3 Composite Indexes
Useful for queries involving multiple columns:
CREATE INDEX idx_user_status_created ON users(status, created_at);

Index order matters! Place the most selective column first.

3.3 Query Rewriting Techniques
Sometimes rewriting queries can dramatically improve performance:

Instead of:
SELECT * FROM orders WHERE DATE(created_at) = '2024-01-15';

Use:
SELECT * FROM orders 
WHERE created_at >= '2024-01-15' 
  AND created_at < '2024-01-16';

This allows index usage on the created_at column.

3.4 Connection Pooling
Database connections are expensive resources. Use connection pooling to:
- Reduce connection establishment overhead
- Limit concurrent connections
- Improve application responsiveness

Configuration example for pgBouncer:
[databases]
myapp = host=localhost port=5432 dbname=myapp

[pgbouncer]
pool_mode = transaction
max_client_conn = 100
default_pool_size = 20`,
    challenges: ["Code examples", "Hierarchical structure", "Cross-references"],
    optimalStrategy: "Hierarchical",
    optimalSize: 500
  },
  social: {
    name: "Social Media Chat",
    icon: "💬",
    content: `@alex_dev: Hey team! Anyone else seeing issues with the deployment pipeline?

@sarah_pm: What kind of issues? The staging deploy went fine this morning

@alex_dev: Getting timeout errors on the prod deploy step. Been trying for 2 hours now 😤

@mike_ops: Let me check the logs... 

@mike_ops: Ah I see the issue. The database migration is taking longer than expected. There's a lock on the users table

@sarah_pm: How long is it expected to take?

@mike_ops: Should be done in about 10 more minutes. It's updating 2M records

@alex_dev: Got it, thanks! I'll grab some coffee ☕

@jenny_design: While we wait, has anyone reviewed the new login flow designs I shared yesterday?

@sarah_pm: Yes! They look great. Love the simplified step flow

@alex_dev: Agreed, much cleaner UX. When do we want to implement?

@jenny_design: I was thinking next sprint? Gives us time to plan the frontend changes

@mike_ops: Deploy is complete! ✅ Alex you should be good to go

@alex_dev: Awesome! Testing now...

@alex_dev: All good! Thanks everyone 🚀

@sarah_pm: Great teamwork! Let's discuss the login flow implementation in tomorrow's standup`,
    challenges: ["Conversational context", "Timestamps", "User threads"],
    optimalStrategy: "Conversational windows",
    optimalSize: 150
  }
};

// Chunking strategies
const chunkingStrategies = {
  fixed: {
    name: "Fixed-size",
    description: "Split text into equal-sized chunks",
    icon: "📏",
    pros: ["Simple", "Predictable", "Fast"],
    cons: ["May break context", "Not content-aware"],
    bestFor: ["Large uniform documents", "Quick prototyping"]
  },
  structure: {
    name: "Structure-based", 
    description: "Split by document structure (paragraphs, sections)",
    icon: "🏗️",
    pros: ["Preserves context", "Natural boundaries", "Domain-aware"],
    cons: ["Requires parsing", "Variable sizes"],
    bestFor: ["Structured documents", "Legal/medical texts"]
  },
  semantic: {
    name: "Semantic",
    description: "Split by meaning and topic changes",
    icon: "🧠",
    pros: ["Content-aware", "Optimal boundaries", "High quality"],
    cons: ["Computationally expensive", "Complex"],
    bestFor: ["Mixed content", "Narrative text"]
  },
  hierarchical: {
    name: "Hierarchical",
    description: "Multi-level chunking with summaries",
    icon: "🌳",
    pros: ["Scalable", "Multi-granular", "Efficient retrieval"],
    cons: ["Complex setup", "Higher storage"],
    bestFor: ["Very large documents", "Technical manuals"]
  }
};

export const ChunkingStrategyDemo = () => {
  const [selectedDoc, setSelectedDoc] = useState<keyof typeof documentTypes>("legal");
  const [selectedStrategy, setSelectedStrategy] = useState<keyof typeof chunkingStrategies>("structure");
  const [chunkSize, setChunkSize] = useState([400]);
  const [overlapPercentage, setOverlapPercentage] = useState([10]);
  const [activeQuery, setActiveQuery] = useState("");

  // Sample queries for different document types
  const sampleQueries = {
    legal: [
      "What are the confidentiality obligations?",
      "How long does this agreement last?",
      "What happens if someone breaches the NDA?"
    ],
    healthcare: [
      "What are the patient's vital signs?", 
      "What medications is the patient taking?",
      "What is the primary diagnosis?"
    ],
    code: [
      "How does user registration work?",
      "What security measures are implemented?",
      "How is the JWT token generated?"
    ],
    technical: [
      "How do I optimize database queries?",
      "What types of indexes are available?",
      "How should I configure connection pooling?"
    ],
    social: [
      "What was the deployment issue?",
      "Who is working on the login flow?",
      "When was the problem resolved?"
    ]
  };

  // Simulate chunking
  const chunkedContent = useMemo(() => {
    const doc = documentTypes[selectedDoc];
    const strategy = chunkingStrategies[selectedStrategy];
    const size = chunkSize[0];
    const overlap = Math.floor(size * overlapPercentage[0] / 100);
    
    let chunks: Array<{id: number, content: string, tokens: number, boundaries: string}> = [];
    
    if (selectedStrategy === "fixed") {
      // Simple fixed-size chunking
      const words = doc.content.split(' ');
      const wordsPerChunk = Math.floor(size / 1.5); // ~1.5 tokens per word
      
      for (let i = 0; i < words.length; i += wordsPerChunk - Math.floor(overlap / 1.5)) {
        const chunkWords = words.slice(i, i + wordsPerChunk);
        chunks.push({
          id: chunks.length + 1,
          content: chunkWords.join(' '),
          tokens: chunkWords.length * 1.5,
          boundaries: "Character count"
        });
      }
    } else if (selectedStrategy === "structure") {
      // Structure-based chunking
      const sections = doc.content.split(/\n\n+/);
      sections.forEach((section, index) => {
        if (section.trim()) {
          chunks.push({
            id: chunks.length + 1,
            content: section.trim(),
            tokens: section.split(' ').length * 1.5,
            boundaries: "Natural sections"
          });
        }
      });
    } else if (selectedStrategy === "semantic") {
      // Semantic chunking (simplified)
      const paragraphs = doc.content.split('\n\n');
      let currentChunk = "";
      let currentTokens = 0;
      
      paragraphs.forEach(paragraph => {
        const paraTokens = paragraph.split(' ').length * 1.5;
        if (currentTokens + paraTokens > size && currentChunk) {
          chunks.push({
            id: chunks.length + 1,
            content: currentChunk.trim(),
            tokens: currentTokens,
            boundaries: "Semantic breaks"
          });
          currentChunk = paragraph;
          currentTokens = paraTokens;
        } else {
          currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
          currentTokens += paraTokens;
        }
      });
      
      if (currentChunk) {
        chunks.push({
          id: chunks.length + 1,
          content: currentChunk.trim(),
          tokens: currentTokens,
          boundaries: "Semantic breaks"
        });
      }
    } else if (selectedStrategy === "hierarchical") {
      // Hierarchical chunking
      const sections = doc.content.split(/(?=\n[A-Z0-9]+\.)/);
      sections.forEach((section, index) => {
        if (section.trim()) {
          const lines = section.split('\n');
          const title = lines[0]?.trim() || `Section ${index + 1}`;
          
          chunks.push({
            id: chunks.length + 1,
            content: section.trim(),
            tokens: section.split(' ').length * 1.5,
            boundaries: `Section: ${title.substring(0, 30)}...`
          });
        }
      });
    }
    
    return chunks.slice(0, 8); // Limit display
  }, [selectedDoc, selectedStrategy, chunkSize, overlapPercentage]);

  // Calculate metrics
  const metrics = useMemo(() => {
    const totalTokens = chunkedContent.reduce((sum, chunk) => sum + chunk.tokens, 0);
    const avgChunkSize = totalTokens / chunkedContent.length || 0;
    const sizeVariance = chunkedContent.reduce((sum, chunk) => 
      sum + Math.pow(chunk.tokens - avgChunkSize, 2), 0) / chunkedContent.length || 0;
    
    // Simulate costs (approximate)
    const embeddingCost = chunkedContent.length * 0.0001; // $0.0001 per chunk
    const storageCost = totalTokens * 0.000001; // $0.000001 per token stored
    const queryLatency = chunkedContent.length * 2; // 2ms per chunk searched
    
    return {
      totalChunks: chunkedContent.length,
      totalTokens: Math.round(totalTokens),
      avgChunkSize: Math.round(avgChunkSize),
      sizeVariance: Math.round(sizeVariance),
      embeddingCost: embeddingCost.toFixed(4),
      storageCost: storageCost.toFixed(6),
      queryLatency: Math.round(queryLatency)
    };
  }, [chunkedContent]);

  // Simulate retrieval for queries
  const simulateRetrieval = (query: string) => {
    // Simple keyword matching simulation
    const queryWords = query.toLowerCase().split(' ');
    const scoredChunks = chunkedContent.map(chunk => {
      const chunkWords = chunk.content.toLowerCase().split(' ');
      const matches = queryWords.filter(word => 
        chunkWords.some(cw => cw.includes(word))
      ).length;
      const score = matches / queryWords.length;
      return { ...chunk, score };
    }).sort((a, b) => b.score - a.score);
    
    return scoredChunks.slice(0, 3); // Top 3 results
  };

  const retrievalResults = activeQuery ? simulateRetrieval(activeQuery) : [];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Chunking Strategy Simulator
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Interactive tool to understand how different chunking strategies affect RAG performance, 
          costs, and retrieval quality across various document types.
        </p>
      </div>

      <Tabs defaultValue="simulator" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="simulator">Strategy Simulator</TabsTrigger>
          <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="economics">Economics</TabsTrigger>
        </TabsList>

        <TabsContent value="simulator" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Controls */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Document Selection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup 
                    value={selectedDoc} 
                    onValueChange={(value) => setSelectedDoc(value as keyof typeof documentTypes)}
                  >
                    {Object.entries(documentTypes).map(([key, doc]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <RadioGroupItem value={key} id={key} />
                        <Label htmlFor={key} className="flex items-center gap-2 cursor-pointer">
                          <span>{doc.icon}</span>
                          {doc.name}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  
                  <div className="pt-4 border-t border-border">
                    <h4 className="font-semibold mb-2">Document Challenges:</h4>
                    <div className="flex flex-wrap gap-1">
                      {documentTypes[selectedDoc].challenges.map((challenge, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {challenge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Chunking Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup
                    value={selectedStrategy}
                    onValueChange={(value) => setSelectedStrategy(value as keyof typeof chunkingStrategies)}
                  >
                    {Object.entries(chunkingStrategies).map(([key, strategy]) => (
                      <div key={key} className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={key} id={key} />
                          <Label htmlFor={key} className="flex items-center gap-2 cursor-pointer">
                            <span>{strategy.icon}</span>
                            {strategy.name}
                          </Label>
                        </div>
                        <p className="text-sm text-muted-foreground ml-6">
                          {strategy.description}
                        </p>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Parameters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium">
                      Chunk Size: {chunkSize[0]} tokens
                    </Label>
                    <Slider
                      value={chunkSize}
                      onValueChange={setChunkSize}
                      min={100}
                      max={2000}
                      step={50}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">
                      Overlap: {overlapPercentage[0]}%
                    </Label>
                    <Slider
                      value={overlapPercentage}
                      onValueChange={setOverlapPercentage}
                      min={0}
                      max={30}
                      step={5}
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Visualization */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Chunked Document Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96 w-full border rounded-md p-4">
                    <div className="space-y-4">
                      {chunkedContent.map((chunk, index) => (
                        <div key={chunk.id} className="border border-border rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline">
                              Chunk {chunk.id}
                            </Badge>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{Math.round(chunk.tokens)} tokens</span>
                              <span>•</span>
                              <span>{chunk.boundaries}</span>
                            </div>
                          </div>
                          <div className="text-sm text-foreground leading-relaxed">
                            {chunk.content.substring(0, 200)}
                            {chunk.content.length > 200 && "..."}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Query Testing */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Query Testing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {sampleQueries[selectedDoc].map((query, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveQuery(query)}
                        className="text-xs"
                      >
                        {query}
                      </Button>
                    ))}
                  </div>
                  
                  {activeQuery && (
                    <div className="space-y-3">
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-medium text-sm">Query: "{activeQuery}"</p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Retrieved Chunks:</h4>
                        {retrievalResults.map((result, index) => (
                          <div key={result.id} className="border border-border rounded p-2">
                            <div className="flex items-center justify-between mb-1">
                              <Badge variant="secondary" className="text-xs">
                                Rank #{index + 1}
                              </Badge>
                              <div className="flex items-center gap-2">
                                <div className="text-xs text-muted-foreground">
                                  Score: {(result.score * 100).toFixed(1)}%
                                </div>
                                <Progress value={result.score * 100} className="w-16 h-2" />
                              </div>
                            </div>
                            <p className="text-xs text-foreground">
                              {result.content.substring(0, 120)}...
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Metrics Dashboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 lg:grid-cols-7 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{metrics.totalChunks}</div>
                  <div className="text-xs text-muted-foreground">Total Chunks</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{metrics.totalTokens}</div>
                  <div className="text-xs text-muted-foreground">Total Tokens</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{metrics.avgChunkSize}</div>
                  <div className="text-xs text-muted-foreground">Avg Chunk Size</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{metrics.sizeVariance}</div>
                  <div className="text-xs text-muted-foreground">Size Variance</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-green-600">${metrics.embeddingCost}</div>
                  <div className="text-xs text-muted-foreground">Embedding Cost</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-green-600">${metrics.storageCost}</div>
                  <div className="text-xs text-muted-foreground">Storage Cost</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{metrics.queryLatency}ms</div>
                  <div className="text-xs text-muted-foreground">Query Latency</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="case-studies" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Legal Tech Success
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  NDA analysis system achieved 94% accuracy using structure-based chunking.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Strategy:</span>
                    <span className="text-sm">Clause-based chunking</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Chunk Size:</span>
                    <span className="text-sm">200-500 tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Overlap:</span>
                    <span className="text-sm">10-15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Improvement:</span>
                    <span className="text-sm text-green-600">+34% accuracy</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Healthcare Records
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  HIPAA-compliant section-based chunking improved information retrieval.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Strategy:</span>
                    <span className="text-sm">Section-based</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Chunk Size:</span>
                    <span className="text-sm">300-600 tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Privacy:</span>
                    <span className="text-sm">HIPAA compliant</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Recall@5:</span>
                    <span className="text-sm text-green-600">92%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-blue-500" />
                  Scientific Papers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Chemistry papers achieved best results with 100-token chunks and domain embeddings.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Strategy:</span>
                    <span className="text-sm">Recursive token-based</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Chunk Size:</span>
                    <span className="text-sm">100 tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Overlap:</span>
                    <span className="text-sm">0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Embeddings:</span>
                    <span className="text-sm">SciBERT</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  Cost Optimization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Financial services reduced RAG costs by 47% through smart chunking.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Strategy:</span>
                    <span className="text-sm">Hierarchical</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Cost Reduction:</span>
                    <span className="text-sm text-green-600">-47%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Latency:</span>
                    <span className="text-sm text-green-600">-32%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Accuracy:</span>
                    <span className="text-sm text-green-600">+12%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Key Insights from Production Systems</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>80% of RAG performance issues</strong> can be traced back to poor chunking strategies. 
                  Proper chunking is where "the battle is won or lost."
                </AlertDescription>
              </Alert>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Chunk Size Impact</h4>
                  <p className="text-xs text-muted-foreground">
                    Too small: Context loss, expensive storage
                    <br />
                    Too large: Noise, poor precision
                    <br />
                    Sweet spot: 200-800 tokens
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Overlap Benefits</h4>
                  <p className="text-xs text-muted-foreground">
                    10-15% overlap prevents boundary failures
                    <br />
                    Recovers 5-10% lost context
                    <br />
                    Minimal cost increase
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Strategy Selection</h4>
                  <p className="text-xs text-muted-foreground">
                    Structure-based: +15-25% accuracy
                    <br />
                    Semantic: Best for mixed content
                    <br />
                    Fixed: Good baseline, fast
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="implementation" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>LangChain Implementation</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs bg-muted p-4 rounded-lg overflow-x-auto">
{`from langchain.text_splitter import RecursiveCharacterTextSplitter

# Basic setup
splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50,
    separators=["\\n\\n", "\\n", " ", ""]
)

# Process documents
chunks = splitter.split_text(document_text)

# With metadata
docs = splitter.create_documents(
    [text], 
    metadatas=[{"source": filename}]
)`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>LlamaIndex Implementation</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs bg-muted p-4 rounded-lg overflow-x-auto">
{`from llama_index import ServiceContext, Document

# Configure service context
service_ctx = ServiceContext.from_defaults(
    chunk_size_limit=1024
)

# Create documents
documents = [
    Document(text=text, extra_info={"source": file})
    for file, text in docs
]

# Build index
index = GPTVectorStoreIndex.from_documents(
    documents, 
    service_context=service_ctx
)`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom Semantic Chunking</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs bg-muted p-4 rounded-lg overflow-x-auto">
{`def semantic_chunking(text, max_tokens=500):
    sentences = text.split('.')
    chunks = []
    current_chunk = ""
    
    for sentence in sentences:
        tokens = len(sentence.split()) * 1.5
        
        if len(current_chunk.split()) * 1.5 + tokens > max_tokens:
            if current_chunk:
                chunks.append(current_chunk.strip())
            current_chunk = sentence
        else:
            current_chunk += ". " + sentence if current_chunk else sentence
    
    if current_chunk:
        chunks.append(current_chunk.strip())
    
    return chunks`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Production Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs bg-muted p-4 rounded-lg overflow-x-auto">
{`# Complete RAG pipeline with chunking
class RAGPipeline:
    def __init__(self, chunk_size=500, overlap=50):
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=overlap
        )
        self.embeddings = OpenAIEmbeddings()
        self.vector_store = Pinecone.from_documents(
            [], self.embeddings, index_name="docs"
        )
    
    def add_document(self, text, metadata={}):
        chunks = self.splitter.split_text(text)
        docs = [
            Document(page_content=chunk, metadata=metadata)
            for chunk in chunks
        ]
        self.vector_store.add_documents(docs)
    
    def query(self, question, k=3):
        results = self.vector_store.similarity_search(question, k=k)
        context = "\\n\\n".join([doc.page_content for doc in results])
        return self.llm.invoke(f"Context: {context}\\n\\nQuestion: {question}")`}
                </pre>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Configuration Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Document Type Configs</h4>
                  <div className="space-y-3">
                    <div className="p-3 border border-border rounded">
                      <h5 className="font-medium text-sm">Legal Documents</h5>
                      <div className="text-xs text-muted-foreground mt-1">
                        Strategy: Structure-based<br />
                        Size: 200-500 tokens<br />
                        Overlap: 10-15%<br />
                        Separators: Sections, clauses
                      </div>
                    </div>
                    <div className="p-3 border border-border rounded">
                      <h5 className="font-medium text-sm">Technical Docs</h5>
                      <div className="text-xs text-muted-foreground mt-1">
                        Strategy: Hierarchical<br />
                        Size: 500-1000 tokens<br />
                        Overlap: 5-10%<br />
                        Separators: Headers, code blocks
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Performance Configs</h4>
                  <div className="space-y-3">
                    <div className="p-3 border border-border rounded">
                      <h5 className="font-medium text-sm">High Accuracy</h5>
                      <div className="text-xs text-muted-foreground mt-1">
                        Smaller chunks (200-400)<br />
                        Higher overlap (15-20%)<br />
                        Semantic boundaries<br />
                        Higher retrieval count
                      </div>
                    </div>
                    <div className="p-3 border border-border rounded">
                      <h5 className="font-medium text-sm">Cost Optimized</h5>
                      <div className="text-xs text-muted-foreground mt-1">
                        Larger chunks (800-1200)<br />
                        Lower overlap (5-10%)<br />
                        Fixed-size splitting<br />
                        Efficient storage
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="economics" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Cost Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Embedding Costs</span>
                    <span className="text-sm text-muted-foreground">Per 1K tokens</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs">OpenAI Ada-002</span>
                      <span className="text-xs text-green-600">$0.0001</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs">Cohere</span>
                      <span className="text-xs text-green-600">$0.0001</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs">Local models</span>
                      <span className="text-xs text-green-600">$0.00</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Vector Storage</span>
                    <span className="text-sm text-muted-foreground">Per 1K vectors</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs">Pinecone</span>
                      <span className="text-xs text-blue-600">$0.096/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs">Weaviate Cloud</span>
                      <span className="text-xs text-blue-600">$0.095/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs">Self-hosted</span>
                      <span className="text-xs text-blue-600">$0.02/month</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Query Costs</span>
                    <span className="text-sm text-muted-foreground">Per 1K queries</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs">Vector search</span>
                      <span className="text-xs text-orange-600">$0.01</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs">LLM generation</span>
                      <span className="text-xs text-orange-600">$0.50-2.00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Performance Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Chunk Size vs Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs">100 tokens</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-red-600">High cost</span>
                        <span className="text-xs text-green-600">Fast queries</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs">500 tokens</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-green-600">Balanced</span>
                        <span className="text-xs text-green-600">Good accuracy</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs">2000 tokens</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-green-600">Low cost</span>
                        <span className="text-xs text-red-600">Slower queries</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Retrieval Latency</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs">1K chunks</span>
                      <span className="text-xs">~10ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs">10K chunks</span>
                      <span className="text-xs">~50ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs">100K chunks</span>
                      <span className="text-xs">~200ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs">1M chunks</span>
                      <span className="text-xs">~1000ms</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>ROI Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Baseline (Poor Chunking)</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Accuracy</span>
                      <span className="text-sm text-red-600">60%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Monthly cost</span>
                      <span className="text-sm">$1,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">User satisfaction</span>
                      <span className="text-sm text-red-600">3.2/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Support tickets</span>
                      <span className="text-sm text-red-600">450/month</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Optimized Chunking</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Accuracy</span>
                      <span className="text-sm text-green-600">94%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Monthly cost</span>
                      <span className="text-sm text-green-600">$850</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">User satisfaction</span>
                      <span className="text-sm text-green-600">4.7/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Support tickets</span>
                      <span className="text-sm text-green-600">120/month</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-green-600">Net Impact</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Accuracy gain</span>
                      <span className="text-sm text-green-600">+57%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Cost savings</span>
                      <span className="text-sm text-green-600">-$350/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Satisfaction</span>
                      <span className="text-sm text-green-600">+47%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Support reduction</span>
                      <span className="text-sm text-green-600">-73%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">$125,000</div>
                  <div className="text-sm text-green-700 dark:text-green-300">
                    Estimated annual savings from proper chunking implementation
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Remember:</strong> These are simplified calculations. Real ROI includes development time, 
              improved user experience, reduced support costs, and increased system reliability. 
              The true value of proper chunking often exceeds direct cost savings.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
};