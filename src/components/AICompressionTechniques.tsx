import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Brain, 
  Layers, 
  Zap, 
  BarChart3, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Cpu,
  HardDrive,
  Clock
} from "lucide-react";

// Simulated model data
const modelData = {
  embeddings: {
    float32: { size: 1024, precision: "32-bit", quality: 100, speed: 100 },
    float16: { size: 512, precision: "16-bit", quality: 99, speed: 150 },
    int8: { size: 256, precision: "8-bit", quality: 95, speed: 200 },
    int4: { size: 128, precision: "4-bit", quality: 85, speed: 300 }
  },
  llm: {
    original: { parameters: "7B", size: "13.5GB", quality: 100, speed: 100 },
    pruned: { parameters: "5.6B", size: "10.8GB", quality: 97, speed: 120 },
    quantized: { parameters: "7B", size: "6.8GB", quality: 93, speed: 180 },
    distilled: { parameters: "3.5B", size: "6.9GB", quality: 89, speed: 150 }
  }
};

// Tokenization algorithms
const tokenizers = {
  bpe: {
    name: "Byte Pair Encoding (BPE)",
    description: "Iteratively merges most frequent byte pairs",
    example: "lower → lo we r",
    pros: ["Handles OOV words", "Subword units", "Language agnostic"],
    cons: ["May split common words", "Complex training"]
  },
  wordpiece: {
    name: "WordPiece",
    description: "Greedy longest-match-first algorithm",
    example: "lower → low ##er",
    pros: ["Better for morphology", "Prefix preservation", "Good for German/Korean"],
    cons: ["Language specific", "Complex implementation"]
  },
  sentencepiece: {
    name: "SentencePiece",
    description: "Treats spaces as regular tokens",
    example: "lower → ▁lo w er",
    pros: ["Language independent", "No pre-tokenization", "Reversible"],
    cons: ["Larger vocabulary", "May over-segment"]
  }
};

export const AICompressionTechniques = () => {
  const [selectedTechnique, setSelectedTechnique] = useState("quantization");
  const [quantizationLevel, setQuantizationLevel] = useState([2]); // 0: int4, 1: int8, 2: float16, 3: float32
  const [pruningRatio, setPruningRatio] = useState([20]);
  const [selectedTokenizer, setSelectedTokenizer] = useState("bpe");

  const quantizationOptions = ["int4", "int8", "float16", "float32"];
  const currentQuantization = quantizationOptions[quantizationLevel[0]];

  const compressionMetrics = useMemo(() => {
    const base = modelData.embeddings.float32;
    const compressed = modelData.embeddings[currentQuantization as keyof typeof modelData.embeddings];
    
    return {
      sizeReduction: ((base.size - compressed.size) / base.size) * 100,
      qualityLoss: base.quality - compressed.quality,
      speedGain: ((compressed.speed - base.speed) / base.speed) * 100,
      memoryReduction: ((base.size - compressed.size) / base.size) * 100
    };
  }, [currentQuantization]);

  const pruningMetrics = useMemo(() => {
    const ratio = pruningRatio[0];
    const remainingParams = 100 - ratio;
    const qualityLoss = Math.pow(ratio / 100, 0.5) * 15; // Simulated quality loss
    const speedGain = ratio * 0.8; // Simulated speed gain
    
    return {
      parametersRemoved: ratio,
      qualityLoss: Math.min(qualityLoss, 25),
      speedGain: Math.min(speedGain, 60),
      memoryReduction: ratio * 0.9
    };
  }, [pruningRatio[0]]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          AI-Specific Compression Techniques
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Technique Selection */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {[
            { id: "quantization", name: "Quantization", icon: <Layers className="w-4 h-4" /> },
            { id: "pruning", name: "Model Pruning", icon: <TrendingDown className="w-4 h-4" /> },
            { id: "distillation", name: "Knowledge Distillation", icon: <Brain className="w-4 h-4" /> },
            { id: "tokenization", name: "Tokenization", icon: <Zap className="w-4 h-4" /> }
          ].map((technique) => (
            <Button
              key={technique.id}
              variant={selectedTechnique === technique.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTechnique(technique.id)}
              className="flex items-center gap-2"
            >
              {technique.icon}
              {technique.name}
            </Button>
          ))}
        </div>

        <Tabs value={selectedTechnique} onValueChange={setSelectedTechnique} className="w-full">
          {/* Quantization Tab */}
          <TabsContent value="quantization" className="space-y-6">
            <Alert>
              <Cpu className="w-4 h-4" />
              <AlertDescription>
                <strong>Model Quantization:</strong> Reduces precision of model weights and activations from 32-bit floats to lower precision formats like 8-bit integers.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-3 block">Quantization Level</label>
                <Slider
                  value={quantizationLevel}
                  onValueChange={setQuantizationLevel}
                  max={3}
                  min={0}
                  step={1}
                  className="mb-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>INT4 (Aggressive)</span>
                  <span>INT8</span>
                  <span>FP16</span>
                  <span>FP32 (Original)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Current Configuration</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted rounded">
                      <span>Precision:</span>
                      <Badge variant="outline">{modelData.embeddings[currentQuantization as keyof typeof modelData.embeddings].precision}</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded">
                      <span>Model Size:</span>
                      <span className="font-mono">{modelData.embeddings[currentQuantization as keyof typeof modelData.embeddings].size} MB</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded">
                      <span>Quality Score:</span>
                      <span className="font-mono">{modelData.embeddings[currentQuantization as keyof typeof modelData.embeddings].quality}%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Impact Metrics</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Size Reduction:</span>
                        <span className="font-mono text-green-600">-{compressionMetrics.sizeReduction.toFixed(1)}%</span>
                      </div>
                      <Progress value={compressionMetrics.sizeReduction} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Quality Loss:</span>
                        <span className="font-mono text-red-600">-{compressionMetrics.qualityLoss.toFixed(1)}%</span>
                      </div>
                      <Progress value={compressionMetrics.qualityLoss} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Speed Gain:</span>
                        <span className="font-mono text-green-600">+{compressionMetrics.speedGain.toFixed(1)}%</span>
                      </div>
                      <Progress value={compressionMetrics.speedGain} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <HardDrive className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">Memory Usage</span>
                  </div>
                  <div className="text-2xl font-bold">{compressionMetrics.memoryReduction.toFixed(1)}%</div>
                  <div className="text-sm text-muted-foreground">reduction</div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span className="font-medium">Inference Speed</span>
                  </div>
                  <div className="text-2xl font-bold">{compressionMetrics.speedGain.toFixed(1)}%</div>
                  <div className="text-sm text-muted-foreground">faster</div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-4 h-4 text-red-500" />
                    <span className="font-medium">Quality Impact</span>
                  </div>
                  <div className="text-2xl font-bold">{compressionMetrics.qualityLoss.toFixed(1)}%</div>
                  <div className="text-sm text-muted-foreground">loss</div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Model Pruning Tab */}
          <TabsContent value="pruning" className="space-y-6">
            <Alert>
              <TrendingDown className="w-4 h-4" />
              <AlertDescription>
                <strong>Model Pruning:</strong> Removes less important neural network connections to reduce model size while maintaining performance.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-3 block">Pruning Ratio: {pruningRatio[0]}%</label>
                <Slider
                  value={pruningRatio}
                  onValueChange={setPruningRatio}
                  max={80}
                  min={0}
                  step={5}
                  className="mb-2"
                />
                <div className="text-xs text-muted-foreground">
                  Percentage of parameters to remove
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Pruning Configuration</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted rounded">
                      <span>Parameters Removed:</span>
                      <Badge variant="destructive">{pruningRatio[0]}%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded">
                      <span>Remaining Parameters:</span>
                      <span className="font-mono">{100 - pruningRatio[0]}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded">
                      <span>Pruning Strategy:</span>
                      <Badge variant="outline">Magnitude-based</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Performance Impact</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Memory Reduction:</span>
                        <span className="font-mono text-green-600">-{pruningMetrics.memoryReduction.toFixed(1)}%</span>
                      </div>
                      <Progress value={pruningMetrics.memoryReduction} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Quality Loss:</span>
                        <span className="font-mono text-red-600">-{pruningMetrics.qualityLoss.toFixed(1)}%</span>
                      </div>
                      <Progress value={pruningMetrics.qualityLoss} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Speed Improvement:</span>
                        <span className="font-mono text-green-600">+{pruningMetrics.speedGain.toFixed(1)}%</span>
                      </div>
                      <Progress value={pruningMetrics.speedGain} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Pruning Strategies</h3>
                <div className="grid gap-3">
                  {[
                    { name: "Magnitude-based", desc: "Remove weights with smallest absolute values" },
                    { name: "Structured", desc: "Remove entire neurons, channels, or layers" },
                    { name: "Gradual", desc: "Incrementally increase sparsity during training" },
                    { name: "One-shot", desc: "Remove weights all at once after training" }
                  ].map((strategy, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <div>
                        <div className="font-medium">{strategy.name}</div>
                        <div className="text-sm text-muted-foreground">{strategy.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Knowledge Distillation Tab */}
          <TabsContent value="distillation" className="space-y-6">
            <Alert>
              <Brain className="w-4 h-4" />
              <AlertDescription>
                <strong>Knowledge Distillation:</strong> Trains a smaller "student" model to mimic the behavior of a larger "teacher" model.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Teacher Model
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Parameters:</span>
                    <Badge variant="outline">175B</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span className="font-mono">350GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accuracy:</span>
                    <span className="font-mono">96.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Inference:</span>
                    <span className="font-mono">2.3s</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Student Model
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Parameters:</span>
                    <Badge variant="outline">7B</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span className="font-mono">14GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accuracy:</span>
                    <span className="font-mono">94.1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Inference:</span>
                    <span className="font-mono">0.2s</span>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Distillation Process</h3>
              <div className="grid gap-3">
                {[
                  { step: 1, title: "Temperature Scaling", desc: "Soften teacher probabilities with temperature parameter" },
                  { step: 2, title: "Loss Combination", desc: "Combine hard targets (ground truth) with soft targets (teacher)" },
                  { step: 3, title: "Knowledge Transfer", desc: "Student learns from teacher's probability distributions" },
                  { step: 4, title: "Fine-tuning", desc: "Optimize student model on both teacher and ground truth" }
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3 p-3 bg-muted rounded">
                    <Badge variant="outline" className="mt-1">{item.step}</Badge>
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Tokenization Tab */}
          <TabsContent value="tokenization" className="space-y-6">
            <Alert>
              <Zap className="w-4 h-4" />
              <AlertDescription>
                <strong>Tokenization:</strong> Compression technique that converts text into smaller, reusable units for efficient AI processing.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 gap-2 mb-4">
              {Object.entries(tokenizers).map(([key, tokenizer]) => (
                <Button
                  key={key}
                  variant={selectedTokenizer === key ? "default" : "outline"}
                  onClick={() => setSelectedTokenizer(key)}
                  className="justify-start"
                >
                  {tokenizer.name}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Algorithm Details</h3>
                <div className="p-4 bg-muted rounded">
                  <h4 className="font-medium mb-2">{tokenizers[selectedTokenizer as keyof typeof tokenizers].name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {tokenizers[selectedTokenizer as keyof typeof tokenizers].description}
                  </p>
                  <div className="font-mono text-sm bg-background p-2 rounded">
                    {tokenizers[selectedTokenizer as keyof typeof tokenizers].example}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Pros & Cons</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="font-medium">Advantages</span>
                    </div>
                    <div className="space-y-1">
                      {tokenizers[selectedTokenizer as keyof typeof tokenizers].pros.map((pro, index) => (
                        <div key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full" />
                          {pro}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <span className="font-medium">Disadvantages</span>
                    </div>
                    <div className="space-y-1">
                      {tokenizers[selectedTokenizer as keyof typeof tokenizers].cons.map((con, index) => (
                        <div key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 bg-red-500 rounded-full" />
                          {con}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};