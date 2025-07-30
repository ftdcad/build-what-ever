import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

export const TemperatureGauge = () => {
  const [temperature, setTemperature] = useState([1.0]);

  const getTemperatureColor = (temp: number) => {
    if (temp <= 0.3) return "hsl(220, 85%, 57%)"; // Blue - focused
    if (temp <= 0.7) return "hsl(142, 76%, 36%)"; // Green - balanced
    if (temp <= 1.3) return "hsl(48, 96%, 53%)"; // Yellow - creative
    return "hsl(0, 84%, 60%)"; // Red - chaotic
  };

  const getResponseExample = (temp: number) => {
    const prompt = "Write a greeting for a business email";
    
    if (temp <= 0.3) {
      return {
        title: "Focused & Consistent",
        response: "Dear [Name],\n\nI hope this email finds you well.",
        characteristics: ["Predictable", "Professional", "Safe"]
      };
    } else if (temp <= 0.7) {
      return {
        title: "Balanced & Natural",
        response: "Hello [Name],\n\nI hope you're having a great day!",
        characteristics: ["Natural", "Engaging", "Reliable"]
      };
    } else if (temp <= 1.3) {
      return {
        title: "Creative & Varied",
        response: "Greetings [Name]!\n\nHope this message brightens your day.",
        characteristics: ["Original", "Expressive", "Dynamic"]
      };
    } else {
      return {
        title: "Unpredictable & Wild",
        response: "Salutations, esteemed colleague of the digital realm!",
        characteristics: ["Unexpected", "Risky", "Chaotic"]
      };
    }
  };

  const getUseCases = (temp: number) => {
    if (temp <= 0.3) return ["Legal documents", "Technical docs", "Translations"];
    if (temp <= 0.7) return ["Customer support", "Q&A systems", "Summaries"];
    if (temp <= 1.3) return ["Creative writing", "Brainstorming", "Marketing copy"];
    return ["Experimental content", "Art generation", "Novel concepts"];
  };

  const currentTemp = temperature[0];
  const example = getResponseExample(currentTemp);
  const useCases = getUseCases(currentTemp);

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🌡️</span>
          Temperature Interactive Gauge
        </CardTitle>
        <Badge variant="secondary">Creativity Control: {currentTemp.toFixed(1)}</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Temperature Slider */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Focused (0.0)</span>
              <span>Creative (2.0)</span>
            </div>
            <Slider
              value={temperature}
              onValueChange={setTemperature}
              max={2.0}
              min={0.0}
              step={0.1}
              className="w-full"
            />
            
            {/* Visual Temperature Bar */}
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${(currentTemp / 2.0) * 100}%`,
                  backgroundColor: getTemperatureColor(currentTemp)
                }}
              />
            </div>
          </div>

          {/* Response Example */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">{example.title}</h4>
                <div className="bg-muted p-3 rounded border-l-4" style={{ borderLeftColor: getTemperatureColor(currentTemp) }}>
                  <p className="text-sm font-medium mb-1">Prompt: "Write a greeting for a business email"</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">{example.response}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Response Characteristics</h4>
                <div className="flex gap-2 flex-wrap">
                  {example.characteristics.map((char, index) => (
                    <Badge key={index} variant="outline" style={{ borderColor: getTemperatureColor(currentTemp) }}>
                      {char}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Best Use Cases</h4>
                <ul className="space-y-1">
                  {useCases.map((useCase, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: getTemperatureColor(currentTemp) }}
                      />
                      {useCase}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Temperature Scale</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>0.0 - 0.3</span>
                    <span className="text-muted-foreground">Deterministic</span>
                  </div>
                  <div className="flex justify-between">
                    <span>0.4 - 0.7</span>
                    <span className="text-muted-foreground">Balanced</span>
                  </div>
                  <div className="flex justify-between">
                    <span>0.8 - 1.3</span>
                    <span className="text-muted-foreground">Creative</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1.4 - 2.0</span>
                    <span className="text-muted-foreground">Experimental</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};