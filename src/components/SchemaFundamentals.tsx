import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, FileText, Database, ArrowRight, Plus, Edit, AlertTriangle } from "lucide-react";

export const SchemaFundamentals = () => {
  const [activeExample, setActiveExample] = useState("ecommerce");

  const schemaExamples = {
    ecommerce: {
      title: "E-commerce System",
      description: "User orders and products",
      sql: {
        tables: [
          {
            name: "users",
            columns: [
              { name: "id", type: "INTEGER PRIMARY KEY", constraint: "NOT NULL" },
              { name: "email", type: "VARCHAR(255)", constraint: "UNIQUE NOT NULL" },
              { name: "name", type: "VARCHAR(100)", constraint: "NOT NULL" },
              { name: "created_at", type: "TIMESTAMP", constraint: "DEFAULT NOW()" }
            ]
          },
          {
            name: "products",
            columns: [
              { name: "id", type: "INTEGER PRIMARY KEY", constraint: "NOT NULL" },
              { name: "name", type: "VARCHAR(200)", constraint: "NOT NULL" },
              { name: "price", type: "DECIMAL(10,2)", constraint: "NOT NULL" },
              { name: "category_id", type: "INTEGER", constraint: "FOREIGN KEY" }
            ]
          },
          {
            name: "orders",
            columns: [
              { name: "id", type: "INTEGER PRIMARY KEY", constraint: "NOT NULL" },
              { name: "user_id", type: "INTEGER", constraint: "FOREIGN KEY" },
              { name: "total", type: "DECIMAL(10,2)", constraint: "NOT NULL" },
              { name: "status", type: "ENUM", constraint: "'pending', 'paid', 'shipped'" }
            ]
          }
        ]
      },
      nosql: {
        documents: [
          {
            collection: "users",
            structure: {
              _id: "ObjectId",
              email: "string (unique)",
              name: "string",
              profile: {
                address: "object",
                preferences: "array"
              },
              created_at: "Date"
            }
          },
          {
            collection: "products",
            structure: {
              _id: "ObjectId",
              name: "string",
              price: "number",
              category: "string",
              tags: "array",
              variants: "array of objects",
              reviews: "embedded array"
            }
          },
          {
            collection: "orders",
            structure: {
              _id: "ObjectId",
              user: "embedded user object",
              items: "array of product objects",
              total: "number",
              status: "string",
              shipping_address: "embedded object"
            }
          }
        ]
      }
    },
    blog: {
      title: "Blog System",
      description: "Posts, comments, and authors",
      sql: {
        tables: [
          {
            name: "authors",
            columns: [
              { name: "id", type: "INTEGER PRIMARY KEY", constraint: "NOT NULL" },
              { name: "username", type: "VARCHAR(50)", constraint: "UNIQUE NOT NULL" },
              { name: "bio", type: "TEXT", constraint: "NULL" },
              { name: "avatar_url", type: "VARCHAR(255)", constraint: "NULL" }
            ]
          },
          {
            name: "posts",
            columns: [
              { name: "id", type: "INTEGER PRIMARY KEY", constraint: "NOT NULL" },
              { name: "title", type: "VARCHAR(200)", constraint: "NOT NULL" },
              { name: "content", type: "TEXT", constraint: "NOT NULL" },
              { name: "author_id", type: "INTEGER", constraint: "FOREIGN KEY" },
              { name: "published_at", type: "TIMESTAMP", constraint: "NULL" }
            ]
          },
          {
            name: "comments",
            columns: [
              { name: "id", type: "INTEGER PRIMARY KEY", constraint: "NOT NULL" },
              { name: "post_id", type: "INTEGER", constraint: "FOREIGN KEY" },
              { name: "author_id", type: "INTEGER", constraint: "FOREIGN KEY" },
              { name: "content", type: "TEXT", constraint: "NOT NULL" }
            ]
          }
        ]
      },
      nosql: {
        documents: [
          {
            collection: "posts",
            structure: {
              _id: "ObjectId",
              title: "string",
              content: "string",
              author: "embedded author object",
              tags: "array",
              comments: "embedded array of comment objects",
              published_at: "Date",
              metadata: "flexible object"
            }
          },
          {
            collection: "authors",
            structure: {
              _id: "ObjectId",
              username: "string",
              bio: "string",
              avatar_url: "string",
              posts_count: "number",
              social_links: "flexible object"
            }
          }
        ]
      }
    }
  };

  const schemaEvolution = [
    {
      change: "Add new field",
      sql: {
        difficulty: "Medium",
        approach: "ALTER TABLE users ADD COLUMN phone VARCHAR(20);",
        impact: "Schema migration required, potential downtime",
        considerations: "Default values, NOT NULL constraints"
      },
      nosql: {
        difficulty: "Easy",
        approach: "Simply add field to new documents",
        impact: "No migration needed, immediate availability",
        considerations: "Handle missing fields in application logic"
      }
    },
    {
      change: "Remove field",
      sql: {
        difficulty: "Hard",
        approach: "ALTER TABLE users DROP COLUMN old_field;",
        impact: "Data loss, requires careful planning",
        considerations: "Backup data, update all queries"
      },
      nosql: {
        difficulty: "Easy",
        approach: "Stop writing field, optionally clean up",
        impact: "Gradual transition possible",
        considerations: "Legacy data may still contain field"
      }
    },
    {
      change: "Change data type",
      sql: {
        difficulty: "Hard",
        approach: "Complex migration with data conversion",
        impact: "Potential data loss, significant downtime",
        considerations: "Conversion validation, rollback plan"
      },
      nosql: {
        difficulty: "Medium",
        approach: "Handle multiple types in application",
        impact: "Gradual migration possible",
        considerations: "Type checking in application code"
      }
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Schema Fundamentals: Structure & Evolution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="comparison" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="comparison">Schema Comparison</TabsTrigger>
              <TabsTrigger value="examples">Real Examples</TabsTrigger>
              <TabsTrigger value="evolution">Schema Evolution</TabsTrigger>
            </TabsList>

            <TabsContent value="comparison" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Table className="w-5 h-5 text-blue-500" />
                      SQL Schema (Rigid)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Characteristics</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          Fixed structure defined upfront
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          Strong data type enforcement
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          Relationships via foreign keys
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          Schema changes require migration
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 text-green-600">Benefits</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Data consistency guaranteed</li>
                        <li>• Clear data contracts</li>
                        <li>• Optimized storage</li>
                        <li>• Query optimization possible</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 text-red-600">Challenges</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Difficult to change</li>
                        <li>• Upfront design required</li>
                        <li>• Migration complexity</li>
                        <li>• Less flexible for varied data</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <FileText className="w-5 h-5 text-green-500" />
                      NoSQL Schema (Flexible)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Characteristics</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          Dynamic structure per document
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          Flexible data types
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          Embedded relationships
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          Schema evolves with data
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 text-green-600">Benefits</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Rapid development</li>
                        <li>• Easy schema changes</li>
                        <li>• Handles varied data well</li>
                        <li>• Natural object mapping</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 text-red-600">Challenges</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Potential data inconsistency</li>
                        <li>• Larger storage requirements</li>
                        <li>• Application-level validation</li>
                        <li>• Complex cross-document queries</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="examples" className="space-y-4">
              <div className="flex gap-2 flex-wrap mb-4">
                {Object.entries(schemaExamples).map(([key, example]) => (
                  <Button
                    key={key}
                    variant={activeExample === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveExample(key)}
                  >
                    {example.title}
                  </Button>
                ))}
              </div>

              {activeExample && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {schemaExamples[activeExample as keyof typeof schemaExamples].title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {schemaExamples[activeExample as keyof typeof schemaExamples].description}
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Table className="w-5 h-5 text-blue-500" />
                          SQL Schema
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {schemaExamples[activeExample as keyof typeof schemaExamples].sql.tables.map((table, index) => (
                          <div key={index} className="border rounded-lg p-3">
                            <h4 className="font-medium mb-2 text-blue-600">{table.name}</h4>
                            <div className="space-y-1">
                              {table.columns.map((column, colIndex) => (
                                <div key={colIndex} className="text-sm grid grid-cols-3 gap-2">
                                  <span className="font-mono">{column.name}</span>
                                  <span className="text-muted-foreground">{column.type}</span>
                                  <span className="text-xs text-muted-foreground">{column.constraint}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <FileText className="w-5 h-5 text-green-500" />
                          NoSQL Schema
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {schemaExamples[activeExample as keyof typeof schemaExamples].nosql.documents.map((doc, index) => (
                          <div key={index} className="border rounded-lg p-3">
                            <h4 className="font-medium mb-2 text-green-600">{doc.collection}</h4>
                            <pre className="text-sm bg-muted p-2 rounded overflow-x-auto">
                              <code>{JSON.stringify(doc.structure, null, 2)}</code>
                            </pre>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="evolution" className="space-y-4">
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold mb-2">Schema Evolution Comparison</h3>
                  <p className="text-muted-foreground">How different database types handle schema changes</p>
                </div>

                {schemaEvolution.map((evolution, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Edit className="w-5 h-5" />
                        {evolution.change}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Table className="w-4 h-4 text-blue-500" />
                            <span className="font-medium">SQL Approach</span>
                            <Badge variant={evolution.sql.difficulty === "Easy" ? "default" : evolution.sql.difficulty === "Medium" ? "secondary" : "destructive"}>
                              {evolution.sql.difficulty}
                            </Badge>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-medium">Approach:</span>
                              <p className="font-mono bg-muted p-2 rounded mt-1">{evolution.sql.approach}</p>
                            </div>
                            <div>
                              <span className="font-medium">Impact:</span>
                              <p>{evolution.sql.impact}</p>
                            </div>
                            <div>
                              <span className="font-medium">Considerations:</span>
                              <p>{evolution.sql.considerations}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-green-500" />
                            <span className="font-medium">NoSQL Approach</span>
                            <Badge variant={evolution.nosql.difficulty === "Easy" ? "default" : evolution.nosql.difficulty === "Medium" ? "secondary" : "destructive"}>
                              {evolution.nosql.difficulty}
                            </Badge>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-medium">Approach:</span>
                              <p className="bg-muted p-2 rounded mt-1">{evolution.nosql.approach}</p>
                            </div>
                            <div>
                              <span className="font-medium">Impact:</span>
                              <p>{evolution.nosql.impact}</p>
                            </div>
                            <div>
                              <span className="font-medium">Considerations:</span>
                              <p>{evolution.nosql.considerations}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};