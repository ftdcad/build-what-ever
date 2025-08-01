import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Play, 
  RotateCcw, 
  Upload, 
  Download,
  BarChart3, 
  Clock, 
  Zap,
  FileText,
  Cpu,
  HardDrive,
  Gauge
} from "lucide-react";

// Sample texts for testing
const sampleTexts = {
  lorem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  repetitive: "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.",
  technical: "function compressData(input) { const frequency = {}; for (let char of input) { frequency[char] = (frequency[char] || 0) + 1; } return frequency; }",
  natural: "Artificial intelligence represents one of the most significant technological advances of our time. Machine learning algorithms can process vast amounts of data to identify patterns and make predictions."
};

// Compression algorithms with realistic implementations
const compressionAlgorithms = {
  huffman: {
    name: "Huffman Coding",
    compress: (text: string) => {
      // Simplified Huffman implementation
      const freq: Record<string, number> = {};
      for (const char of text) {
        freq[char] = (freq[char] || 0) + 1;
      }
      
      // Create codes based on frequency (simplified)
      const sorted = Object.entries(freq).sort(([,a], [,b]) => b - a);
      let totalBits = 0;
      sorted.forEach(([char, count], index) => {
        const codeLength = Math.max(1, Math.ceil(Math.log2(sorted.length - index)));
        totalBits += count * codeLength;
      });
      
      return {
        compressed: `Huffman encoded (${Math.ceil(totalBits / 8)} bytes)`,
        ratio: Math.ceil(totalBits / 8) / text.length,
        details: sorted.slice(0, 5).map(([char, freq], index) => ({
          char: char === ' ' ? '␣' : char,
          freq,
          code: index.toString(2).padStart(3, '0')
        }))
      };
    }
  },
  lz77: {
    name: "LZ77",
    compress: (text: string) => {
      let compressed = [];
      let i = 0;
      
      while (i < text.length) {
        let match = { length: 0, distance: 0 };
        
        // Look for matches in the previous 255 characters
        for (let j = Math.max(0, i - 255); j < i; j++) {
          let len = 0;
          while (j + len < i && i + len < text.length && text[j + len] === text[i + len]) {
            len++;
          }
          if (len > match.length) {
            match = { length: len, distance: i - j };
          }
        }
        
        if (match.length >= 3) {
          compressed.push(`(${match.distance},${match.length})`);
          i += match.length;
        } else {
          compressed.push(text[i]);
          i++;
        }
      }
      
      const compressedStr = compressed.join('');
      return {
        compressed: compressedStr.length > 100 ? compressedStr.substring(0, 100) + '...' : compressedStr,
        ratio: compressedStr.length / text.length,
        details: compressed.slice(0, 10).map((token, index) => ({
          index,
          token,
          type: token.includes('(') ? 'reference' : 'literal'
        }))
      };
    }
  },
  rle: {
    name: "Run-Length Encoding",
    compress: (text: string) => {
      let compressed = '';
      let i = 0;
      
      while (i < text.length) {
        let count = 1;
        const current = text[i];
        
        while (i + count < text.length && text[i + count] === current) {
          count++;
        }
        
        compressed += count > 1 ? `${current}${count}` : current;
        i += count;
      }
      
      return {
        compressed: compressed.length > 100 ? compressed.substring(0, 100) + '...' : compressed,
        ratio: compressed.length / text.length,
        details: []
      };
    }
  },
  bpe: {
    name: "Byte Pair Encoding",
    compress: (text: string) => {
      // Simplified BPE implementation
      let tokens = text.split('');
      const merges = [];
      
      // Find most frequent pairs and merge them (simplified)
      for (let iteration = 0; iteration < 3; iteration++) {
        const pairs: Record<string, number> = {};
        
        for (let i = 0; i < tokens.length - 1; i++) {
          const pair = tokens[i] + tokens[i + 1];
          pairs[pair] = (pairs[pair] || 0) + 1;
        }
        
        const mostFrequent = Object.entries(pairs).sort(([,a], [,b]) => b - a)[0];
        if (!mostFrequent || mostFrequent[1] < 2) break;
        
        const [pair, freq] = mostFrequent;
        merges.push({ pair, freq });
        
        // Replace all occurrences of this pair
        const newTokens = [];
        let i = 0;
        while (i < tokens.length) {
          if (i < tokens.length - 1 && tokens[i] + tokens[i + 1] === pair) {
            newTokens.push(pair);
            i += 2;
          } else {
            newTokens.push(tokens[i]);
            i++;
          }
        }
        tokens = newTokens;
      }
      
      const compressed = tokens.join(' ');
      return {
        compressed: compressed.length > 100 ? compressed.substring(0, 100) + '...' : compressed,
        ratio: compressed.length / text.length,
        details: merges
      };
    }
  }
};

export const CompressionLab = () => {
  const [inputText, setInputText] = useState(sampleTexts.lorem);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("huffman");
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any>(null);

  const runCompression = async () => {
    setIsRunning(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const algorithm = compressionAlgorithms[selectedAlgorithm as keyof typeof compressionAlgorithms];
    const startTime = performance.now();
    const result = algorithm.compress(inputText);
    const endTime = performance.now();
    
    setResults({
      ...result,
      algorithm: algorithm.name,
      originalSize: inputText.length,
      compressedSize: Math.round(inputText.length * result.ratio),
      savings: ((1 - result.ratio) * 100).toFixed(1),
      executionTime: (endTime - startTime).toFixed(2)
    });
    
    setIsRunning(false);
  };

  const resetLab = () => {
    setInputText(sampleTexts.lorem);
    setResults(null);
  };

  const loadSample = (key: keyof typeof sampleTexts) => {
    setInputText(sampleTexts[key]);
    setResults(null);
  };

  const performanceMetrics = useMemo(() => {
    if (!results) return null;
    
    const textComplexity = new Set(inputText).size / inputText.length; // Character diversity
    const repetitionRatio = (inputText.length - new Set(inputText.split(' ')).size) / inputText.length;
    
    return {
      complexity: (textComplexity * 100).toFixed(1),
      repetition: (repetitionRatio * 100).toFixed(1),
      efficiency: results.savings,
      speed: parseFloat(results.executionTime) < 1 ? "Excellent" : 
             parseFloat(results.executionTime) < 5 ? "Good" : "Moderate"
    };
  }, [results, inputText]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gauge className="w-5 h-5" />
          Interactive Compression Laboratory
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Input Text</h3>
            <div className="flex gap-2">
              {Object.entries(sampleTexts).map(([key, _]) => (
                <Button
                  key={key}
                  variant="outline"
                  size="sm"
                  onClick={() => loadSample(key as keyof typeof sampleTexts)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to compress..."
            className="min-h-32 font-mono text-sm"
          />
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Characters: {inputText.length}</span>
            <span>Words: {inputText.split(/\s+/).filter(Boolean).length}</span>
            <span>Unique chars: {new Set(inputText).size}</span>
          </div>
        </div>

        {/* Algorithm Selection */}
        <div className="space-y-3">
          <h3 className="font-semibold">Compression Algorithm</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.entries(compressionAlgorithms).map(([key, algorithm]) => (
              <Button
                key={key}
                variant={selectedAlgorithm === key ? "default" : "outline"}
                onClick={() => setSelectedAlgorithm(key)}
                className="h-auto p-3"
              >
                <div className="text-center">
                  <div className="font-medium">{algorithm.name}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-3">
          <Button 
            onClick={runCompression} 
            disabled={isRunning || !inputText.trim()}
            className="flex items-center gap-2"
          >
            {isRunning ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Run Compression
              </>
            )}
          </Button>
          
          <Button variant="outline" onClick={resetLab}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Results Section */}
        {results && (
          <div className="space-y-6">
            <Alert>
              <Zap className="w-4 h-4" />
              <AlertDescription>
                Compression completed using <strong>{results.algorithm}</strong> in {results.executionTime}ms
              </AlertDescription>
            </Alert>

            {/* Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <HardDrive className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">Size Reduction</span>
                </div>
                <div className="text-2xl font-bold text-green-600">{results.savings}%</div>
                <div className="text-sm text-muted-foreground">
                  {results.originalSize} → {results.compressedSize} chars
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-purple-500" />
                  <span className="font-medium">Compression Ratio</span>
                </div>
                <div className="text-2xl font-bold">{(results.ratio * 100).toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">of original size</div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-green-500" />
                  <span className="font-medium">Execution Time</span>
                </div>
                <div className="text-2xl font-bold">{results.executionTime}</div>
                <div className="text-sm text-muted-foreground">milliseconds</div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-4 h-4 text-orange-500" />
                  <span className="font-medium">Efficiency</span>
                </div>
                <div className="text-2xl font-bold">{performanceMetrics?.speed}</div>
                <div className="text-sm text-muted-foreground">performance rating</div>
              </Card>
            </div>

            {/* Detailed Results */}
            <Tabs defaultValue="output" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="output">Compressed Output</TabsTrigger>
                <TabsTrigger value="analysis">Algorithm Analysis</TabsTrigger>
                <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="output" className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Compressed Result</h4>
                  <div className="p-4 bg-muted rounded font-mono text-sm break-all">
                    {results.compressed}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Original Size:</span>
                      <span className="ml-2">{results.originalSize} characters</span>
                    </div>
                    <div>
                      <span className="font-medium">Compressed Size:</span>
                      <span className="ml-2">{results.compressedSize} characters</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="analysis" className="space-y-4">
                <div className="space-y-4">
                  <h4 className="font-medium">Algorithm Details</h4>
                  
                  {results.details && results.details.length > 0 && (
                    <div className="space-y-2">
                      {selectedAlgorithm === "huffman" && (
                        <div>
                          <h5 className="text-sm font-medium mb-2">Character Frequencies & Codes</h5>
                          <div className="grid gap-2">
                            {results.details.map((item: any, index: number) => (
                              <div key={index} className="flex justify-between items-center p-2 bg-muted rounded text-sm">
                                <span className="font-mono">'{item.char}'</span>
                                <span>freq: {item.freq}</span>
                                <Badge variant="outline">{item.code}</Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {selectedAlgorithm === "lz77" && (
                        <div>
                          <h5 className="text-sm font-medium mb-2">Compression Tokens</h5>
                          <div className="grid gap-2">
                            {results.details.map((item: any, index: number) => (
                              <div key={index} className="flex justify-between items-center p-2 bg-muted rounded text-sm">
                                <span className="font-mono">{item.token}</span>
                                <Badge variant={item.type === 'reference' ? "default" : "secondary"}>
                                  {item.type}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {selectedAlgorithm === "bpe" && (
                        <div>
                          <h5 className="text-sm font-medium mb-2">Byte Pair Merges</h5>
                          <div className="grid gap-2">
                            {results.details.map((item: any, index: number) => (
                              <div key={index} className="flex justify-between items-center p-2 bg-muted rounded text-sm">
                                <span className="font-mono">'{item.pair}'</span>
                                <span>frequency: {item.freq}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="metrics" className="space-y-4">
                {performanceMetrics && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Text Characteristics</h4>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Text Complexity:</span>
                            <span>{performanceMetrics.complexity}%</span>
                          </div>
                          <Progress value={parseFloat(performanceMetrics.complexity)} className="h-2" />
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Repetition Ratio:</span>
                            <span>{performanceMetrics.repetition}%</span>
                          </div>
                          <Progress value={parseFloat(performanceMetrics.repetition)} className="h-2" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Compression Efficiency</h4>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Space Savings:</span>
                            <span>{performanceMetrics.efficiency}%</span>
                          </div>
                          <Progress value={parseFloat(performanceMetrics.efficiency)} className="h-2" />
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-muted rounded">
                          <span className="text-sm">Speed Rating:</span>
                          <Badge variant="outline">{performanceMetrics.speed}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
};