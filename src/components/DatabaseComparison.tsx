import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, Table, FileText, Network, Zap, Users, Shield, TrendingUp } from "lucide-react";

export const DatabaseComparison = () => {
  const [selectedDatabase, setSelectedDatabase] = useState<string>("postgresql");

  const databases = {
    postgresql: {
      type: "SQL",
      icon: <Table className="w-5 h-5" />,
      color: "bg-blue-500",
      pros: ["ACID compliance", "Complex queries", "Strong consistency", "Mature ecosystem"],
      cons: ["Vertical scaling", "Schema rigidity", "Learning curve"],
      useCases: ["Financial systems", "E-commerce", "Analytics", "Traditional apps"]
    },
    mongodb: {
      type: "NoSQL (Document)",
      icon: <FileText className="w-5 h-5" />,
      color: "bg-green-500",
      pros: ["Flexible schema", "Horizontal scaling", "JSON-like docs", "Developer friendly"],
      cons: ["Memory usage", "No complex joins", "Consistency trade-offs"],
      useCases: ["Content management", "Catalogs", "Real-time apps", "IoT data"]
    },
    redis: {
      type: "NoSQL (Key-Value)",
      icon: <Zap className="w-5 h-5" />,
      color: "bg-red-500",
      pros: ["Ultra-fast", "In-memory", "Data structures", "Pub/Sub"],
      cons: ["Memory limited", "Data persistence", "Single-threaded"],
      useCases: ["Caching", "Sessions", "Real-time analytics", "Message queues"]
    },
    neo4j: {
      type: "NoSQL (Graph)",
      icon: <Network className="w-5 h-5" />,
      color: "bg-purple-500",
      pros: ["Relationship queries", "Pattern matching", "Graph algorithms", "Intuitive modeling"],
      cons: ["Specialized use cases", "Memory intensive", "Learning curve"],
      useCases: ["Social networks", "Recommendations", "Fraud detection", "Knowledge graphs"]
    }
  };

  const comparisonData = [
    {
      aspect: "Data Structure",
      sql: "Tables with rows and columns",
      nosql: "Documents, key-value, graphs, or wide-column"
    },
    {
      aspect: "Schema",
      sql: "Fixed schema, predefined structure",
      nosql: "Dynamic schema, flexible structure"
    },
    {
      aspect: "Query Language",
      sql: "SQL (Structured Query Language)",
      nosql: "Varies by database (MongoDB query, Cypher, etc.)"
    },
    {
      aspect: "ACID Properties",
      sql: "Full ACID compliance",
      nosql: "Eventually consistent, BASE properties"
    },
    {
      aspect: "Scaling",
      sql: "Vertical scaling (scale up)",
      nosql: "Horizontal scaling (scale out)"
    },
    {
      aspect: "Complex Queries",
      sql: "Excellent with JOINs",
      nosql: "Limited, depends on type"
    },
    {
      aspect: "Performance",
      sql: "Optimized for complex queries",
      nosql: "Optimized for simple queries and big data"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            SQL vs NoSQL Database Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="comparison">Detailed Comparison</TabsTrigger>
              <TabsTrigger value="examples">Database Examples</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Table className="w-5 h-5" />
                      SQL Databases
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Relational databases using structured query language
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span className="text-sm">ACID compliance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Complex relationships</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-purple-500" />
                        <span className="text-sm">Structured data</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <FileText className="w-5 h-5" />
                      NoSQL Databases
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Non-relational databases for flexible data models
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Horizontal scaling</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm">High performance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Network className="w-4 h-4 text-red-500" />
                        <span className="text-sm">Flexible schema</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Aspect</th>
                      <th className="text-left p-3 font-medium text-blue-600">SQL</th>
                      <th className="text-left p-3 font-medium text-green-600">NoSQL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-medium">{row.aspect}</td>
                        <td className="p-3 text-sm">{row.sql}</td>
                        <td className="p-3 text-sm">{row.nosql}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="examples" className="space-y-4">
              <div className="grid gap-4">
                <div className="flex gap-2 flex-wrap">
                  {Object.entries(databases).map(([key, db]) => (
                    <Button
                      key={key}
                      variant={selectedDatabase === key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedDatabase(key)}
                      className="flex items-center gap-2"
                    >
                      {db.icon}
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Button>
                  ))}
                </div>

                {selectedDatabase && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {databases[selectedDatabase as keyof typeof databases].icon}
                        {selectedDatabase.charAt(0).toUpperCase() + selectedDatabase.slice(1)}
                        <Badge variant="outline">
                          {databases[selectedDatabase as keyof typeof databases].type}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-green-600 mb-2">Advantages</h4>
                          <ul className="space-y-1">
                            {databases[selectedDatabase as keyof typeof databases].pros.map((pro, index) => (
                              <li key={index} className="text-sm flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-red-600 mb-2">Considerations</h4>
                          <ul className="space-y-1">
                            {databases[selectedDatabase as keyof typeof databases].cons.map((con, index) => (
                              <li key={index} className="text-sm flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Best Use Cases</h4>
                        <div className="flex gap-2 flex-wrap">
                          {databases[selectedDatabase as keyof typeof databases].useCases.map((useCase, index) => (
                            <Badge key={index} variant="secondary">{useCase}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};