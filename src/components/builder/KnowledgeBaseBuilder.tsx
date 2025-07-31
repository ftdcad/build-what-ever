import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Database, Settings, CheckCircle } from "lucide-react";
import { ChunkingStrategyDemo } from "../ChunkingStrategyDemo";

interface KnowledgeBaseBuilderProps {
  projectConfig: any;
  updateProjectConfig: (updates: any) => void;
  onStepComplete: () => void;
}

const vectorDatabases = [
  {
    id: "pinecone",
    name: "Pinecone",
    description: "Managed vector database with great performance",
    pricing: "$0.096/month per 100K vectors",
    setup: "Easy"
  },
  {
    id: "weaviate",
    name: "Weaviate",
    description: "Open-source vector database with advanced features",
    pricing: "Free (self-hosted) or $25/month",
    setup: "Medium"
  },
  {
    id: "chroma",
    name: "ChromaDB",
    description: "Simple and fast vector database",
    pricing: "Free (self-hosted)",
    setup: "Easy"
  },
  {
    id: "supabase",
    name: "Supabase Vector",
    description: "PostgreSQL with vector extensions",
    pricing: "$25/month (includes database)",
    setup: "Easy"
  }
];

export const KnowledgeBaseBuilder = ({ projectConfig, updateProjectConfig, onStepComplete }: KnowledgeBaseBuilderProps) => {
  const [useKnowledgeBase, setUseKnowledgeBase] = useState(projectConfig.hasKnowledgeBase || false);
  const [selectedVectorDB, setSelectedVectorDB] = useState("");
  const [chunkingStrategy, setChunkingStrategy] = useState(projectConfig.chunkingStrategy || "recursive");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [processingProgress, setProcessingProgress] = useState(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    
    // Simulate processing
    setProcessingProgress(0);
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleContinue = () => {
    updateProjectConfig({
      hasKnowledgeBase: useKnowledgeBase,
      vectorDatabase: selectedVectorDB,
      chunkingStrategy: chunkingStrategy,
      documentsUploaded: uploadedFiles.length
    });
    onStepComplete();
  };

  const isConfigValid = !useKnowledgeBase || (selectedVectorDB && chunkingStrategy);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Knowledge Base Configuration</CardTitle>
          <CardDescription>
            Configure document processing and vector storage for your AI system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Switch
              id="use-knowledge-base"
              checked={useKnowledgeBase}
              onCheckedChange={setUseKnowledgeBase}
            />
            <Label htmlFor="use-knowledge-base">Enable Knowledge Base (RAG)</Label>
          </div>

          {useKnowledgeBase && (
            <>
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold">Vector Database Selection</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vectorDatabases.map((db) => (
                    <Card
                      key={db.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedVectorDB === db.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedVectorDB(db.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold">{db.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {db.setup}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{db.description}</p>
                        <p className="text-sm font-medium">{db.pricing}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Document Upload</h3>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <div className="space-y-2">
                    <p className="text-lg font-medium">Upload your documents</p>
                    <p className="text-sm text-muted-foreground">
                      Supports PDF, TXT, DOCX, and more
                    </p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.txt,.docx,.md"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button asChild className="cursor-pointer">
                        <span>Select Files</span>
                      </Button>
                    </label>
                  </div>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="font-medium">Uploaded Files ({uploadedFiles.length})</h4>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <FileText className="h-4 w-4" />
                        <span className="flex-1 text-sm">{file.name}</span>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                    ))}
                    
                    {processingProgress > 0 && processingProgress < 100 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Processing documents...</span>
                          <span>{processingProgress}%</span>
                        </div>
                        <Progress value={processingProgress} />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Chunking Strategy</h3>
                <div className="space-y-4">
                  <Select value={chunkingStrategy} onValueChange={setChunkingStrategy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select chunking strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recursive">Recursive Text Splitting</SelectItem>
                      <SelectItem value="semantic">Semantic Chunking</SelectItem>
                      <SelectItem value="fixed">Fixed Size Chunks</SelectItem>
                      <SelectItem value="document">Document-based</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <ChunkingStrategyDemo />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}

          {!useKnowledgeBase && (
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <div className="text-center">
                  <Database className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">No Knowledge Base</h3>
                  <p className="text-sm text-muted-foreground">
                    Your AI will work with general knowledge only. You can always add a knowledge base later.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          onClick={handleContinue}
          disabled={!isConfigValid}
          size="lg"
        >
          Continue to Safety Configuration
        </Button>
      </div>
    </div>
  );
};