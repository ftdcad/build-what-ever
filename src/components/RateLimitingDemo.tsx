import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Zap, AlertTriangle, CheckCircle, BarChart3 } from "lucide-react";

export const RateLimitingDemo = () => {
  const [requests, setRequests] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [strategy, setStrategy] = useState("none");
  const [currentRPM, setCurrentRPM] = useState(0);
  const [errors, setErrors] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);

  const MAX_RPM = 60; // 60 requests per minute
  const BURST_LIMIT = 10; // 10 requests in burst

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setCurrentRPM(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const makeRequest = () => {
    setTotalRequests(prev => prev + 1);
    
    if (strategy === "none") {
      // No rate limiting - will hit limits
      if (currentRPM >= MAX_RPM) {
        setErrors(prev => prev + 1);
        return { success: false, error: "Rate limit exceeded" };
      }
      setCurrentRPM(prev => prev + 1);
      return { success: true };
    }
    
    if (strategy === "backoff") {
      // Exponential backoff
      if (currentRPM >= MAX_RPM) {
        setErrors(prev => prev + 1);
        setTimeout(() => makeRequest(), Math.min(1000 * Math.pow(2, errors), 30000));
        return { success: false, error: "Rate limited - retrying with backoff" };
      }
      setCurrentRPM(prev => prev + 1);
      return { success: true };
    }
    
    if (strategy === "queue") {
      // Queue requests
      if (currentRPM >= MAX_RPM) {
        setTimeout(() => {
          setCurrentRPM(prev => prev + 1);
        }, 1000);
        return { success: true, queued: true };
      }
      setCurrentRPM(prev => prev + 1);
      return { success: true };
    }
  };

  const simulateTraffic = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      const interval = setInterval(() => {
        makeRequest();
        if (Math.random() > 0.7) { // Burst of requests
          for (let i = 0; i < 3; i++) {
            setTimeout(() => makeRequest(), i * 100);
          }
        }
      }, 500);
      
      setTimeout(() => {
        clearInterval(interval);
        setIsRunning(false);
      }, 10000);
    }
  };

  const resetDemo = () => {
    setRequests(0);
    setCurrentRPM(0);
    setErrors(0);
    setTotalRequests(0);
    setIsRunning(false);
  };

  const strategies = [
    {
      id: "none",
      name: "No Rate Limiting",
      description: "Send requests without any limiting strategy",
      color: "destructive"
    },
    {
      id: "backoff",
      name: "Exponential Backoff",
      description: "Retry with increasing delays when rate limited",
      color: "secondary"
    },
    {
      id: "queue",
      name: "Request Queuing",
      description: "Queue requests to stay within limits",
      color: "default"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Rate Limiting & Quota Management
        </CardTitle>
        <CardDescription>
          Learn how to handle API rate limits and implement proper request management strategies
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="demo" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="demo">Interactive Demo</TabsTrigger>
            <TabsTrigger value="strategies">Strategies</TabsTrigger>
            <TabsTrigger value="examples">Code Examples</TabsTrigger>
          </TabsList>

          <TabsContent value="demo" className="space-y-6">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Rate Limiting Simulator</CardTitle>
                  <CardDescription>
                    Simulate API requests with different rate limiting strategies
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2 flex-wrap">
                    {strategies.map((strat) => (
                      <Button
                        key={strat.id}
                        variant={strategy === strat.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setStrategy(strat.id)}
                      >
                        {strat.name}
                      </Button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{currentRPM}</div>
                      <div className="text-sm text-muted-foreground">Current RPM</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{totalRequests}</div>
                      <div className="text-sm text-muted-foreground">Total Requests</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-destructive">{errors}</div>
                      <div className="text-sm text-muted-foreground">Errors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{totalRequests - errors}</div>
                      <div className="text-sm text-muted-foreground">Successful</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Rate Limit Usage</span>
                      <span>{currentRPM}/{MAX_RPM} RPM</span>
                    </div>
                    <Progress value={(currentRPM / MAX_RPM) * 100} className="h-3" />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={simulateTraffic} disabled={isRunning}>
                      {isRunning ? "Running..." : "Start Simulation"}
                    </Button>
                    <Button variant="outline" onClick={resetDemo}>
                      Reset
                    </Button>
                  </div>

                  {currentRPM >= MAX_RPM && (
                    <Alert variant="destructive">
                      <AlertTriangle className="w-4 h-4" />
                      <AlertDescription>
                        Rate limit exceeded! Requests are being rejected or delayed.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="strategies" className="space-y-4">
            <div className="grid gap-4">
              {strategies.map((strat) => (
                <Card key={strat.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {strat.name}
                      <Badge variant={strat.color as any}>{strat.id}</Badge>
                    </CardTitle>
                    <CardDescription>{strat.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {strat.id === "none" && (
                      <div className="space-y-2">
                        <p className="text-sm">⚠️ <strong>Risk:</strong> High error rate, potential service blocking</p>
                        <p className="text-sm">📊 <strong>Use case:</strong> Testing, low-volume applications</p>
                      </div>
                    )}
                    {strat.id === "backoff" && (
                      <div className="space-y-2">
                        <p className="text-sm">⏰ <strong>Delay formula:</strong> min(base_delay * 2^attempt, max_delay)</p>
                        <p className="text-sm">📊 <strong>Use case:</strong> Batch processing, non-real-time applications</p>
                      </div>
                    )}
                    {strat.id === "queue" && (
                      <div className="space-y-2">
                        <p className="text-sm">🔄 <strong>Queue size:</strong> Monitor to prevent memory issues</p>
                        <p className="text-sm">📊 <strong>Use case:</strong> User-facing applications, steady throughput</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Implementation Examples</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Exponential Backoff</h4>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{`async function makeRequestWithBackoff(url, options, maxRetries = 5) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      
      if (response.status === 429) { // Rate limited
        if (attempt === maxRetries) throw new Error('Max retries reached');
        
        const delay = Math.min(1000 * Math.pow(2, attempt), 30000);
        console.log(\`Rate limited, retrying in \${delay}ms\`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      return response;
    } catch (error) {
      if (attempt === maxRetries) throw error;
    }
  }
}`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Request Queue</h4>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{`class RateLimitedQueue {
  constructor(requestsPerMinute = 60) {
    this.queue = [];
    this.processing = false;
    this.requestsPerMinute = requestsPerMinute;
    this.interval = 60000 / requestsPerMinute; // ms between requests
  }

  async add(requestFn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ requestFn, resolve, reject });
      this.processQueue();
    });
  }

  async processQueue() {
    if (this.processing || this.queue.length === 0) return;
    
    this.processing = true;
    
    while (this.queue.length > 0) {
      const { requestFn, resolve, reject } = this.queue.shift();
      
      try {
        const result = await requestFn();
        resolve(result);
      } catch (error) {
        reject(error);
      }
      
      if (this.queue.length > 0) {
        await new Promise(resolve => setTimeout(resolve, this.interval));
      }
    }
    
    this.processing = false;
  }
}`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};