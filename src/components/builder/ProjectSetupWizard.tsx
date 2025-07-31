import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, FileText, Search, Bot, Users, ShoppingCart } from "lucide-react";

interface ProjectSetupWizardProps {
  projectConfig: any;
  updateProjectConfig: (updates: any) => void;
  onStepComplete: () => void;
}

const useCaseTemplates = [
  {
    id: "chatbot",
    title: "Customer Service Chatbot",
    description: "Automated customer support with natural language understanding",
    icon: MessageSquare,
    estimatedCost: "$0.02-0.10 per conversation",
    complexity: "Medium"
  },
  {
    id: "document-analysis",
    title: "Document Analysis",
    description: "Extract insights and answer questions from large document collections",
    icon: FileText,
    estimatedCost: "$0.05-0.25 per document",
    complexity: "High"
  },
  {
    id: "search-assistant",
    title: "Intelligent Search",
    description: "Semantic search with AI-powered result summarization",
    icon: Search,
    estimatedCost: "$0.01-0.05 per search",
    complexity: "Medium"
  },
  {
    id: "content-generator",
    title: "Content Generator",
    description: "Generate marketing copy, articles, and creative content",
    icon: Bot,
    estimatedCost: "$0.10-0.50 per generation",
    complexity: "Low"
  },
  {
    id: "recommendation",
    title: "Recommendation Engine",
    description: "Personalized recommendations based on user behavior and preferences",
    icon: Users,
    estimatedCost: "$0.01-0.03 per recommendation",
    complexity: "High"
  },
  {
    id: "ecommerce-assistant",
    title: "E-commerce Assistant",
    description: "Product recommendations and shopping assistance",
    icon: ShoppingCart,
    estimatedCost: "$0.02-0.08 per interaction",
    complexity: "Medium"
  }
];

export const ProjectSetupWizard = ({ projectConfig, updateProjectConfig, onStepComplete }: ProjectSetupWizardProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState(projectConfig.useCase || "");
  const [formData, setFormData] = useState({
    name: projectConfig.name || "",
    description: projectConfig.description || "",
    customUseCase: projectConfig.useCase && !useCaseTemplates.find(t => t.id === projectConfig.useCase) ? projectConfig.useCase : ""
  });

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = useCaseTemplates.find(t => t.id === templateId);
    if (template) {
      setFormData(prev => ({
        ...prev,
        description: prev.description || template.description
      }));
    }
  };

  const handleSubmit = () => {
    const useCase = selectedTemplate === "custom" ? formData.customUseCase : selectedTemplate;
    
    updateProjectConfig({
      name: formData.name,
      description: formData.description,
      useCase: useCase,
      id: formData.name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now()
    });
    
    onStepComplete();
  };

  const isFormValid = formData.name && formData.description && (selectedTemplate === "custom" ? formData.customUseCase : selectedTemplate);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Information</CardTitle>
          <CardDescription>
            Start by providing basic information about your AI project
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="project-name">Project Name</Label>
            <Input
              id="project-name"
              placeholder="My AI Assistant"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          
          <div>
            <Label htmlFor="project-description">Project Description</Label>
            <Textarea
              id="project-description"
              placeholder="Describe what your AI will do and how it will help users..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Use Case Templates</CardTitle>
          <CardDescription>
            Choose a template that best matches your project goals, or create a custom solution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {useCaseTemplates.map((template) => (
              <Card
                key={template.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <template.icon className="h-6 w-6 text-primary mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{template.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                          {template.complexity}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {template.estimatedCost}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedTemplate === "custom" ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedTemplate("custom")}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Bot className="h-6 w-6 text-primary" />
                <h3 className="font-semibold">Custom Solution</h3>
              </div>
              {selectedTemplate === "custom" && (
                <div className="mt-4">
                  <Label htmlFor="custom-use-case">Describe your custom use case</Label>
                  <Textarea
                    id="custom-use-case"
                    placeholder="Describe your unique AI use case..."
                    value={formData.customUseCase}
                    onChange={(e) => setFormData(prev => ({ ...prev, customUseCase: e.target.value }))}
                    rows={3}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          onClick={handleSubmit}
          disabled={!isFormValid}
          size="lg"
        >
          Continue to Model Configuration
        </Button>
      </div>
    </div>
  );
};