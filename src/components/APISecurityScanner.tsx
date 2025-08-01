import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, AlertTriangle, CheckCircle, Search, Code, FileX } from "lucide-react";

export const APISecurityScanner = () => {
  const [code, setCode] = useState(`// Example code to scan
const API_KEY = "sk-proj-1234567890abcdef"; // Hardcoded API key!

async function callAPI() {
  const response = await fetch("http://api.example.com/data", {
    headers: {
      "Authorization": \`Bearer \${API_KEY}\`,
      "Content-Type": "application/json"
    }
  });
  
  return response.json();
}`);
  
  const [scanResults, setScanResults] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  const securityPatterns = [
    {
      pattern: /["']sk-[a-zA-Z0-9-_]{20,}["']/g,
      type: "critical",
      message: "Hardcoded OpenAI API key detected",
      fix: "Use environment variables: process.env.OPENAI_API_KEY"
    },
    {
      pattern: /["']AIza[a-zA-Z0-9-_]{35}["']/g,
      type: "critical",
      message: "Hardcoded Google API key detected",
      fix: "Use environment variables: process.env.GOOGLE_API_KEY"
    },
    {
      pattern: /http:\/\/[^\s"']+/g,
      type: "warning",
      message: "Insecure HTTP URL detected",
      fix: "Use HTTPS for all API calls"
    },
    {
      pattern: /console\.log\([^)]*token[^)]*\)/gi,
      type: "warning",
      message: "Potential token logging detected",
      fix: "Remove console.log statements containing sensitive data"
    },
    {
      pattern: /password\s*[:=]\s*["'][^"']*["']/gi,
      type: "critical",
      message: "Hardcoded password detected",
      fix: "Use secure credential management"
    },
    {
      pattern: /\.innerHTML\s*=|\.outerHTML\s*=/g,
      type: "warning",
      message: "Potential XSS vulnerability with innerHTML",
      fix: "Use textContent or proper sanitization"
    },
    {
      pattern: /eval\s*\(/g,
      type: "critical",
      message: "Use of eval() detected - security risk",
      fix: "Avoid eval() - use JSON.parse() or other safe alternatives"
    }
  ];

  const scanCode = () => {
    setIsScanning(true);
    const results = [];
    const lines = code.split('\n');

    securityPatterns.forEach(({ pattern, type, message, fix }) => {
      lines.forEach((line, lineNumber) => {
        const matches = line.match(pattern);
        if (matches) {
          matches.forEach(match => {
            results.push({
              type,
              message,
              fix,
              line: lineNumber + 1,
              match: match.substring(0, 50) + (match.length > 50 ? '...' : ''),
              code: line.trim()
            });
          });
        }
      });
    });

    // Simulate scanning delay
    setTimeout(() => {
      setScanResults(results);
      setIsScanning(false);
    }, 1500);
  };

  const secureExamples = {
    apiKeys: `// ✅ Secure API key usage
const API_KEY = process.env.OPENAI_API_KEY;

if (!API_KEY) {
  throw new Error('OpenAI API key not configured');
}

async function callAPI() {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Authorization": \`Bearer \${API_KEY}\`,
      "Content-Type": "application/json"
    }
  });
  
  if (!response.ok) {
    throw new Error(\`API error: \${response.status}\`);
  }
  
  return response.json();
}`,
    
    validation: `// ✅ Input validation and sanitization
function validateAndSanitizeInput(userInput) {
  // Validate input format
  if (typeof userInput !== 'string' || userInput.length > 1000) {
    throw new Error('Invalid input format');
  }
  
  // Sanitize for XSS prevention
  const sanitized = userInput
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
    
  return sanitized;
}`,
    
    errorHandling: `// ✅ Secure error handling
async function secureAPICall(prompt) {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { /* headers */ },
      body: JSON.stringify({ prompt })
    });
    
    if (!response.ok) {
      // Don't expose internal error details to client
      console.error('API Error:', response.status, response.statusText);
      throw new Error('API request failed');
    }
    
    return await response.json();
  } catch (error) {
    // Log error for debugging but don't expose details
    console.error('Error calling API:', error.message);
    throw new Error('Service temporarily unavailable');
  }
}`
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          API Security Scanner
        </CardTitle>
        <CardDescription>
          Scan your code for common API security vulnerabilities and get recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="scanner" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="scanner">Code Scanner</TabsTrigger>
            <TabsTrigger value="examples">Secure Examples</TabsTrigger>
            <TabsTrigger value="checklist">Security Checklist</TabsTrigger>
          </TabsList>

          <TabsContent value="scanner" className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Paste your code to scan for security issues:
                </label>
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Paste your JavaScript/TypeScript code here..."
                  className="min-h-[200px] font-mono text-sm"
                />
              </div>

              <Button onClick={scanCode} disabled={isScanning} className="w-full">
                {isScanning ? (
                  <>
                    <Search className="w-4 h-4 mr-2 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Scan Code
                  </>
                )}
              </Button>

              {scanResults.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-medium">Scan Results ({scanResults.length} issues found)</h3>
                  {scanResults.map((result, index) => (
                    <Alert key={index} variant={result.type === "critical" ? "destructive" : "default"}>
                      <AlertTriangle className="w-4 h-4" />
                      <AlertDescription>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant={result.type === "critical" ? "destructive" : "secondary"}>
                              Line {result.line}
                            </Badge>
                            <Badge variant="outline">
                              {result.type === "critical" ? "Critical" : "Warning"}
                            </Badge>
                          </div>
                          <p className="font-medium">{result.message}</p>
                          <p className="text-sm text-muted-foreground">
                            Found: <code className="bg-muted px-1 rounded">{result.match}</code>
                          </p>
                          <p className="text-sm">
                            <strong>Fix:</strong> {result.fix}
                          </p>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              )}

              {scanResults.length === 0 && code && !isScanning && (
                <Alert>
                  <CheckCircle className="w-4 h-4" />
                  <AlertDescription>
                    ✅ No obvious security issues detected! However, manual review is still recommended.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Secure API Key Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{secureExamples.apiKeys}</code>
                  </pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Input Validation & Sanitization</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{secureExamples.validation}</code>
                  </pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Secure Error Handling</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{secureExamples.errorHandling}</code>
                  </pre>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="checklist" className="space-y-4">
            <div className="space-y-4">
              <h3 className="font-medium">API Security Checklist</h3>
              
              {[
                "Store API keys in environment variables, never in source code",
                "Use HTTPS for all API communications",
                "Implement proper input validation and sanitization",
                "Add rate limiting to prevent abuse",
                "Handle errors securely without exposing internal details",
                "Implement proper authentication and authorization",
                "Log security events and monitor for anomalies",
                "Regularly rotate API keys and credentials",
                "Use least privilege principle for API permissions",
                "Implement request/response logging for audit trails",
                "Validate SSL certificates in production",
                "Use secure headers (CORS, CSP, etc.)",
                "Implement API versioning for security updates",
                "Monitor for API key leaks in public repositories",
                "Use API gateways for additional security layers"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};