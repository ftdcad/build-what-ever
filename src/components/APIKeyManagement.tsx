import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Shield, AlertTriangle, CheckCircle } from "lucide-react";

export const APIKeyManagement = () => {
  const [showKey, setShowKey] = useState(false);
  const [apiKey, setApiKey] = useState("sk-proj-1234567890abcdef");
  const [storageMethod, setStorageMethod] = useState("environment");

  const securityIssues = [
    { type: "danger", text: "API key hardcoded in source code", severity: "High" },
    { type: "warning", text: "No rate limiting implemented", severity: "Medium" },
    { type: "info", text: "Using HTTPS for API calls", severity: "Good" }
  ];

  const badExample = `// ❌ NEVER DO THIS
const API_KEY = "sk-proj-1234567890abcdef";
fetch('https://api.openai.com/v1/chat/completions', {
  headers: {
    'Authorization': \`Bearer \${API_KEY}\`
  }
});`;

  const goodExample = `// ✅ CORRECT APPROACH
const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) {
  throw new Error('API key not found');
}
fetch('https://api.openai.com/v1/chat/completions', {
  headers: {
    'Authorization': \`Bearer \${API_KEY}\`
  }
});`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          API Key Management & Security
        </CardTitle>
        <CardDescription>
          Learn how to properly store, manage, and secure API keys in your applications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="storage" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="storage">Storage Methods</TabsTrigger>
            <TabsTrigger value="security">Security Scanner</TabsTrigger>
            <TabsTrigger value="examples">Code Examples</TabsTrigger>
          </TabsList>

          <TabsContent value="storage" className="space-y-4">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">API Key Storage Simulation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Input
                      type={showKey ? "text" : "password"}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter your API key"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setShowKey(!showKey)}
                    >
                      {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Storage Method:</label>
                    <div className="flex gap-2">
                      <Button
                        variant={storageMethod === "environment" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setStorageMethod("environment")}
                      >
                        Environment Variables
                      </Button>
                      <Button
                        variant={storageMethod === "hardcoded" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setStorageMethod("hardcoded")}
                      >
                        Hardcoded
                      </Button>
                      <Button
                        variant={storageMethod === "vault" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setStorageMethod("vault")}
                      >
                        Secret Vault
                      </Button>
                    </div>
                  </div>

                  {storageMethod === "environment" && (
                    <Alert>
                      <CheckCircle className="w-4 h-4" />
                      <AlertDescription>
                        ✅ <strong>Recommended:</strong> Environment variables keep secrets out of your source code and allow different values per environment.
                      </AlertDescription>
                    </Alert>
                  )}

                  {storageMethod === "hardcoded" && (
                    <Alert variant="destructive">
                      <AlertTriangle className="w-4 h-4" />
                      <AlertDescription>
                        ❌ <strong>Never do this:</strong> Hardcoded API keys are visible to anyone with access to your code and can be accidentally committed to version control.
                      </AlertDescription>
                    </Alert>
                  )}

                  {storageMethod === "vault" && (
                    <Alert>
                      <CheckCircle className="w-4 h-4" />
                      <AlertDescription>
                        ✅ <strong>Enterprise:</strong> Secret management services like AWS Secrets Manager, Azure Key Vault, or HashiCorp Vault provide advanced security features.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Security Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {securityIssues.map((issue, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        {issue.type === "danger" && <AlertTriangle className="w-4 h-4 text-destructive" />}
                        {issue.type === "warning" && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                        {issue.type === "info" && <CheckCircle className="w-4 h-4 text-green-500" />}
                        <span className="text-sm">{issue.text}</span>
                      </div>
                      <Badge variant={
                        issue.severity === "High" ? "destructive" : 
                        issue.severity === "Medium" ? "secondary" : "default"
                      }>
                        {issue.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-destructive">❌ Bad Practice</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{badExample}</code>
                  </pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">✅ Good Practice</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{goodExample}</code>
                  </pre>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};