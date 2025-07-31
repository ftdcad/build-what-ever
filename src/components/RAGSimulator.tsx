import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Search, Database, Brain, ArrowRight } from "lucide-react";

export const RAGSimulator = () => {
  const [query, setQuery] = useState("");
  const [retrievedDocs, setRetrievedDocs] = useState<any[]>([]);
  const [response, setResponse] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const documents = [
    {
      id: 1,
      title: "AI Model Training Guide",
      content: "Large Language Models are trained using transformer architecture with attention mechanisms...",
      similarity: 0.95,
      type: "technical"
    },
    {
      id: 2,
      title: "RAG Implementation Best Practices",
      content: "Retrieval Augmented Generation combines pre-trained language models with external knowledge...",
      similarity: 0.92,
      type: "guide"
    },
    {
      id: 3,
      title: "Vector Database Setup",
      content: "Embeddings are stored in vector databases for fast similarity search and retrieval...",
      similarity: 0.88,
      type: "technical"
    },
    {
      id: 4,
      title: "Fine-tuning vs RAG",
      content: "Fine-tuning modifies model weights while RAG augments responses with retrieved information...",
      similarity: 0.85,
      type: "comparison"
    }
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    // Simulate retrieval delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Filter and sort documents by relevance
    const relevant = documents
      .filter(doc => doc.content.toLowerCase().includes(query.toLowerCase()) || 
                    doc.title.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 3);
    
    setRetrievedDocs(relevant);
    
    // Generate response based on retrieved docs
    const context = relevant.map(doc => doc.content).join(" ");
    setResponse(`Based on the retrieved documents: ${context.slice(0, 200)}... This demonstrates how RAG combines retrieval with generation to provide informed responses.`);
    
    setIsSearching(false);
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🔍</span>
          RAG (Retrieval Augmented Generation) Simulator
        </CardTitle>
        <Badge variant="secondary">Live Knowledge Retrieval</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Query Input */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Enter your query:</label>
            <div className="flex gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about AI, RAG, or machine learning..."
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={handleSearch} disabled={isSearching}>
                {isSearching ? (
                  <div className="w-4 h-4 border-2 border-t-transparent border-primary rounded-full animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* RAG Process Visualization */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Search className="w-5 h-5 text-primary" />
                <h4 className="font-semibold">1. Query Processing</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Convert user query to embeddings for semantic search
              </p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-5 h-5 text-primary" />
                <h4 className="font-semibold">2. Document Retrieval</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Find most relevant documents from knowledge base
              </p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5 text-primary" />
                <h4 className="font-semibold">3. Response Generation</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Generate informed response using retrieved context
              </p>
            </Card>
          </div>

          {/* Retrieved Documents */}
          {retrievedDocs.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold">Retrieved Documents:</h4>
              <ScrollArea className="h-48 border rounded p-3">
                {retrievedDocs.map((doc, index) => (
                  <div key={doc.id} className="mb-4 last:mb-0">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-medium text-sm">{doc.title}</h5>
                      <Badge variant="outline" className="text-xs">
                        {(doc.similarity * 100).toFixed(0)}% match
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{doc.content.slice(0, 100)}...</p>
                    {index < retrievedDocs.length - 1 && <Separator className="mt-3" />}
                  </div>
                ))}
              </ScrollArea>
            </div>
          )}

          {/* Generated Response */}
          {response && (
            <div className="space-y-3">
              <h4 className="font-semibold">AI Response:</h4>
              <Card className="p-4 bg-primary/5 border-primary/20">
                <p className="text-sm">{response}</p>
              </Card>
            </div>
          )}

          {/* Key Benefits */}
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">RAG Benefits:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Access to current information</li>
                <li>• Reduced hallucinations</li>
                <li>• Verifiable sources</li>
                <li>• Domain-specific knowledge</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Use Cases:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Customer support chatbots</li>
                <li>• Legal document analysis</li>
                <li>• Technical documentation</li>
                <li>• Research assistance</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};