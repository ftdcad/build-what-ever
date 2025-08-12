
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Upload, Link, FileText, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChunkStrategy {
  id: string;
  key: string;
  name: string;
  description: string;
  params_schema: any;
}

interface Chunk {
  ordinal: number;
  start_char: number;
  end_char: number;
  text: string;
  token_count: number;
}

interface ChunkMetrics {
  total_chunks: number;
  total_tokens: number;
  avg_tokens_per_chunk: number;
  max_tokens: number;
  min_tokens: number;
}

export const ChunkCreator = () => {
  const [strategies, setStrategies] = useState<ChunkStrategy[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<string>('');
  const [sourceType, setSourceType] = useState<'paste' | 'upload' | 'url'>('paste');
  const [textContent, setTextContent] = useState('');
  const [documentTitle, setDocumentTitle] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [params, setParams] = useState<any>({});
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [metrics, setMetrics] = useState<ChunkMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadStrategies();
  }, []);

  useEffect(() => {
    if (selectedStrategy && strategies.length > 0) {
      const strategy = strategies.find(s => s.key === selectedStrategy);
      if (strategy) {
        // Set default params from schema
        const defaultParams: any = {};
        const schema = strategy.params_schema;
        if (schema.properties) {
          Object.keys(schema.properties).forEach(key => {
            const prop = schema.properties[key];
            if (prop.default !== undefined) {
              defaultParams[key] = prop.default;
            }
          });
        }
        setParams(defaultParams);
      }
    }
  }, [selectedStrategy, strategies]);

  useEffect(() => {
    if (textContent && selectedStrategy && Object.keys(params).length > 0) {
      previewChunks();
    }
  }, [textContent, selectedStrategy, params]);

  const loadStrategies = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('strategies-list');
      if (error) throw error;
      
      setStrategies(data.strategies);
      if (data.strategies.length > 0) {
        setSelectedStrategy(data.strategies[0].key);
      }
    } catch (error) {
      console.error('Error loading strategies:', error);
      toast({
        title: "Error",
        description: "Failed to load chunking strategies",
        variant: "destructive",
      });
    }
  };

  const previewChunks = async () => {
    if (!textContent || !selectedStrategy) return;

    setIsPreviewLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('chunk-preview', {
        body: {
          text: textContent,
          strategy_key: selectedStrategy,
          params
        }
      });

      if (error) throw error;

      setChunks(data.chunks);
      setMetrics(data.metrics);
    } catch (error) {
      console.error('Error previewing chunks:', error);
      toast({
        title: "Error",
        description: "Failed to preview chunks",
        variant: "destructive",
      });
    } finally {
      setIsPreviewLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/plain') {
      toast({
        title: "Error",
        description: "Please upload a text file (.txt)",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setTextContent(content);
      setDocumentTitle(file.name.replace('.txt', ''));
    };
    reader.readAsText(file);
  };

  const handleUrlLoad = async () => {
    if (!urlInput) return;

    setIsLoading(true);
    try {
      // Simple URL content loading (in a real app, you'd use a proper service)
      const response = await fetch(urlInput);
      const content = await response.text();
      setTextContent(content);
      setDocumentTitle(new URL(urlInput).hostname);
      toast({
        title: "Success",
        description: "Content loaded from URL",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load content from URL",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateParam = (key: string, value: any) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const renderParamControl = (key: string, prop: any) => {
    const value = params[key];

    if (prop.type === 'integer' || prop.type === 'number') {
      return (
        <div key={key} className="space-y-2">
          <Label htmlFor={key}>{key}</Label>
          <Input
            id={key}
            type="number"
            value={value || ''}
            onChange={(e) => updateParam(key, prop.type === 'integer' ? parseInt(e.target.value) : parseFloat(e.target.value))}
            min={prop.minimum}
            max={prop.maximum}
          />
        </div>
      );
    }

    if (prop.type === 'boolean') {
      return (
        <div key={key} className="flex items-center space-x-2">
          <input
            id={key}
            type="checkbox"
            checked={value || false}
            onChange={(e) => updateParam(key, e.target.checked)}
            className="rounded"
          />
          <Label htmlFor={key}>{key}</Label>
        </div>
      );
    }

    if (prop.enum) {
      return (
        <div key={key} className="space-y-2">
          <Label htmlFor={key}>{key}</Label>
          <select
            id={key}
            value={value || ''}
            onChange={(e) => updateParam(key, e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            {prop.enum.map((option: string) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div key={key} className="space-y-2">
        <Label htmlFor={key}>{key}</Label>
        <Input
          id={key}
          value={value || ''}
          onChange={(e) => updateParam(key, e.target.value)}
        />
      </div>
    );
  };

  const selectedStrategyData = strategies.find(s => s.key === selectedStrategy);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Chunk Creator</h1>
          <p className="text-muted-foreground mt-2">
            Upload or paste text content and experiment with different chunking strategies
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Source Input */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Source</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={sourceType} onValueChange={(value) => setSourceType(value as any)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="paste">
                      <FileText className="w-4 h-4 mr-2" />
                      Paste
                    </TabsTrigger>
                    <TabsTrigger value="upload">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </TabsTrigger>
                    <TabsTrigger value="url">
                      <Link className="w-4 h-4 mr-2" />
                      URL
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="paste" className="space-y-4">
                    <div>
                      <Label htmlFor="title">Document Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter document title"
                        value={documentTitle}
                        onChange={(e) => setDocumentTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="content">Text Content</Label>
                      <Textarea
                        id="content"
                        placeholder="Paste your text content here..."
                        value={textContent}
                        onChange={(e) => setTextContent(e.target.value)}
                        rows={10}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="upload" className="space-y-4">
                    <div>
                      <Label htmlFor="file">Upload Text File</Label>
                      <Input
                        id="file"
                        type="file"
                        accept=".txt"
                        onChange={handleFileUpload}
                      />
                    </div>
                    {textContent && (
                      <div>
                        <Label>Preview</Label>
                        <Textarea
                          value={textContent.substring(0, 200) + '...'}
                          readOnly
                          rows={4}
                        />
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="url" className="space-y-4">
                    <div>
                      <Label htmlFor="url">URL</Label>
                      <div className="flex gap-2">
                        <Input
                          id="url"
                          placeholder="https://example.com/document.txt"
                          value={urlInput}
                          onChange={(e) => setUrlInput(e.target.value)}
                        />
                        <Button onClick={handleUrlLoad} disabled={isLoading}>
                          {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                          Load
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Strategy Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Chunking Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Strategy</Label>
                    <select
                      value={selectedStrategy}
                      onChange={(e) => setSelectedStrategy(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      {strategies.map((strategy) => (
                        <option key={strategy.key} value={strategy.key}>
                          {strategy.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedStrategyData && (
                    <p className="text-sm text-muted-foreground">
                      {selectedStrategyData.description}
                    </p>
                  )}

                  {selectedStrategyData?.params_schema?.properties && (
                    <div className="space-y-3">
                      <Separator />
                      <h4 className="font-medium">Parameters</h4>
                      {Object.entries(selectedStrategyData.params_schema.properties).map(([key, prop]: [string, any]) =>
                        renderParamControl(key, prop)
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            {metrics && (
              <Card>
                <CardHeader>
                  <CardTitle>Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Total Chunks:</span>
                      <Badge variant="secondary" className="ml-2">{metrics.total_chunks}</Badge>
                    </div>
                    <div>
                      <span className="font-medium">Total Tokens:</span>
                      <Badge variant="secondary" className="ml-2">{metrics.total_tokens}</Badge>
                    </div>
                    <div>
                      <span className="font-medium">Avg Tokens:</span>
                      <Badge variant="secondary" className="ml-2">{metrics.avg_tokens_per_chunk}</Badge>
                    </div>
                    <div>
                      <span className="font-medium">Range:</span>
                      <Badge variant="secondary" className="ml-2">{metrics.min_tokens}-{metrics.max_tokens}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Chunk Preview
                  {isPreviewLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {chunks.map((chunk, index) => (
                    <div key={index} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Chunk {chunk.ordinal + 1}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{chunk.token_count} tokens</Badge>
                          <Badge variant="outline">{chunk.start_char}-{chunk.end_char}</Badge>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed">
                        {chunk.text.substring(0, 200)}
                        {chunk.text.length > 200 && '...'}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
