import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";

export const HallucinationDetector = () => {
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const sampleTexts = [
    {
      label: "Factual (Low Risk)",
      text: "Paris is the capital of France and has a population of approximately 2.1 million people in the city proper.",
      risk: "low"
    },
    {
      label: "Uncertain (Medium Risk)",
      text: "The latest iPhone model probably costs around $1,200 and features advanced AI capabilities.",
      risk: "medium"
    },
    {
      label: "Fabricated (High Risk)",
      text: "According to the fictional study by Dr. Smith at Stanford University in 2024, AI models achieve 99.9% accuracy.",
      risk: "high"
    }
  ];

  const analyzeText = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple hallucination detection logic
    const riskFactors = {
      uncertainWords: ['probably', 'might', 'possibly', 'perhaps', 'likely'].filter(word => 
        text.toLowerCase().includes(word)
      ).length,
      specificClaims: ['according to', 'study shows', 'research indicates', 'scientists found'].filter(phrase => 
        text.toLowerCase().includes(phrase)
      ).length,
      numericClaims: (text.match(/\d+(\.\d+)?%|\$\d+/g) || []).length,
      absoluteTerms: ['always', 'never', 'all', 'none', 'definitely', 'certainly'].filter(word => 
        text.toLowerCase().includes(word)
      ).length
    };

    const totalRisk = riskFactors.uncertainWords * 10 + 
                     riskFactors.specificClaims * 20 + 
                     riskFactors.numericClaims * 15 + 
                     riskFactors.absoluteTerms * 25;

    let riskLevel: 'low' | 'medium' | 'high';
    if (totalRisk < 20) riskLevel = 'low';
    else if (totalRisk < 50) riskLevel = 'medium';
    else riskLevel = 'high';

    setAnalysis({
      riskLevel,
      confidence: Math.max(10, 100 - totalRisk),
      riskFactors,
      suggestions: getRiskSuggestions(riskLevel, riskFactors)
    });
    
    setIsAnalyzing(false);
  };

  const getRiskSuggestions = (risk: string, factors: any) => {
    const suggestions = [];
    
    if (factors.uncertainWords > 0) {
      suggestions.push("Contains uncertainty markers - verify claims");
    }
    if (factors.specificClaims > 0) {
      suggestions.push("References studies/research - check sources");
    }
    if (factors.numericClaims > 0) {
      suggestions.push("Contains specific numbers - validate accuracy");
    }
    if (factors.absoluteTerms > 0) {
      suggestions.push("Uses absolute terms - consider exceptions");
    }
    
    if (risk === 'low') {
      suggestions.push("Text appears factual and verifiable");
    }
    
    return suggestions;
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'hsl(142, 76%, 36%)';
      case 'medium': return 'hsl(48, 96%, 53%)';
      case 'high': return 'hsl(0, 84%, 60%)';
      default: return 'hsl(220, 85%, 57%)';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <CheckCircle className="w-4 h-4" />;
      case 'medium': return <AlertTriangle className="w-4 h-4" />;
      case 'high': return <XCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🎭</span>
          Hallucination Detection System
        </CardTitle>
        <Badge variant="secondary">AI Output Verification</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Input Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Enter AI-generated text to analyze:</label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste AI-generated content here for hallucination analysis..."
              rows={4}
            />
            <div className="flex gap-2">
              <Button onClick={analyzeText} disabled={isAnalyzing || !text.trim()}>
                {isAnalyzing ? (
                  <div className="w-4 h-4 border-2 border-t-transparent border-primary rounded-full animate-spin" />
                ) : (
                  "Analyze Text"
                )}
              </Button>
              {sampleTexts.map((sample, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setText(sample.text)}
                >
                  {sample.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Analysis Results */}
          {analysis && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div style={{ color: getRiskColor(analysis.riskLevel) }}>
                  {getRiskIcon(analysis.riskLevel)}
                </div>
                <h3 className="font-semibold">
                  Risk Level: {analysis.riskLevel.toUpperCase()}
                </h3>
                <Badge 
                  variant="outline" 
                  style={{ borderColor: getRiskColor(analysis.riskLevel) }}
                >
                  {analysis.confidence}% Confidence
                </Badge>
              </div>

              <Progress 
                value={100 - analysis.confidence} 
                className="h-2"
                style={{ 
                  backgroundColor: `${getRiskColor(analysis.riskLevel)}20`,
                }}
              />

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Analysis Summary:</strong> This text shows{' '}
                  <span style={{ color: getRiskColor(analysis.riskLevel) }}>
                    {analysis.riskLevel} risk
                  </span>{' '}
                  of containing hallucinated content based on linguistic patterns.
                </AlertDescription>
              </Alert>

              {/* Risk Factors Breakdown */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h4 className="font-semibold mb-3">Risk Factors Detected:</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uncertainty words:</span>
                      <Badge variant="outline">{analysis.riskFactors.uncertainWords}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Unverified claims:</span>
                      <Badge variant="outline">{analysis.riskFactors.specificClaims}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Numeric claims:</span>
                      <Badge variant="outline">{analysis.riskFactors.numericClaims}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Absolute terms:</span>
                      <Badge variant="outline">{analysis.riskFactors.absoluteTerms}</Badge>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h4 className="font-semibold mb-3">Recommendations:</h4>
                  <ul className="space-y-1 text-sm">
                    {analysis.suggestions.map((suggestion: string, index: number) => (
                      <li key={index} className="text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          )}

          {/* Educational Info */}
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Common Hallucinations:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Fake citations & studies</li>
                <li>• Invented statistics</li>
                <li>• Non-existent people/places</li>
                <li>• Outdated information</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Detection Methods:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Source verification</li>
                <li>• Cross-referencing</li>
                <li>• Confidence scoring</li>
                <li>• Pattern recognition</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Prevention Strategies:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Lower temperature settings</li>
                <li>• RAG with verified sources</li>
                <li>• Human validation</li>
                <li>• Prompt engineering</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};