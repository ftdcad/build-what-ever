import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Clock, CheckCircle, AlertTriangle, Database, Globe } from "lucide-react";

export const ACIDvsBase = () => {
  const [activeScenario, setActiveScenario] = useState("banking");

  const acidProperties = [
    {
      property: "Atomicity",
      icon: <CheckCircle className="w-5 h-5 text-blue-500" />,
      description: "All or nothing - transactions either complete fully or not at all",
      example: "Bank transfer: Either both debit and credit happen, or neither happens",
      sqlDemo: `BEGIN TRANSACTION;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
  -- If any step fails, entire transaction rolls back
COMMIT;`,
      nosqlChallenge: "Difficult to achieve across multiple documents/collections without complex coordination"
    },
    {
      property: "Consistency",
      icon: <Shield className="w-5 h-5 text-green-500" />,
      description: "Database remains in valid state, all constraints satisfied",
      example: "Account balance never goes below zero due to CHECK constraints",
      sqlDemo: `ALTER TABLE accounts 
ADD CONSTRAINT positive_balance 
CHECK (balance >= 0);

-- This would fail:
UPDATE accounts SET balance = -50 WHERE id = 1;`,
      nosqlChallenge: "Application must ensure consistency across related documents"
    },
    {
      property: "Isolation",
      icon: <Database className="w-5 h-5 text-purple-500" />,
      description: "Concurrent transactions don't interfere with each other",
      example: "Two users updating same record see consistent state",
      sqlDemo: `-- Transaction isolation levels:
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
-- Prevents phantom reads, non-repeatable reads`,
      nosqlChallenge: "Often eventual consistency - temporary inconsistencies allowed"
    },
    {
      property: "Durability",
      icon: <Clock className="w-5 h-5 text-orange-500" />,
      description: "Committed changes persist even after system failure",
      example: "Once payment is confirmed, it survives server crashes",
      sqlDemo: `-- Write-ahead logging ensures durability
COMMIT; -- Changes written to disk before returning`,
      nosqlChallenge: "Usually achieved, but may have different guarantees"
    }
  ];

  const baseProperties = [
    {
      property: "Basically Available",
      icon: <Globe className="w-5 h-5 text-blue-500" />,
      description: "System remains operational, even if some parts fail",
      example: "Social media feed still works even if some user data is temporarily unavailable",
      benefit: "High availability and fault tolerance",
      tradeoff: "Might serve stale or incomplete data"
    },
    {
      property: "Soft State",
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
      description: "Data doesn't have to be consistent at all times",
      example: "Like count on social media posts may be approximate",
      benefit: "Better performance and scalability",
      tradeoff: "Data might be inconsistent between nodes"
    },
    {
      property: "Eventually Consistent",
      icon: <Clock className="w-5 h-5 text-green-500" />,
      description: "System will become consistent over time",
      example: "Profile update eventually propagates to all social media feeds",
      benefit: "Can handle network partitions gracefully",
      tradeoff: "Temporary inconsistencies between replicas"
    }
  ];

  const scenarios = {
    banking: {
      title: "Banking System",
      description: "Financial transactions requiring strict consistency",
      requirements: ["No money lost or created", "Immediate consistency", "Audit trail"],
      acidAdvantages: [
        "Guaranteed transaction integrity",
        "No partial transactions",
        "Immediate consistency for balances",
        "Strong audit guarantees"
      ],
      baseDisadvantages: [
        "Risk of inconsistent balances",
        "Partial transaction states",
        "Difficult regulatory compliance",
        "User trust issues"
      ],
      recommendation: "ACID (SQL) - Critical for financial accuracy"
    },
    social: {
      title: "Social Media Platform",
      description: "High-scale user interactions and content",
      requirements: ["High availability", "Fast response times", "Global scale"],
      baseAdvantages: [
        "Handles millions of concurrent users",
        "Fast content delivery globally",
        "Resilient to network issues",
        "Cost-effective scaling"
      ],
      acidDisadvantages: [
        "Single point of failure",
        "Slow global consistency",
        "Expensive to scale",
        "Poor user experience during outages"
      ],
      recommendation: "BASE (NoSQL) - Optimal for social interactions"
    },
    ecommerce: {
      title: "E-commerce Platform",
      description: "Product catalog and order processing",
      requirements: ["Product consistency", "Order integrity", "Inventory accuracy"],
      hybridApproach: [
        "Product catalog: NoSQL for fast reads",
        "Order processing: SQL for transactions",
        "User sessions: NoSQL for performance",
        "Payment processing: SQL for accuracy"
      ],
      recommendation: "Hybrid - Different components use different approaches"
    }
  };

  const capTheorem = {
    consistency: {
      title: "Consistency",
      description: "All nodes see the same data simultaneously",
      example: "Bank balance is identical across all servers"
    },
    availability: {
      title: "Availability", 
      description: "System remains operational even if nodes fail",
      example: "Website stays online even if some servers crash"
    },
    partition: {
      title: "Partition Tolerance",
      description: "System continues despite network failures",
      example: "System works even if data centers lose connection"
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            ACID vs BASE Properties
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="acid" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="acid">ACID Properties</TabsTrigger>
              <TabsTrigger value="base">BASE Properties</TabsTrigger>
              <TabsTrigger value="scenarios">Use Cases</TabsTrigger>
              <TabsTrigger value="cap">CAP Theorem</TabsTrigger>
            </TabsList>

            <TabsContent value="acid" className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">ACID Properties (SQL Databases)</h3>
                <p className="text-muted-foreground">Strong consistency guarantees for reliable transactions</p>
              </div>

              <div className="space-y-4">
                {acidProperties.map((acid, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {acid.icon}
                        {acid.property}
                      </CardTitle>
                      <p className="text-muted-foreground">{acid.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2 text-blue-600">Real-World Example:</h4>
                        <p className="text-sm bg-blue-50 p-3 rounded-md border border-blue-200">
                          {acid.example}
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2 text-green-600">SQL Implementation:</h4>
                          <pre className="text-sm bg-green-50 p-3 rounded-md border border-green-200 overflow-x-auto">
                            <code>{acid.sqlDemo}</code>
                          </pre>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2 text-orange-600">NoSQL Challenge:</h4>
                          <p className="text-sm bg-orange-50 p-3 rounded-md border border-orange-200">
                            {acid.nosqlChallenge}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="base" className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">BASE Properties (NoSQL Databases)</h3>
                <p className="text-muted-foreground">Flexibility and availability over strict consistency</p>
              </div>

              <div className="space-y-4">
                {baseProperties.map((base, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {base.icon}
                        {base.property}
                      </CardTitle>
                      <p className="text-muted-foreground">{base.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2 text-blue-600">Real-World Example:</h4>
                        <p className="text-sm bg-blue-50 p-3 rounded-md border border-blue-200">
                          {base.example}
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2 text-green-600">Benefits:</h4>
                          <p className="text-sm bg-green-50 p-3 rounded-md border border-green-200">
                            {base.benefit}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2 text-orange-600">Trade-offs:</h4>
                          <p className="text-sm bg-orange-50 p-3 rounded-md border border-orange-200">
                            {base.tradeoff}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="scenarios" className="space-y-4">
              <div className="flex gap-2 flex-wrap mb-4">
                {Object.entries(scenarios).map(([key, scenario]) => (
                  <Button
                    key={key}
                    variant={activeScenario === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveScenario(key)}
                  >
                    {scenario.title}
                  </Button>
                ))}
              </div>

              {activeScenario && (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {scenarios[activeScenario as keyof typeof scenarios].title}
                    </CardTitle>
                    <p className="text-muted-foreground">
                      {scenarios[activeScenario as keyof typeof scenarios].description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Key Requirements:</h4>
                      <div className="flex gap-2 flex-wrap">
                        {scenarios[activeScenario as keyof typeof scenarios].requirements.map((req, index) => (
                          <Badge key={index} variant="outline">{req}</Badge>
                        ))}
                      </div>
                    </div>

                    {activeScenario === "banking" && (
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2 text-green-600">ACID Advantages:</h4>
                          <ul className="space-y-1 text-sm">
                            {scenarios.banking.acidAdvantages.map((advantage, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                {advantage}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 text-red-600">BASE Disadvantages:</h4>
                          <ul className="space-y-1 text-sm">
                            {scenarios.banking.baseDisadvantages.map((disadvantage, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-red-500" />
                                {disadvantage}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {activeScenario === "social" && (
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2 text-green-600">BASE Advantages:</h4>
                          <ul className="space-y-1 text-sm">
                            {scenarios.social.baseAdvantages.map((advantage, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                {advantage}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 text-red-600">ACID Disadvantages:</h4>
                          <ul className="space-y-1 text-sm">
                            {scenarios.social.acidDisadvantages.map((disadvantage, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-red-500" />
                                {disadvantage}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {activeScenario === "ecommerce" && (
                      <div>
                        <h4 className="font-medium mb-2 text-blue-600">Hybrid Approach:</h4>
                        <ul className="space-y-1 text-sm">
                          {scenarios.ecommerce.hybridApproach.map((approach, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                              {approach}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-4 p-4 bg-muted rounded-md">
                      <h4 className="font-medium mb-1">Recommendation:</h4>
                      <p className="text-sm">
                        {scenarios[activeScenario as keyof typeof scenarios].recommendation}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="cap" className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">CAP Theorem</h3>
                <p className="text-muted-foreground">You can only guarantee two out of three properties</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {Object.entries(capTheorem).map(([key, property]) => (
                  <Card key={key}>
                    <CardHeader>
                      <CardTitle className="text-lg">{property.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">{property.description}</p>
                      <p className="text-sm font-medium">{property.example}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-600">CA Systems</CardTitle>
                    <p className="text-sm text-muted-foreground">Consistency + Availability</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2">Choose strong consistency and high availability</p>
                    <p className="text-sm font-medium">Examples: Traditional RDBMS (PostgreSQL, MySQL)</p>
                    <p className="text-sm text-muted-foreground mt-2">Cannot handle network partitions well</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-green-600">CP Systems</CardTitle>
                    <p className="text-sm text-muted-foreground">Consistency + Partition Tolerance</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2">Prioritize consistency even during network issues</p>
                    <p className="text-sm font-medium">Examples: MongoDB, Redis Cluster</p>
                    <p className="text-sm text-muted-foreground mt-2">May become unavailable during partitions</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-600">AP Systems</CardTitle>
                    <p className="text-sm text-muted-foreground">Availability + Partition Tolerance</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2">Stay available during network failures</p>
                    <p className="text-sm font-medium">Examples: Cassandra, DynamoDB</p>
                    <p className="text-sm text-muted-foreground mt-2">Accept eventual consistency</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-800">Practical Implications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li>• <strong>Financial systems</strong> typically choose CP (consistency is critical)</li>
                    <li>• <strong>Social media</strong> often chooses AP (availability matters more than perfect consistency)</li>
                    <li>• <strong>Traditional web apps</strong> often use CA systems (assuming reliable networks)</li>
                    <li>• <strong>Modern distributed systems</strong> often prefer AP with eventual consistency</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};