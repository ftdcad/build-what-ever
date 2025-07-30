import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

const ContextWindowDemo = () => {
  const [contextSize, setContextSize] = useState([32000]);

  const getConversationExample = (maxTokens: number) => {
    const messages = [
      { role: "System", content: "You are a helpful AI assistant.", tokens: 8 },
      { role: "User", content: "Can you help me understand quantum computing?", tokens: 12 },
      { role: "Assistant", content: "Quantum computing uses quantum mechanics principles like superposition and entanglement to process information in fundamentally different ways than classical computers. Instead of bits that are either 0 or 1, quantum computers use quantum bits (qubits) that can exist in multiple states simultaneously.", tokens: 55 },
      { role: "User", content: "How does superposition work exactly?", tokens: 8 },
      { role: "Assistant", content: "Superposition allows a qubit to exist in multiple states at once. Think of it like a spinning coin - while spinning, it's neither heads nor tails but both possibilities simultaneously. When measured, the qubit collapses to a definite state. This enables quantum computers to explore many solution paths in parallel.", tokens: 52 },
      { role: "User", content: "What about entanglement?", tokens: 5 },
      { role: "Assistant", content: "Quantum entanglement is when two or more qubits become connected in such a way that measuring one instantly affects the other, regardless of distance. Einstein called this 'spooky action at a distance.' In quantum computing, entanglement allows qubits to work together as a unified system, exponentially increasing computational power.", tokens: 58 },
      { role: "User", content: "Can you give me a real-world example of quantum computing applications?", tokens: 15 },
      { role: "Assistant", content: "Certainly! Drug discovery is a promising application. Quantum computers could simulate molecular interactions at the quantum level to discover new medicines faster. Financial modeling for risk analysis, cryptography for ultra-secure communications, and optimization problems like traffic routing are other key areas where quantum computing shows tremendous potential.", tokens: 52 },
    ];

    let totalTokens = 0;
    const visibleMessages = [];

    for (const message of messages) {
      if (totalTokens + message.tokens <= maxTokens) {
        visibleMessages.push(message);
        totalTokens += message.tokens;
      } else {
        break;
      }
    }

    return { visibleMessages, totalTokens, truncated: visibleMessages.length < messages.length };
  };

  const getContextColor = (tokens: number) => {
    if (tokens <= 8000) return "hsl(var(--chart-1))"; // Green
    if (tokens <= 32000) return "hsl(var(--chart-2))"; // Blue  
    if (tokens <= 128000) return "hsl(var(--chart-3))"; // Yellow
    return "hsl(var(--chart-4))"; // Red
  };

  const getModelName = (tokens: number) => {
    if (tokens <= 8000) return "GPT-3.5 Turbo";
    if (tokens <= 32000) return "GPT-4";
    if (tokens <= 128000) return "GPT-4 Turbo";
    return "Claude-3 Opus";
  };

  const { visibleMessages, totalTokens, truncated } = getConversationExample(contextSize[0]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📏</span>
          Context Window
        </CardTitle>
        <Badge variant="secondary">Memory Limit</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-muted-foreground mb-4">
            Maximum tokens the AI can process at once. Watch how conversations get truncated as the limit decreases.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Context Size:</span>
              <span className="text-sm text-muted-foreground">
                {contextSize[0].toLocaleString()} tokens ({getModelName(contextSize[0])})
              </span>
            </div>
            
            <Slider
              value={contextSize}
              onValueChange={setContextSize}
              max={200000}
              min={2000}
              step={1000}
              className="w-full"
            />
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>2K</span>
              <span>50K</span>
              <span>100K</span>
              <span>200K</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Token Usage:</span>
            <span className="text-sm" style={{ color: getContextColor(contextSize[0]) }}>
              {totalTokens} / {contextSize[0].toLocaleString()}
            </span>
          </div>
          
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${Math.min((totalTokens / contextSize[0]) * 100, 100)}%`,
                backgroundColor: getContextColor(contextSize[0])
              }}
            />
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">Conversation Example:</h4>
          <div className="bg-muted p-4 rounded max-h-64 overflow-y-auto space-y-2">
            {visibleMessages.map((message, index) => (
              <div key={index} className="text-sm">
                <span className="font-medium text-primary">{message.role}:</span>
                <span className="ml-2 text-muted-foreground">{message.content}</span>
                <span className="ml-2 text-xs text-muted-foreground">({message.tokens} tokens)</span>
              </div>
            ))}
            {truncated && (
              <div className="text-sm text-destructive font-medium">
                ⚠️ Conversation truncated - earlier messages lost
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium mb-1">Best Practices:</p>
            <ul className="text-muted-foreground space-y-1">
              <li>• Monitor token usage</li>
              <li>• Summarize old context</li>
              <li>• Use sliding window</li>
            </ul>
          </div>
          <div>
            <p className="font-medium mb-1">Impact:</p>
            <ul className="text-muted-foreground space-y-1">
              <li>• Memory loss</li>
              <li>• Context drift</li>
              <li>• Repeated questions</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContextWindowDemo;