import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Play, Copy } from "lucide-react";
import { toast } from "sonner";

export const QueryComparison = () => {
  const [activeQuery, setActiveQuery] = useState("basic-select");

  const queryExamples = {
    "basic-select": {
      title: "Basic Data Retrieval",
      description: "Fetch user information",
      sql: {
        query: `SELECT id, name, email, created_at
FROM users
WHERE status = 'active'
ORDER BY created_at DESC
LIMIT 10;`,
        explanation: "Retrieves active users with selected fields, ordered by creation date"
      },
      mongodb: {
        query: `db.users.find(
  { status: "active" },
  { name: 1, email: 1, created_at: 1 }
).sort({ created_at: -1 }).limit(10)`,
        explanation: "MongoDB query using find() with projection and sorting"
      },
      redis: {
        query: `# Get user data (assuming key-value structure)
HMGET user:123 name email status
LRANGE active_users 0 9`,
        explanation: "Redis commands for hash fields and list operations"
      }
    },
    "complex-join": {
      title: "Complex Relationships",
      description: "Users with their orders and order items",
      sql: {
        query: `SELECT u.name, u.email, 
       o.id as order_id, o.total,
       oi.product_name, oi.quantity
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN order_items oi ON o.id = oi.order_id
WHERE o.created_at >= '2024-01-01'
ORDER BY o.created_at DESC;`,
        explanation: "SQL excels at complex joins across multiple tables"
      },
      mongodb: {
        query: `db.users.aggregate([
  {
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "user_id",
      as: "orders"
    }
  },
  {
    $unwind: "$orders"
  },
  {
    $lookup: {
      from: "order_items", 
      localField: "orders._id",
      foreignField: "order_id",
      as: "orders.items"
    }
  },
  {
    $match: {
      "orders.created_at": { $gte: new Date("2024-01-01") }
    }
  }
])`,
        explanation: "MongoDB aggregation pipeline with multiple lookups (joins)"
      },
      redis: {
        query: `# Redis doesn't handle complex relationships well
# Would require multiple commands:
SMEMBERS user:123:orders
HMGET order:456 total created_at
SMEMBERS order:456:items`,
        explanation: "Redis requires application-level join logic for complex relationships"
      }
    },
    "aggregation": {
      title: "Data Aggregation",
      description: "Sales statistics by month",
      sql: {
        query: `SELECT 
  EXTRACT(YEAR FROM created_at) as year,
  EXTRACT(MONTH FROM created_at) as month,
  COUNT(*) as order_count,
  SUM(total) as total_revenue,
  AVG(total) as avg_order_value
FROM orders
WHERE created_at >= '2024-01-01'
GROUP BY year, month
ORDER BY year, month;`,
        explanation: "SQL aggregate functions with grouping and date extraction"
      },
      mongodb: {
        query: `db.orders.aggregate([
  {
    $match: {
      created_at: { $gte: new Date("2024-01-01") }
    }
  },
  {
    $group: {
      _id: {
        year: { $year: "$created_at" },
        month: { $month: "$created_at" }
      },
      order_count: { $sum: 1 },
      total_revenue: { $sum: "$total" },
      avg_order_value: { $avg: "$total" }
    }
  },
  {
    $sort: { "_id.year": 1, "_id.month": 1 }
  }
])`,
        explanation: "MongoDB aggregation with grouping and date operators"
      },
      redis: {
        query: `# Redis limited aggregation - better for real-time counters
HINCRBY sales:2024:01 total_revenue 150.00
HINCRBY sales:2024:01 order_count 1
HGETALL sales:2024:01`,
        explanation: "Redis better for real-time counters, limited complex aggregation"
      }
    },
    "text-search": {
      title: "Text Search",
      description: "Search products by name and description",
      sql: {
        query: `SELECT * FROM products
WHERE 
  name ILIKE '%laptop%' 
  OR description ILIKE '%laptop%'
ORDER BY 
  CASE 
    WHEN name ILIKE '%laptop%' THEN 1 
    ELSE 2 
  END;`,
        explanation: "SQL text search with ILIKE (case-insensitive) and result ranking"
      },
      mongodb: {
        query: `db.products.find({
  $text: { $search: "laptop" }
}).sort({
  score: { $meta: "textScore" }
})

# Alternative with regex
db.products.find({
  $or: [
    { name: { $regex: "laptop", $options: "i" } },
    { description: { $regex: "laptop", $options: "i" } }
  ]
})`,
        explanation: "MongoDB text search with scoring or regex patterns"
      },
      redis: {
        query: `# Redis with RediSearch module
FT.SEARCH products "@name|description:laptop"

# Without search module - limited options
KEYS product:*:name:*laptop*`,
        explanation: "Redis requires RediSearch module for full-text search capabilities"
      }
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Query copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            SQL vs NoSQL Query Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Query Selection */}
            <div className="flex gap-2 flex-wrap">
              {Object.entries(queryExamples).map(([key, example]) => (
                <Button
                  key={key}
                  variant={activeQuery === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveQuery(key)}
                >
                  {example.title}
                </Button>
              ))}
            </div>

            {/* Query Display */}
            {activeQuery && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    {queryExamples[activeQuery as keyof typeof queryExamples].title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {queryExamples[activeQuery as keyof typeof queryExamples].description}
                  </p>
                </div>

                <Tabs defaultValue="sql" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="sql">SQL (PostgreSQL)</TabsTrigger>
                    <TabsTrigger value="mongodb">MongoDB</TabsTrigger>
                    <TabsTrigger value="redis">Redis</TabsTrigger>
                  </TabsList>

                  <TabsContent value="sql" className="space-y-3">
                    <div className="relative">
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-blue-600">SQL</Badge>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(queryExamples[activeQuery as keyof typeof queryExamples].sql.query)}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto">
                            <code>{queryExamples[activeQuery as keyof typeof queryExamples].sql.query}</code>
                          </pre>
                          <p className="text-sm text-muted-foreground mt-2">
                            {queryExamples[activeQuery as keyof typeof queryExamples].sql.explanation}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="mongodb" className="space-y-3">
                    <div className="relative">
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-green-600">MongoDB</Badge>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(queryExamples[activeQuery as keyof typeof queryExamples].mongodb.query)}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto">
                            <code>{queryExamples[activeQuery as keyof typeof queryExamples].mongodb.query}</code>
                          </pre>
                          <p className="text-sm text-muted-foreground mt-2">
                            {queryExamples[activeQuery as keyof typeof queryExamples].mongodb.explanation}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="redis" className="space-y-3">
                    <div className="relative">
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-red-600">Redis</Badge>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(queryExamples[activeQuery as keyof typeof queryExamples].redis.query)}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto">
                            <code>{queryExamples[activeQuery as keyof typeof queryExamples].redis.query}</code>
                          </pre>
                          <p className="text-sm text-muted-foreground mt-2">
                            {queryExamples[activeQuery as keyof typeof queryExamples].redis.explanation}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};