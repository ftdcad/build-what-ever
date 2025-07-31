import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Wrench, 
  Settings, 
  Brain, 
  Database, 
  Shield, 
  Code, 
  Rocket,
  CheckCircle,
  Circle
} from "lucide-react";

// Import existing components - we'll transform these
import { TemperatureGauge } from "./TemperatureGauge";
import ContextWindowDemo from "./ContextWindowDemo";
import { RAGSimulator } from "./RAGSimulator";
import { ModelComparison } from "./ModelComparison";
import { HallucinationDetector } from "./HallucinationDetector";
import { ChunkingStrategyDemo } from "./ChunkingStrategyDemo";

// New builder components
import { ProjectSetupWizard } from "./builder/ProjectSetupWizard";
import { ModelConfigBuilder } from "./builder/ModelConfigBuilder";
import { KnowledgeBaseBuilder } from "./builder/KnowledgeBaseBuilder";
import { SafetyConfigBuilder } from "./builder/SafetyConfigBuilder";
import { CodeGeneratorBuilder } from "./builder/CodeGeneratorBuilder";

interface ProjectConfig {
  id: string;
  name: string;
  description: string;
  useCase: string;
  apiProvider: string;
  model: string;
  temperature: number;
  maxTokens: number;
  hasKnowledgeBase: boolean;
  chunkingStrategy: string;
  safetySettings: any;
  completedSteps: string[];
}

const AIBuilderSystem = () => {
  const [mode, setMode] = useState<"education" | "builder">("builder");
  const [activeStep, setActiveStep] = useState("project-setup");
  const [projectConfig, setProjectConfig] = useState<ProjectConfig>({
    id: "",
    name: "",
    description: "",
    useCase: "",
    apiProvider: "",
    model: "",
    temperature: 0.7,
    maxTokens: 2048,
    hasKnowledgeBase: false,
    chunkingStrategy: "",
    safetySettings: {},
    completedSteps: []
  });

  const builderSteps = [
    {
      id: "project-setup",
      title: "Project Setup",
      description: "Define your AI project goals and requirements",
      icon: Settings,
      component: ProjectSetupWizard,
      completed: projectConfig.completedSteps.includes("project-setup")
    },
    {
      id: "model-config",
      title: "Model Configuration",
      description: "Choose and configure your AI model",
      icon: Brain,
      component: ModelConfigBuilder,
      completed: projectConfig.completedSteps.includes("model-config")
    },
    {
      id: "knowledge-base",
      title: "Knowledge Base",
      description: "Upload and configure your data sources",
      icon: Database,
      component: KnowledgeBaseBuilder,
      completed: projectConfig.completedSteps.includes("knowledge-base")
    },
    {
      id: "safety-guardrails",
      title: "Safety & Guardrails",
      description: "Configure safety measures and content filtering",
      icon: Shield,
      component: SafetyConfigBuilder,
      completed: projectConfig.completedSteps.includes("safety-guardrails")
    },
    {
      id: "code-generation",
      title: "Integration & Deploy",
      description: "Generate code and deployment configurations",
      icon: Code,
      component: CodeGeneratorBuilder,
      completed: projectConfig.completedSteps.includes("code-generation")
    }
  ];

  const educationSections = [
    {
      id: "core-concepts",
      title: "Core AI Concepts",
      description: "Understanding temperature, tokens, and model behavior",
      icon: Brain,
      components: [TemperatureGauge, ContextWindowDemo]
    },
    {
      id: "rag-systems",
      title: "RAG & Knowledge Systems",
      description: "Retrieval-Augmented Generation and document processing",
      icon: Database,
      components: [RAGSimulator, ChunkingStrategyDemo]
    },
    {
      id: "model-selection",
      title: "Model Selection & Comparison",
      description: "Compare different AI models and their capabilities",
      icon: Settings,
      components: [ModelComparison]
    },
    {
      id: "safety-detection",
      title: "Safety & Reliability",
      description: "Detect hallucinations and ensure AI safety",
      icon: Shield,
      components: [HallucinationDetector]
    }
  ];

  const completedStepsCount = projectConfig.completedSteps.length;
  const totalSteps = builderSteps.length;
  const progressPercentage = (completedStepsCount / totalSteps) * 100;

  const markStepCompleted = (stepId: string) => {
    if (!projectConfig.completedSteps.includes(stepId)) {
      setProjectConfig(prev => ({
        ...prev,
        completedSteps: [...prev.completedSteps, stepId]
      }));
    }
  };

  const updateProjectConfig = (updates: Partial<ProjectConfig>) => {
    setProjectConfig(prev => ({ ...prev, ...updates }));
  };

  const renderBuilderMode = () => {
    const currentStep = builderSteps.find(step => step.id === activeStep);
    const CurrentComponent = currentStep?.component;

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">AI Builder Platform</h1>
              <p className="text-xl text-muted-foreground">Build custom AI solutions step by step</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-sm">
                {completedStepsCount} of {totalSteps} steps completed
              </Badge>
              <Button 
                variant="ghost" 
                onClick={() => setMode("education")}
                className="flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Learn Mode
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="mb-4" />
              
              {/* Step Navigation */}
              <div className="flex flex-wrap gap-2">
                {builderSteps.map((step) => (
                  <Button
                    key={step.id}
                    variant={activeStep === step.id ? "default" : step.completed ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setActiveStep(step.id)}
                    className="flex items-center gap-2"
                  >
                    {step.completed ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Circle className="h-4 w-4" />
                    )}
                    <step.icon className="h-4 w-4" />
                    {step.title}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Builder Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {currentStep?.icon && <currentStep.icon className="h-5 w-5" />}
                    {currentStep?.title}
                  </CardTitle>
                  <CardDescription>{currentStep?.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projectConfig.name && (
                      <div>
                        <label className="text-sm font-medium">Project Name</label>
                        <p className="text-sm text-muted-foreground">{projectConfig.name}</p>
                      </div>
                    )}
                    {projectConfig.useCase && (
                      <div>
                        <label className="text-sm font-medium">Use Case</label>
                        <p className="text-sm text-muted-foreground">{projectConfig.useCase}</p>
                      </div>
                    )}
                    {projectConfig.apiProvider && (
                      <div>
                        <label className="text-sm font-medium">API Provider</label>
                        <p className="text-sm text-muted-foreground">{projectConfig.apiProvider}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {CurrentComponent && (
                <CurrentComponent
                  projectConfig={projectConfig}
                  updateProjectConfig={updateProjectConfig}
                  onStepComplete={() => markStepCompleted(activeStep)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderEducationMode = () => {
    const [activeSection, setActiveSection] = useState("core-concepts");
    const currentSection = educationSections.find(section => section.id === activeSection);

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">AI Education Center</h1>
              <p className="text-xl text-muted-foreground">Learn AI concepts through interactive demos</p>
            </div>
            <Button 
              onClick={() => setMode("builder")}
              className="flex items-center gap-2"
            >
              <Wrench className="h-4 w-4" />
              Builder Mode
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Sections</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {educationSections.map((section) => (
                      <Button
                        key={section.id}
                        variant={activeSection === section.id ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveSection(section.id)}
                      >
                        <section.icon className="mr-2 h-4 w-4" />
                        {section.title}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {currentSection?.icon && <currentSection.icon className="h-5 w-5" />}
                    {currentSection?.title}
                  </CardTitle>
                  <CardDescription>{currentSection?.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {currentSection?.components.map((Component, index) => (
                      <div key={index}>
                        <Component />
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

  return mode === "builder" ? renderBuilderMode() : renderEducationMode();
};

export { AIBuilderSystem };