import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Key, UserCheck, Shield, Clock, DollarSign, Zap } from "lucide-react";

export const AuthenticationMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState("api-key");

  const authMethods = [
    {
      id: "api-key",
      name: "API Keys",
      icon: <Key className="w-5 h-5" />,
      description: "Simple string-based authentication",
      security: 70,
      complexity: 20,
      cost: 10,
      speed: 95,
      pros: ["Simple to implement", "Fast authentication", "No user interaction required"],
      cons: ["Can be leaked if exposed", "No user identity", "Difficult to rotate"],
      useCase: "Server-to-server communication, internal tools"
    },
    {
      id: "oauth",
      name: "OAuth 2.0",
      icon: <UserCheck className="w-5 h-5" />,
      description: "User-delegated authorization",
      security: 90,
      complexity: 75,
      cost: 30,
      speed: 60,
      pros: ["User can revoke access", "Scoped permissions", "Industry standard"],
      cons: ["Complex implementation", "Requires user interaction", "Token management"],
      useCase: "User-facing applications, third-party integrations"
    },
    {
      id: "service-account",
      name: "Service Accounts",
      icon: <Shield className="w-5 h-5" />,
      description: "Machine-to-machine authentication",
      security: 85,
      complexity: 50,
      cost: 20,
      speed: 80,
      pros: ["No user required", "Granular permissions", "Audit trail"],
      cons: ["Platform-specific", "More setup required", "Key rotation needed"],
      useCase: "Backend services, CI/CD pipelines, automated systems"
    }
  ];

  const currentMethod = authMethods.find(m => m.id === selectedMethod);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCheck className="w-5 h-5" />
          Authentication Methods Comparison
        </CardTitle>
        <CardDescription>
          Compare different authentication approaches for AI APIs and understand when to use each
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedMethod} onValueChange={setSelectedMethod} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {authMethods.map((method) => (
              <TabsTrigger key={method.id} value={method.id} className="flex items-center gap-2">
                {method.icon}
                {method.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {authMethods.map((method) => (
            <TabsContent key={method.id} value={method.id} className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {method.icon}
                      {method.name}
                    </CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          <span className="text-sm font-medium">Security</span>
                        </div>
                        <Progress value={method.security} className="h-2" />
                        <span className="text-xs text-muted-foreground">{method.security}%</span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          <span className="text-sm font-medium">Complexity</span>
                        </div>
                        <Progress value={method.complexity} className="h-2" />
                        <span className="text-xs text-muted-foreground">{method.complexity}%</span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          <span className="text-sm font-medium">Cost</span>
                        </div>
                        <Progress value={method.cost} className="h-2" />
                        <span className="text-xs text-muted-foreground">{method.cost}%</span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">Speed</span>
                        </div>
                        <Progress value={method.speed} className="h-2" />
                        <span className="text-xs text-muted-foreground">{method.speed}%</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-green-600 mb-2">✅ Pros</h4>
                        <ul className="space-y-1">
                          {method.pros.map((pro, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <span className="text-green-500 mt-0.5">•</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-red-600 mb-2">❌ Cons</h4>
                        <ul className="space-y-1">
                          {method.cons.map((con, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <span className="text-red-500 mt-0.5">•</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Best Use Case</h4>
                      <Badge variant="outline">{method.useCase}</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Implementation Example</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {method.id === "api-key" && (
                      <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                        <code>{`// API Key Authentication
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${process.env.OPENAI_API_KEY}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Hello!' }]
  })
});`}</code>
                      </pre>
                    )}

                    {method.id === "oauth" && (
                      <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                        <code>{`// OAuth 2.0 Flow
// 1. Redirect user to authorization server
const authUrl = \`https://provider.com/oauth/authorize?
  client_id=\${CLIENT_ID}&
  redirect_uri=\${REDIRECT_URI}&
  scope=read_api&
  response_type=code\`;

// 2. Exchange code for access token
const tokenResponse = await fetch('https://provider.com/oauth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    grant_type: 'authorization_code',
    code: authCode,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET
  })
});

// 3. Use access token
const apiResponse = await fetch('https://api.provider.com/data', {
  headers: { 'Authorization': \`Bearer \${accessToken}\` }
});`}</code>
                      </pre>
                    )}

                    {method.id === "service-account" && (
                      <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                        <code>{`// Service Account (Google Cloud example)
import { GoogleAuth } from 'google-auth-library';

const auth = new GoogleAuth({
  keyFile: 'path/to/service-account-key.json',
  scopes: ['https://www.googleapis.com/auth/cloud-platform']
});

const authClient = await auth.getClient();
const accessToken = await authClient.getAccessToken();

const response = await fetch('https://api.googlecloud.com/v1/models', {
  headers: {
    'Authorization': \`Bearer \${accessToken.token}\`,
    'Content-Type': 'application/json'
  }
});`}</code>
                      </pre>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};