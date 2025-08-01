import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, CheckCircle, Code, Play, RotateCcw } from "lucide-react";

export const ErrorHandlingPlayground = () => {
  const [selectedError, setSelectedError] = useState("rate-limit");
  const [strategy, setStrategy] = useState("basic");
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState(null);

  const errorTypes = {
    "rate-limit": {
      name: "Rate Limit (429)",
      description: "Too many requests sent in a given timeframe",
      headers: { "Retry-After": "60", "X-RateLimit-Remaining": "0" }
    },
    "unauthorized": {
      name: "Unauthorized (401)",
      description: "Invalid or missing API key",
      headers: {}
    },
    "bad-request": {
      name: "Bad Request (400)",
      description: "Invalid parameters or malformed request",
      headers: {}
    },
    "server-error": {
      name: "Server Error (500)",
      description: "Internal server error on API provider side",
      headers: {}
    },
    "timeout": {
      name: "Timeout",
      description: "Request took too long to complete",
      headers: {}
    },
    "network": {
      name: "Network Error",
      description: "Connection failed or network unavailable",
      headers: {}
    }
  };

  const strategies = {
    "basic": {
      name: "Basic Try-Catch",
      description: "Simple error catching without retry logic"
    },
    "retry": {
      name: "Retry with Backoff",
      description: "Automatic retry with exponential backoff"
    },
    "circuit-breaker": {
      name: "Circuit Breaker",
      description: "Fail fast when errors are frequent"
    },
    "graceful": {
      name: "Graceful Degradation",
      description: "Fallback to alternative service or cached response"
    }
  };

  const getCodeExample = (errorType, strategy) => {
    const baseFunction = `async function callAPI(prompt) {`;
    
    if (strategy === "basic") {
      return `${baseFunction}
  try {
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    
    if (!response.ok) {
      throw new Error(\`API Error: \${response.status}\`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error; // Re-throw for caller to handle
  }
}`;
    }
    
    if (strategy === "retry") {
      return `${baseFunction}
  const maxRetries = 3;
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      if (response.status === 429) {
        // Rate limited - wait before retry
        const retryAfter = response.headers.get('Retry-After');
        const delay = retryAfter ? parseInt(retryAfter) * 1000 : Math.pow(2, attempt) * 1000;
        
        if (attempt < maxRetries) {
          console.log(\`Rate limited, retrying in \${delay}ms\`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
      }
      
      if (!response.ok) {
        throw new Error(\`API Error: \${response.status}\`);
      }
      
      return await response.json();
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000;
        console.log(\`Attempt \${attempt + 1} failed, retrying in \${delay}ms\`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}`;
    }
    
    if (strategy === "circuit-breaker") {
      return `class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000) {
    this.failureThreshold = threshold;
    this.timeout = timeout;
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
  }
  
  async call(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }
    
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }
  
  onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
    }
  }
}

const circuitBreaker = new CircuitBreaker();

${baseFunction}
  return circuitBreaker.call(async () => {
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    
    if (!response.ok) {
      throw new Error(\`API Error: \${response.status}\`);
    }
    
    return await response.json();
  });
}`;
    }
    
    if (strategy === "graceful") {
      return `${baseFunction}
  try {
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
      timeout: 10000 // 10 second timeout
    });
    
    if (!response.ok) {
      throw new Error(\`API Error: \${response.status}\`);
    }
    
    return await response.json();
  } catch (error) {
    console.warn('Primary AI service failed, trying fallback:', error.message);
    
    // Try fallback service
    try {
      const fallbackResponse = await fetch('/api/ai-fallback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      if (fallbackResponse.ok) {
        return await fallbackResponse.json();
      }
    } catch (fallbackError) {
      console.warn('Fallback service also failed:', fallbackError.message);
    }
    
    // Use cached response if available
    const cachedResponse = await getCachedResponse(prompt);
    if (cachedResponse) {
      console.log('Using cached response');
      return { ...cachedResponse, cached: true };
    }
    
    // Final fallback - return a helpful error message
    return {
      error: true,
      message: 'AI service is temporarily unavailable. Please try again later.',
      suggestion: 'You can rephrase your question or try a simpler query.'
    };
  }
}`;
    }
  };

  const simulateError = async () => {
    setIsSimulating(true);
    setResult(null);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const error = errorTypes[selectedError];
    const currentStrategy = strategies[strategy];
    
    let simulationResult;
    
    if (strategy === "basic") {
      simulationResult = {
        success: false,
        error: `${error.name}: ${error.description}`,
        action: "Error thrown to caller",
        retries: 0
      };
    } else if (strategy === "retry") {
      if (selectedError === "rate-limit") {
        simulationResult = {
          success: true,
          error: null,
          action: "Succeeded after 2 retries with backoff",
          retries: 2
        };
      } else if (selectedError === "timeout" || selectedError === "server-error") {
        simulationResult = {
          success: true,
          error: null,
          action: "Succeeded after 1 retry",
          retries: 1
        };
      } else {
        simulationResult = {
          success: false,
          error: `${error.name}: ${error.description}`,
          action: "Failed after 3 retries",
          retries: 3
        };
      }
    } else if (strategy === "circuit-breaker") {
      simulationResult = {
        success: selectedError !== "server-error",
        error: selectedError === "server-error" ? "Circuit breaker opened after repeated failures" : null,
        action: selectedError === "server-error" ? "Failing fast to prevent cascading failures" : "Request succeeded",
        retries: 0
      };
    } else if (strategy === "graceful") {
      simulationResult = {
        success: true,
        error: null,
        action: selectedError === "network" ? "Used cached response" : "Fallback service succeeded",
        retries: 0
      };
    }
    
    setResult(simulationResult);
    setIsSimulating(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Error Handling Playground
        </CardTitle>
        <CardDescription>
          Explore different error handling strategies for API calls and see how they respond to various failure scenarios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="playground" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="playground">Interactive Playground</TabsTrigger>
            <TabsTrigger value="examples">Code Examples</TabsTrigger>
          </TabsList>

          <TabsContent value="playground" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Simulation Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Error Type</label>
                    <Select value={selectedError} onValueChange={setSelectedError}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(errorTypes).map(([key, error]) => (
                          <SelectItem key={key} value={key}>{error.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      {errorTypes[selectedError].description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Handling Strategy</label>
                    <Select value={strategy} onValueChange={setStrategy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(strategies).map(([key, strat]) => (
                          <SelectItem key={key} value={key}>{strat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      {strategies[strategy].description}
                    </p>
                  </div>

                  <Button onClick={simulateError} disabled={isSimulating} className="w-full">
                    {isSimulating ? (
                      <>
                        <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                        Simulating...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Run Simulation
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Simulation Results</CardTitle>
                </CardHeader>
                <CardContent>
                  {result ? (
                    <div className="space-y-4">
                      <Alert variant={result.success ? "default" : "destructive"}>
                        {result.success ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <AlertTriangle className="w-4 h-4" />
                        )}
                        <AlertDescription>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge variant={result.success ? "default" : "destructive"}>
                                {result.success ? "Success" : "Failed"}
                              </Badge>
                              {result.retries > 0 && (
                                <Badge variant="outline">{result.retries} retries</Badge>
                              )}
                            </div>
                            <p><strong>Action:</strong> {result.action}</p>
                            {result.error && (
                              <p><strong>Error:</strong> {result.error}</p>
                            )}
                          </div>
                        </AlertDescription>
                      </Alert>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      Select an error type and strategy, then run the simulation to see results.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  {strategies[strategy].name} Implementation
                </CardTitle>
                <CardDescription>{strategies[strategy].description}</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{getCodeExample(selectedError, strategy)}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};