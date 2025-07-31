import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Code, 
  Download, 
  Copy, 
  Settings, 
  Rocket, 
  ExternalLink,
  FileText,
  Database,
  Globe
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CodeGeneratorBuilderProps {
  projectConfig: any;
  updateProjectConfig: (updates: any) => void;
  onStepComplete: () => void;
}

export const CodeGeneratorBuilder = ({ projectConfig, updateProjectConfig, onStepComplete }: CodeGeneratorBuilderProps) => {
  const [selectedFramework, setSelectedFramework] = useState("python-fastapi");
  const [deploymentTarget, setDeploymentTarget] = useState("docker");
  const { toast } = useToast();

  const frameworks = [
    { id: "python-fastapi", name: "Python + FastAPI", description: "Modern Python web framework" },
    { id: "node-express", name: "Node.js + Express", description: "JavaScript backend framework" },
    { id: "python-flask", name: "Python + Flask", description: "Lightweight Python framework" },
    { id: "next-api", name: "Next.js API Routes", description: "Full-stack React framework" }
  ];

  const deploymentOptions = [
    { id: "docker", name: "Docker Container", description: "Containerized deployment" },
    { id: "vercel", name: "Vercel", description: "Serverless deployment" },
    { id: "aws-lambda", name: "AWS Lambda", description: "Serverless functions" },
    { id: "local", name: "Local Development", description: "Run on your machine" }
  ];

  const generatePythonCode = () => {
    return `# AI Assistant API - Generated Code
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai
import pinecone
from typing import List, Optional
import os

app = FastAPI(title="${projectConfig.name}")

# Configuration
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

# Initialize clients
openai.api_key = OPENAI_API_KEY
pinecone.init(api_key=PINECONE_API_KEY, environment="us-west1-gcp")

class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    conversation_id: str
    confidence: float

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Knowledge base retrieval (if enabled)
        ${projectConfig.hasKnowledgeBase ? `
        # Retrieve relevant documents
        index = pinecone.Index("${projectConfig.name.toLowerCase()}-index")
        
        # Create embedding for user query
        embedding_response = openai.Embedding.create(
            input=request.message,
            model="text-embedding-ada-002"
        )
        query_embedding = embedding_response['data'][0]['embedding']
        
        # Search for relevant documents
        search_results = index.query(
            vector=query_embedding,
            top_k=5,
            include_metadata=True
        )
        
        # Prepare context from search results
        context = "\\n".join([match['metadata']['text'] for match in search_results['matches']])
        
        system_prompt = f"""${projectConfig.systemPrompt}
        
        Use the following context to answer the user's question:
        {context}
        """
        ` : `
        system_prompt = "${projectConfig.systemPrompt}"
        `}
        
        # Generate response
        response = openai.ChatCompletion.create(
            model="${projectConfig.model}",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": request.message}
            ],
            temperature=${projectConfig.temperature},
            max_tokens=${projectConfig.maxTokens}
        )
        
        ai_response = response.choices[0].message.content
        
        # Safety checks
        ${projectConfig.safetySettings?.hallucinationDetection ? `
        # Hallucination detection (simplified)
        confidence = min(response.choices[0].logprobs.top_logprobs[0].values()) if response.choices[0].logprobs else 0.8
        
        if confidence < ${projectConfig.safetySettings.confidenceThreshold[0]}:
            ai_response = "I'm not confident in my response. Please rephrase your question or provide more context."
        ` : `
        confidence = 0.9  # Default confidence
        `}
        
        return ChatResponse(
            response=ai_response,
            conversation_id=request.conversation_id or "new-conversation",
            confidence=confidence
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy", "project": "${projectConfig.name}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)`;
  };

  const generateDockerfile = () => {
    return `# Dockerfile for ${projectConfig.name}
FROM python:3.11-slim

WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`;
  };

  const generateRequirements = () => {
    return `# Requirements for ${projectConfig.name}
fastapi==0.104.1
uvicorn==0.24.0
openai==1.3.0
${projectConfig.hasKnowledgeBase ? 'pinecone-client==2.2.4' : ''}
${projectConfig.safetySettings?.contentFiltering ? 'transformers==4.35.0' : ''}
pydantic==2.5.0
python-dotenv==1.0.0`;
  };

  const generateEnvTemplate = () => {
    return `# Environment variables for ${projectConfig.name}
OPENAI_API_KEY=your_openai_api_key_here
${projectConfig.hasKnowledgeBase ? 'PINECONE_API_KEY=your_pinecone_api_key_here' : ''}
${projectConfig.hasKnowledgeBase ? 'PINECONE_ENVIRONMENT=us-west1-gcp' : ''}

# Optional: Additional API keys
${projectConfig.apiProvider === 'anthropic' ? 'ANTHROPIC_API_KEY=your_anthropic_api_key_here' : ''}`;
  };

  const generateReadme = () => {
    return `# ${projectConfig.name}

${projectConfig.description}

## Features

- **AI Model**: ${projectConfig.model} via ${projectConfig.apiProvider}
- **Use Case**: ${projectConfig.useCase}
${projectConfig.hasKnowledgeBase ? '- **Knowledge Base**: RAG with vector search' : ''}
- **Safety**: Content filtering and hallucination detection
- **Framework**: ${frameworks.find(f => f.id === selectedFramework)?.name}

## Quick Start

1. **Install Dependencies**
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

2. **Environment Setup**
   \`\`\`bash
   cp .env.template .env
   # Edit .env with your API keys
   \`\`\`

3. **Run the Application**
   \`\`\`bash
   python main.py
   \`\`\`

4. **Test the API**
   \`\`\`bash
   curl -X POST "http://localhost:8000/chat" \\
        -H "Content-Type: application/json" \\
        -d '{"message": "Hello, how can you help me?"}'
   \`\`\`

## API Endpoints

- \`POST /chat\` - Send a message to the AI
- \`GET /health\` - Health check endpoint

## Configuration

The AI is configured with:
- Temperature: ${projectConfig.temperature}
- Max Tokens: ${projectConfig.maxTokens}
- Safety Confidence Threshold: ${projectConfig.safetySettings?.confidenceThreshold?.[0] || 0.7}

## Deployment

### Docker
\`\`\`bash
docker build -t ${projectConfig.name.toLowerCase()} .
docker run -p 8000:8000 --env-file .env ${projectConfig.name.toLowerCase()}
\`\`\`

### Cloud Deployment
This application is ready for deployment on:
- AWS Lambda
- Google Cloud Run
- Vercel
- Railway
- Render

## Safety Features

${projectConfig.safetySettings?.contentFiltering ? '- Content filtering enabled' : ''}
${projectConfig.safetySettings?.hallucinationDetection ? '- Hallucination detection enabled' : ''}
${projectConfig.safetySettings?.toxicityPrevention ? '- Toxicity prevention enabled' : ''}

## Support

For questions or issues, please refer to the documentation or contact support.`;
  };

  const copyToClipboard = (content: string, filename: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      description: `${filename} has been copied to your clipboard.`
    });
  };

  const handleFinishProject = () => {
    updateProjectConfig({
      framework: selectedFramework,
      deploymentTarget: deploymentTarget,
      generatedAt: new Date().toISOString()
    });
    onStepComplete();
    
    toast({
      title: "Project Generated Successfully!",
      description: "Your AI project is ready for deployment."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Code Generation & Deployment
          </CardTitle>
          <CardDescription>
            Generate production-ready code for your AI application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Framework</label>
              <Select value={selectedFramework} onValueChange={setSelectedFramework}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {frameworks.map((framework) => (
                    <SelectItem key={framework.id} value={framework.id}>
                      {framework.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Deployment</label>
              <Select value={deploymentTarget} onValueChange={setDeploymentTarget}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {deploymentOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2">Project Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Name:</span> {projectConfig.name}
                </div>
                <div>
                  <span className="text-muted-foreground">Model:</span> {projectConfig.model}
                </div>
                <div>
                  <span className="text-muted-foreground">Use Case:</span> {projectConfig.useCase}
                </div>
                <div>
                  <span className="text-muted-foreground">Knowledge Base:</span> {projectConfig.hasKnowledgeBase ? 'Yes' : 'No'}
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Tabs defaultValue="main-code" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="main-code">Main Code</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="main-code">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>main.py</CardTitle>
                <CardDescription>Your AI application's main code</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(generatePythonCode(), "main.py")}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generatePythonCode()}
                readOnly
                className="font-mono text-sm min-h-[400px]"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config">
          <div className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>requirements.txt</CardTitle>
                  <CardDescription>Python dependencies</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(generateRequirements(), "requirements.txt")}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={generateRequirements()}
                  readOnly
                  className="font-mono text-sm"
                  rows={8}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>.env.template</CardTitle>
                  <CardDescription>Environment variables template</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(generateEnvTemplate(), ".env.template")}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={generateEnvTemplate()}
                  readOnly
                  className="font-mono text-sm"
                  rows={6}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="deployment">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Dockerfile</CardTitle>
                <CardDescription>Container configuration</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(generateDockerfile(), "Dockerfile")}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generateDockerfile()}
                readOnly
                className="font-mono text-sm"
                rows={12}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="docs">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>README.md</CardTitle>
                <CardDescription>Project documentation</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(generateReadme(), "README.md")}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generateReadme()}
                readOnly
                className="font-mono text-sm min-h-[400px]"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            Ready to Deploy
          </CardTitle>
          <CardDescription>
            Your AI application is ready for deployment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 justify-end">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Project Files
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              View Deployment Guide
            </Button>
            <Button onClick={handleFinishProject} size="lg">
              Complete Project Setup
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};