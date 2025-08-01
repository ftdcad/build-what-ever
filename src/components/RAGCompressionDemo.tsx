import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Database, 
  Zap, 
  BarChart3, 
  Clock,
  DollarSign,
  Brain,
  FileText,
  Layers,
  Hash
} from "lucide-react";

// Sample documents for compression demonstration
const sampleDocuments = [
  {
    id: 1,
    title: "Product Specifications",
    content: "The iPhone 15 Pro features a 6.1-inch display, A17 Pro chip, and 48MP camera system. The device weighs 187 grams and comes in Natural Titanium, Blue Titanium, White Titanium, and Black Titanium colors. The battery provides up to 23 hours of video playback.",
    embedding: [0.2, 0.8, 0.1, 0.9, 0.3] // Simplified 5D embedding
  },
  {
    id: 2,
    title: "Customer Reviews",
    content: "Users praise the iPhone 15 Pro's camera quality and performance. The titanium build feels premium and lightweight. Battery life has improved significantly over previous models. Some users report heating issues during intensive gaming.",
    embedding: [0.3, 0.7, 0.2, 0.8, 0.4]
  },
  {
    id: 3,
    title: "Technical Manual",
    content: "For optimal performance, ensure iOS is updated to the latest version. The A17 Pro chip supports hardware-accelerated ray tracing and machine learning operations. Configure camera settings in Professional mode for advanced photography features.",
    embedding: [0.1, 0.6, 0.3, 0.7, 0.5]
  }
];

const compressionTechniques = {
  semantic: {
    name: "Semantic Deduplication",
    description: "Remove semantically similar content using embedding similarity",
    icon: <Brain className="w-4 h-4" />,
    compressionRatio: 0.3,
    qualityLoss: 5
  },
  context: {
    name: "Context Compression",
    description: "Use LongLLMLingua or similar techniques to compress prompts",
    icon: <Zap className="w-4 h-4" />,
    compressionRatio: 0.5,
    qualityLoss: 10
  },
  vector: {
    name: "Vector Quantization",
    description: "Apply Product Quantization (PQ) to reduce embedding storage",
    icon: <Hash className="w-4 h-4" />,
    compressionRatio: 0.25,
    qualityLoss: 8
  },
  hierarchical: {
    name: "Hierarchical Summarization",
    description: "Create multi-level summaries for different detail levels",
    icon: <Layers className="w-4 h-4" />,
    compressionRatio: 0.4,
    qualityLoss: 12
  }
};

export const RAGCompressionDemo = () => {
  const [selectedTechnique, setSelectedTechnique] = useState("semantic");
  const [compressionLevel, setCompressionLevel] = useState([50]);
  const [similarityThreshold, setSimilarityThreshold] = useState([80]);

  // Calculate compression metrics
  const compressionMetrics = useMemo(() => {
    const technique = compressionTechniques[selectedTechnique as keyof typeof compressionTechniques];
    const level = compressionLevel[0] / 100;
    
    const originalSize = sampleDocuments.reduce((sum, doc) => sum + doc.content.length, 0);
    const compressedSize = originalSize * (1 - technique.compressionRatio * level);
    const savings = ((originalSize - compressedSize) / originalSize) * 100;
    
    // Estimate costs (simplified)
    const embeddingCost = sampleDocuments.length * 0.0001;
    const storageCost = compressedSize * 0.000001;
    const queryCost = 0.001;
    
    return {
      originalSize,
      compressedSize: Math.round(compressedSize),
      savings: savings.toFixed(1),
      qualityLoss: (technique.qualityLoss * level).toFixed(1),
      embeddingCost: embeddingCost.toFixed(4),
      storageCost: storageCost.toFixed(6),
      queryCost: queryCost.toFixed(4),
      totalCost: (embeddingCost + storageCost + queryCost).toFixed(4)
    };
  }, [selectedTechnique, compressionLevel]);

  // Simulate semantic deduplication
  const deduplicatedDocuments = useMemo(() => {
    if (selectedTechnique !== "semantic") return sampleDocuments;
    
    const threshold = similarityThreshold[0] / 100;
    const result = [];
    
    for (const doc of sampleDocuments) {
      const isDuplicate = result.some(existing => {
        // Simplified cosine similarity
        const dotProduct = doc.embedding.reduce((sum, val, i) => sum + val * existing.embedding[i], 0);
        const magnitude1 = Math.sqrt(doc.embedding.reduce((sum, val) => sum + val * val, 0));
        const magnitude2 = Math.sqrt(existing.embedding.reduce((sum, val) => sum + val * val, 0));
        const similarity = dotProduct / (magnitude1 * magnitude2);
        return similarity > threshold;
      });
      
      if (!isDuplicate) {
        result.push(doc);
      }
    }
    
    return result;
  }, [selectedTechnique, similarityThreshold]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Advanced RAG Compression Techniques
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Technique Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {Object.entries(compressionTechniques).map(([key, technique]) => (
            <Button
              key={key}
              variant={selectedTechnique === key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTechnique(key)}
              className="flex items-center gap-2 h-auto p-3"
            >
              <div className="flex flex-col items-center gap-1">
                {technique.icon}
                <span className="text-xs">{technique.name}</span>
              </div>
            </Button>
          ))}
        </div>

        <Separator />

        {/* Configuration Controls */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-3 block">
              Compression Level: {compressionLevel[0]}%
            </label>
            <Slider
              value={compressionLevel}
              onValueChange={setCompressionLevel}
              max={100}
              min={0}
              step={5}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Conservative</span>
              <span>Aggressive</span>
            </div>
          </div>

          {selectedTechnique === "semantic" && (
            <div>
              <label className="text-sm font-medium mb-3 block">
                Similarity Threshold: {similarityThreshold[0]}%
              </label>
              <Slider
                value={similarityThreshold}
                onValueChange={setSimilarityThreshold}
                max={100}
                min={50}
                step={5}
                className="mb-2"
              />
              <div className="text-xs text-muted-foreground">
                Documents above this similarity will be deduplicated
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Current Technique Info */}
        <Alert>
          <Database className="w-4 h-4" />
          <AlertDescription>
            <strong>{compressionTechniques[selectedTechnique as keyof typeof compressionTechniques].name}:</strong>{" "}
            {compressionTechniques[selectedTechnique as keyof typeof compressionTechniques].description}
          </AlertDescription>
        </Alert>

        {/* Compression Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-blue-500" />
              <span className="font-medium">Storage Impact</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Original Size:</span>
                <span className="font-mono">{compressionMetrics.originalSize} chars</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Compressed Size:</span>
                <span className="font-mono">{compressionMetrics.compressedSize} chars</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm font-medium">
                  <span>Savings:</span>
                  <span className="text-green-600">{compressionMetrics.savings}%</span>
                </div>
                <Progress value={parseFloat(compressionMetrics.savings)} className="h-2" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-red-500" />
              <span className="font-medium">Quality Impact</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Information Retained:</span>
                <span className="font-mono">{(100 - parseFloat(compressionMetrics.qualityLoss)).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Quality Loss:</span>
                <span className="font-mono text-red-600">{compressionMetrics.qualityLoss}%</span>
              </div>
              <div className="space-y-1">
                <Progress value={100 - parseFloat(compressionMetrics.qualityLoss)} className="h-2" />
                <div className="text-xs text-muted-foreground text-center">
                  Higher is better
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-4 h-4 text-green-500" />
              <span className="font-medium">Cost Analysis</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Embedding:</span>
                <span className="font-mono">${compressionMetrics.embeddingCost}</span>
              </div>
              <div className="flex justify-between">
                <span>Storage:</span>
                <span className="font-mono">${compressionMetrics.storageCost}</span>
              </div>
              <div className="flex justify-between">
                <span>Query:</span>
                <span className="font-mono">${compressionMetrics.queryCost}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span className="font-mono">${compressionMetrics.totalCost}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Document Processing Results */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Document Processing Results
          </h3>
          
          <Tabs defaultValue="before" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="before">Before Compression</TabsTrigger>
              <TabsTrigger value="after">After Compression</TabsTrigger>
            </TabsList>
            
            <TabsContent value="before" className="space-y-3">
              <div className="text-sm text-muted-foreground mb-3">
                Original documents ({sampleDocuments.length} items)
              </div>
              {sampleDocuments.map((doc) => (
                <Card key={doc.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{doc.title}</h4>
                    <Badge variant="outline">{doc.content.length} chars</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{doc.content}</p>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="after" className="space-y-3">
              <div className="text-sm text-muted-foreground mb-3">
                Processed documents ({deduplicatedDocuments.length} items)
                {selectedTechnique === "semantic" && deduplicatedDocuments.length < sampleDocuments.length && (
                  <span className="ml-2 text-green-600">
                    • {sampleDocuments.length - deduplicatedDocuments.length} duplicates removed
                  </span>
                )}
              </div>
              {deduplicatedDocuments.map((doc) => (
                <Card key={doc.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{doc.title}</h4>
                    <Badge variant="outline">{doc.content.length} chars</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedTechnique === "context" 
                      ? doc.content.substring(0, Math.floor(doc.content.length * (1 - compressionLevel[0] / 200))) + "..."
                      : doc.content
                    }
                  </p>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <div className="text-lg font-bold">
              {selectedTechnique === "vector" ? "23ms" : 
               selectedTechnique === "semantic" ? "45ms" :
               selectedTechnique === "context" ? "67ms" : "89ms"}
            </div>
            <div className="text-sm text-muted-foreground">Query Latency</div>
          </Card>
          
          <Card className="p-4 text-center">
            <Database className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <div className="text-lg font-bold">{compressionMetrics.savings}%</div>
            <div className="text-sm text-muted-foreground">Storage Saved</div>
          </Card>
          
          <Card className="p-4 text-center">
            <Zap className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <div className="text-lg font-bold">{(100 - parseFloat(compressionMetrics.qualityLoss)).toFixed(0)}%</div>
            <div className="text-sm text-muted-foreground">Quality Retained</div>
          </Card>
          
          <Card className="p-4 text-center">
            <DollarSign className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <div className="text-lg font-bold">
              ${(parseFloat(compressionMetrics.totalCost) * 1000).toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">Cost per 1K queries</div>
          </Card>
        </div>

        {/* Best Practices */}
        <div className="space-y-3">
          <h3 className="font-semibold">Best Practices for RAG Compression</h3>
          <div className="grid gap-3">
            {[
              "Use semantic deduplication to remove redundant documents before indexing",
              "Apply context compression for long prompts to reduce token usage",
              "Implement vector quantization for large-scale embedding storage",
              "Consider hierarchical summarization for documents with multiple detail levels",
              "Monitor quality metrics continuously to balance compression vs accuracy",
              "Cache compressed results to amortize compression costs across queries"
            ].map((practice, index) => (
              <div key={index} className="flex items-start gap-3 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>{practice}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};