import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  ArrowRight, 
  Zap, 
  BarChart3, 
  Clock,
  Info,
  TreePine,
  Hash,
  Repeat
} from "lucide-react";

// Sample text for compression demonstration
const sampleTexts = {
  repetitive: "AAAAAABBBBBBCCCCCCDDDDDDEEEEEEAAAAAA",
  natural: "The quick brown fox jumps over the lazy dog. The dog was sleeping peacefully.",
  code: "function compress(data) { return data.split('').reduce((acc, char) => { acc[char] = (acc[char] || 0) + 1; return acc; }, {}); }",
  structured: "USER_ID:12345,NAME:John Doe,EMAIL:john@example.com,STATUS:active,ROLE:admin"
};

// Huffman coding simulation
const buildHuffmanTree = (text: string) => {
  // Count frequencies
  const frequencies: Record<string, number> = {};
  for (const char of text) {
    frequencies[char] = (frequencies[char] || 0) + 1;
  }

  // Build simple codes (simplified for demo)
  const sortedChars = Object.entries(frequencies)
    .sort(([,a], [,b]) => b - a)
    .map(([char, freq], index) => ({
      char,
      freq,
      code: index.toString(2).padStart(3, '0') // Simple binary codes
    }));

  return sortedChars;
};

// LZ77 compression simulation
const lz77Compress = (text: string, windowSize = 8) => {
  const tokens: Array<{type: 'literal' | 'reference', value: string, offset?: number, length?: number}> = [];
  let i = 0;

  while (i < text.length) {
    const start = Math.max(0, i - windowSize);
    const searchWindow = text.slice(start, i);
    let bestMatch = { offset: 0, length: 0 };

    // Find longest match in search window
    for (let j = 0; j < searchWindow.length; j++) {
      let length = 0;
      while (
        j + length < searchWindow.length &&
        i + length < text.length &&
        searchWindow[j + length] === text[i + length]
      ) {
        length++;
      }
      if (length > bestMatch.length) {
        bestMatch = { offset: searchWindow.length - j, length };
      }
    }

    if (bestMatch.length >= 3) {
      tokens.push({
        type: 'reference',
        value: `(${bestMatch.offset},${bestMatch.length})`,
        offset: bestMatch.offset,
        length: bestMatch.length
      });
      i += bestMatch.length;
    } else {
      tokens.push({
        type: 'literal',
        value: text[i]
      });
      i++;
    }
  }

  return tokens;
};

// Run-length encoding
const runLengthEncode = (text: string) => {
  const encoded: Array<{char: string, count: number}> = [];
  let current = text[0];
  let count = 1;

  for (let i = 1; i < text.length; i++) {
    if (text[i] === current) {
      count++;
    } else {
      encoded.push({ char: current, count });
      current = text[i];
      count = 1;
    }
  }
  encoded.push({ char: current, count });

  return encoded;
};

export const CompressionAlgorithmsDemo = () => {
  const [selectedText, setSelectedText] = useState<keyof typeof sampleTexts>("repetitive");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("huffman");

  const compressionResults = useMemo(() => {
    const text = sampleTexts[selectedText];
    const originalSize = text.length;

    let result = {
      original: text,
      compressed: "",
      compressionRatio: 0,
      savings: 0,
      details: [] as any[]
    };

    switch (selectedAlgorithm) {
      case "huffman": {
        const huffmanTree = buildHuffmanTree(text);
        const totalBits = huffmanTree.reduce((sum, item) => 
          sum + (item.freq * item.code.length), 0
        );
        const compressedSize = Math.ceil(totalBits / 8);
        
        result.compressed = huffmanTree.map(item => 
          `'${item.char}': ${item.code}`
        ).join(', ');
        result.compressionRatio = compressedSize / originalSize;
        result.savings = ((originalSize - compressedSize) / originalSize) * 100;
        result.details = huffmanTree;
        break;
      }

      case "lz77": {
        const tokens = lz77Compress(text);
        const compressedText = tokens.map(token => 
          token.type === 'reference' ? token.value : token.value
        ).join('');
        
        result.compressed = compressedText;
        result.compressionRatio = compressedText.length / originalSize;
        result.savings = ((originalSize - compressedText.length) / originalSize) * 100;
        result.details = tokens;
        break;
      }

      case "rle": {
        const encoded = runLengthEncode(text);
        const compressedText = encoded.map(item => 
          `${item.char}${item.count}`
        ).join('');
        
        result.compressed = compressedText;
        result.compressionRatio = compressedText.length / originalSize;
        result.savings = ((originalSize - compressedText.length) / originalSize) * 100;
        result.details = encoded;
        break;
      }
    }

    return result;
  }, [selectedText, selectedAlgorithm]);

  const algorithms = {
    huffman: {
      name: "Huffman Coding",
      icon: <TreePine className="w-4 h-4" />,
      description: "Builds optimal prefix codes based on character frequency",
      complexity: "O(n log n)",
      bestFor: ["Text with varying character frequencies", "General-purpose compression"]
    },
    lz77: {
      name: "LZ77 (Sliding Window)",
      icon: <ArrowRight className="w-4 h-4" />,
      description: "Replaces repeated strings with back-references",
      complexity: "O(n²)",
      bestFor: ["Text with repeated patterns", "Streaming compression"]
    },
    rle: {
      name: "Run-Length Encoding",
      icon: <Repeat className="w-4 h-4" />,
      description: "Encodes consecutive identical characters",
      complexity: "O(n)",
      bestFor: ["Simple repeated patterns", "Image compression"]
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hash className="w-5 h-5" />
          Classical Compression Algorithms
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Sample Text</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(sampleTexts).map(([key, value]) => (
                <Button
                  key={key}
                  variant={selectedText === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedText(key as keyof typeof sampleTexts)}
                  className="text-xs"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Algorithm</label>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(algorithms).map(([key, algo]) => (
                <Button
                  key={key}
                  variant={selectedAlgorithm === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedAlgorithm(key)}
                  className="flex items-center gap-2 justify-start"
                >
                  {algo.icon}
                  {algo.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Separator />

        {/* Algorithm Info */}
        <Alert>
          <Info className="w-4 h-4" />
          <AlertDescription>
            <strong>{algorithms[selectedAlgorithm as keyof typeof algorithms].name}:</strong>{" "}
            {algorithms[selectedAlgorithm as keyof typeof algorithms].description}
            <br />
            <strong>Time Complexity:</strong> {algorithms[selectedAlgorithm as keyof typeof algorithms].complexity}
          </AlertDescription>
        </Alert>

        {/* Compression Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Original Text
            </h3>
            <div className="p-3 bg-muted rounded font-mono text-sm break-all">
              {compressionResults.original}
            </div>
            <div className="text-sm text-muted-foreground">
              Size: {compressionResults.original.length} characters
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Compressed Result
            </h3>
            <div className="p-3 bg-muted rounded font-mono text-sm break-all">
              {compressionResults.compressed}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Compression Ratio:</span>
                <span className="font-mono">{(compressionResults.compressionRatio * 100).toFixed(1)}%</span>
              </div>
              <Progress value={compressionResults.compressionRatio * 100} className="h-2" />
              <div className="text-sm text-muted-foreground">
                Space Savings: {compressionResults.savings.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* Algorithm Details */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Algorithm Details
          </h3>
          
          <Tabs defaultValue="process" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="process">Process</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="process" className="space-y-4">
              <div className="grid gap-2 max-h-40 overflow-y-auto">
                {selectedAlgorithm === "huffman" && compressionResults.details.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-muted rounded text-sm">
                    <span className="font-mono">'{item.char}'</span>
                    <span className="text-muted-foreground">frequency: {item.freq}</span>
                    <Badge variant="outline">{item.code}</Badge>
                  </div>
                ))}
                
                {selectedAlgorithm === "lz77" && compressionResults.details.map((token: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-muted rounded text-sm">
                    <span className="font-mono">{token.value}</span>
                    <Badge variant={token.type === 'reference' ? "default" : "secondary"}>
                      {token.type}
                    </Badge>
                  </div>
                ))}
                
                {selectedAlgorithm === "rle" && compressionResults.details.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-muted rounded text-sm">
                    <span className="font-mono">'{item.char}'</span>
                    <Badge variant="outline">×{item.count}</Badge>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="analysis" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-medium">Speed</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedAlgorithm === "huffman" && "Moderate - requires tree building"}
                    {selectedAlgorithm === "lz77" && "Slow - sliding window search"}
                    {selectedAlgorithm === "rle" && "Very fast - single pass"}
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="font-medium">Memory</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedAlgorithm === "huffman" && "Moderate - stores frequency table"}
                    {selectedAlgorithm === "lz77" && "High - maintains search window"}
                    {selectedAlgorithm === "rle" && "Low - processes sequentially"}
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    <span className="font-medium">Effectiveness</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedAlgorithm === "huffman" && "High for varied frequencies"}
                    {selectedAlgorithm === "lz77" && "Excellent for repeated patterns"}
                    {selectedAlgorithm === "rle" && "Great for consecutive repeats"}
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Best Practices */}
        <div className="space-y-3">
          <h3 className="font-semibold">Best Practices</h3>
          <div className="grid gap-2">
            {algorithms[selectedAlgorithm as keyof typeof algorithms].bestFor.map((practice, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full" />
                {practice}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};