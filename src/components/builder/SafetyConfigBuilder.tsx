import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Filter, Eye } from "lucide-react";
import { HallucinationDetector } from "../HallucinationDetector";

interface SafetyConfigBuilderProps {
  projectConfig: any;
  updateProjectConfig: (updates: any) => void;
  onStepComplete: () => void;
}

export const SafetyConfigBuilder = ({ projectConfig, updateProjectConfig, onStepComplete }: SafetyConfigBuilderProps) => {
  const [safetySettings, setSafetySettings] = useState({
    contentFiltering: true,
    hallucinationDetection: true,
    toxicityPrevention: true,
    outputModeration: true,
    confidenceThreshold: [0.7],
    customPromptInjection: true,
    rateLimiting: true,
    ...projectConfig.safetySettings
  });

  const [systemPrompt, setSystemPrompt] = useState(
    projectConfig.systemPrompt || 
    `You are a helpful AI assistant. Always provide accurate, helpful, and safe responses. 
If you're unsure about something, acknowledge your uncertainty rather than guessing.
Do not provide information that could be harmful, illegal, or unethical.`
  );

  const [contentGuidelines, setContentGuidelines] = useState([
    { id: "hate-speech", label: "Hate Speech", enabled: true },
    { id: "violence", label: "Violence & Threats", enabled: true },
    { id: "sexual-content", label: "Sexual Content", enabled: true },
    { id: "harassment", label: "Harassment", enabled: true },
    { id: "self-harm", label: "Self-Harm", enabled: true },
    { id: "illegal-activity", label: "Illegal Activities", enabled: true },
    { id: "misinformation", label: "Misinformation", enabled: false },
    { id: "privacy", label: "Privacy Violations", enabled: true }
  ]);

  const handleSafetySettingChange = (key: string, value: any) => {
    setSafetySettings(prev => ({ ...prev, [key]: value }));
  };

  const handleGuidelineToggle = (id: string) => {
    setContentGuidelines(prev => 
      prev.map(guideline => 
        guideline.id === id 
          ? { ...guideline, enabled: !guideline.enabled }
          : guideline
      )
    );
  };

  const handleContinue = () => {
    updateProjectConfig({
      safetySettings: {
        ...safetySettings,
        contentGuidelines: contentGuidelines.filter(g => g.enabled).map(g => g.id)
      },
      systemPrompt: systemPrompt
    });
    onStepComplete();
  };

  const enabledGuidelinesCount = contentGuidelines.filter(g => g.enabled).length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            AI Safety & Guardrails
          </CardTitle>
          <CardDescription>
            Configure safety measures to ensure responsible AI behavior
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Core Safety Features</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Content Filtering</Label>
                    <p className="text-sm text-muted-foreground">Filter harmful or inappropriate content</p>
                  </div>
                  <Switch
                    checked={safetySettings.contentFiltering}
                    onCheckedChange={(checked) => handleSafetySettingChange('contentFiltering', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Hallucination Detection</Label>
                    <p className="text-sm text-muted-foreground">Detect and prevent false information</p>
                  </div>
                  <Switch
                    checked={safetySettings.hallucinationDetection}
                    onCheckedChange={(checked) => handleSafetySettingChange('hallucinationDetection', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Toxicity Prevention</Label>
                    <p className="text-sm text-muted-foreground">Block toxic or aggressive responses</p>
                  </div>
                  <Switch
                    checked={safetySettings.toxicityPrevention}
                    onCheckedChange={(checked) => handleSafetySettingChange('toxicityPrevention', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Output Moderation</Label>
                    <p className="text-sm text-muted-foreground">Review all outputs before delivery</p>
                  </div>
                  <Switch
                    checked={safetySettings.outputModeration}
                    onCheckedChange={(checked) => handleSafetySettingChange('outputModeration', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Prompt Injection Protection</Label>
                    <p className="text-sm text-muted-foreground">Prevent malicious prompt manipulation</p>
                  </div>
                  <Switch
                    checked={safetySettings.customPromptInjection}
                    onCheckedChange={(checked) => handleSafetySettingChange('customPromptInjection', checked)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Advanced Settings</h3>
              
              <div>
                <Label>Confidence Threshold: {safetySettings.confidenceThreshold[0]}</Label>
                <Slider
                  value={safetySettings.confidenceThreshold}
                  onValueChange={(value) => handleSafetySettingChange('confidenceThreshold', value)}
                  max={1}
                  min={0.1}
                  step={0.05}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Less Strict</span>
                  <span>More Strict</span>
                </div>
              </div>

              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-4 w-4" />
                    <span className="font-medium">Safety Score</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Content Guidelines:</span>
                      <Badge variant="outline">{enabledGuidelinesCount}/8 enabled</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Protection Level:</span>
                      <Badge variant="default">High</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Content Guidelines
          </CardTitle>
          <CardDescription>
            Select which types of content should be filtered
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {contentGuidelines.map((guideline) => (
              <div
                key={guideline.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  guideline.enabled 
                    ? 'border-primary bg-primary/5' 
                    : 'border-muted-foreground/20 bg-muted/20'
                }`}
                onClick={() => handleGuidelineToggle(guideline.id)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{guideline.label}</span>
                  <Switch checked={guideline.enabled} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Prompt</CardTitle>
          <CardDescription>
            Define the AI's behavior and safety instructions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            rows={6}
            placeholder="Enter your system prompt with safety guidelines..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hallucination Detection Demo</CardTitle>
          <CardDescription>
            See how hallucination detection works in practice
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HallucinationDetector />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          onClick={handleContinue}
          size="lg"
        >
          Continue to Code Generation
        </Button>
      </div>
    </div>
  );
};