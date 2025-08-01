import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, FileText, ArrowRight, Users, ShoppingCart, MessageSquare, Code2 } from "lucide-react";

export const DataModelingWorkshop = () => {
  const [activeScenario, setActiveScenario] = useState("blog");

  const modelingScenarios = {
    blog: {
      title: "Blog Platform",
      icon: <MessageSquare className="w-5 h-5" />,
      description: "Authors write posts with comments and tags",
      requirements: [
        "Authors can write multiple posts",
        "Posts can have multiple comments",
        "Posts can have multiple tags",
        "Users can comment on posts",
        "Search posts by tags"
      ],
      sql: {
        approach: "Normalized relational design",
        pros: ["Strong referential integrity", "No data duplication", "Efficient updates"],
        cons: ["Complex joins for display", "Multiple table queries", "Performance overhead"],
        schema: `-- Authors table
CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  bio TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Posts table  
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  author_id INTEGER REFERENCES authors(id),
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tags table
CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

-- Post-Tags junction table (many-to-many)
CREATE TABLE post_tags (
  post_id INTEGER REFERENCES posts(id),
  tag_id INTEGER REFERENCES tags(id),
  PRIMARY KEY (post_id, tag_id)
);

-- Comments table
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id),
  author_id INTEGER REFERENCES authors(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);`,
        query: `-- Get post with author, tags, and comments
SELECT 
  p.title,
  p.content,
  a.username as author,
  array_agg(DISTINCT t.name) as tags,
  json_agg(
    json_build_object(
      'comment', c.content,
      'author', ca.username,
      'created_at', c.created_at
    )
  ) as comments
FROM posts p
JOIN authors a ON p.author_id = a.id
LEFT JOIN post_tags pt ON p.id = pt.post_id
LEFT JOIN tags t ON pt.tag_id = t.id
LEFT JOIN comments c ON p.id = c.post_id
LEFT JOIN authors ca ON c.author_id = ca.id
WHERE p.id = 1
GROUP BY p.id, p.title, p.content, a.username;`
      },
      nosql: {
        approach: "Denormalized document design",
        pros: ["Single query for display", "Natural object mapping", "Fast reads"],
        cons: ["Data duplication", "Complex updates", "Larger storage"],
        schema: `// Posts collection (embedded approach)
{
  "_id": "post123",
  "title": "Getting Started with NoSQL",
  "content": "NoSQL databases offer flexibility...",
  "author": {
    "id": "author456", 
    "username": "johndoe",
    "email": "john@example.com"
  },
  "tags": ["nosql", "database", "tutorial"],
  "comments": [
    {
      "id": "comment789",
      "content": "Great article!",
      "author": {
        "id": "user123",
        "username": "janedoe"
      },
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "published_at": "2024-01-15T09:00:00Z",
  "created_at": "2024-01-15T08:45:00Z"
}

// Authors collection (separate)
{
  "_id": "author456",
  "username": "johndoe", 
  "email": "john@example.com",
  "bio": "Tech writer and developer",
  "post_count": 15,
  "created_at": "2023-12-01T00:00:00Z"
}`,
        query: `// Single query to get complete post
db.posts.findOne({"_id": "post123"})

// Query posts by tag
db.posts.find({"tags": "nosql"})

// Add comment (update operation)
db.posts.updateOne(
  {"_id": "post123"},
  {
    $push: {
      "comments": {
        "id": "comment890",
        "content": "Thanks for sharing!",
        "author": {"id": "user456", "username": "bobsmith"},
        "created_at": new Date()
      }
    }
  }
)`
      }
    },
    ecommerce: {
      title: "E-commerce Store",
      icon: <ShoppingCart className="w-5 h-5" />,
      description: "Products, orders, customers, and inventory",
      requirements: [
        "Customers place orders with multiple items",
        "Products have variants (size, color)",
        "Inventory tracking per variant",
        "Order history and status tracking",
        "Product categories and search"
      ],
      sql: {
        approach: "Highly normalized with strong consistency",
        pros: ["ACID transactions", "Inventory accuracy", "Strong constraints"],
        cons: ["Complex queries", "Many joins", "Performance challenges"],
        schema: `-- Customers
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  address JSONB
);

-- Categories  
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  parent_id INTEGER REFERENCES categories(id)
);

-- Products
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  category_id INTEGER REFERENCES categories(id),
  base_price DECIMAL(10,2) NOT NULL
);

-- Product variants
CREATE TABLE product_variants (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  sku VARCHAR(50) UNIQUE NOT NULL,
  size VARCHAR(20),
  color VARCHAR(30),
  price DECIMAL(10,2) NOT NULL,
  inventory_count INTEGER NOT NULL DEFAULT 0
);

-- Orders
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  total_amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Order items
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  variant_id INTEGER REFERENCES product_variants(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL
);`,
        query: `-- Complex order query with all details
SELECT 
  o.id as order_id,
  c.name as customer_name,
  o.status,
  o.total_amount,
  json_agg(
    json_build_object(
      'product', p.name,
      'variant', pv.sku,
      'size', pv.size,
      'color', pv.color,
      'quantity', oi.quantity,
      'unit_price', oi.unit_price
    )
  ) as items
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN order_items oi ON o.id = oi.order_id
JOIN product_variants pv ON oi.variant_id = pv.id
JOIN products p ON pv.product_id = p.id
WHERE o.id = 123
GROUP BY o.id, c.name, o.status, o.total_amount;`
      },
      nosql: {
        approach: "Mixed embedding and referencing strategy",
        pros: ["Fast order lookups", "Easy to scale", "Flexible product data"],
        cons: ["Inventory consistency challenges", "Update complexity", "Data duplication"],
        schema: `// Orders collection (embedded items)
{
  "_id": "order123",
  "customer": {
    "id": "customer456",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "items": [
    {
      "product_id": "product789",
      "variant_id": "variant101",
      "name": "Blue T-Shirt",
      "sku": "TSHIRT-BLUE-L",
      "size": "L",
      "color": "blue", 
      "quantity": 2,
      "unit_price": 25.99
    }
  ],
  "status": "shipped",
  "total_amount": 51.98,
  "created_at": "2024-01-15T10:00:00Z"
}

// Products collection  
{
  "_id": "product789",
  "name": "Cotton T-Shirt",
  "description": "Comfortable cotton t-shirt",
  "category": "clothing",
  "variants": [
    {
      "id": "variant101",
      "sku": "TSHIRT-BLUE-L",
      "size": "L",
      "color": "blue",
      "price": 25.99,
      "inventory": 50
    }
  ],
  "images": ["url1", "url2"],
  "tags": ["cotton", "casual", "comfortable"]
}

// Customers collection
{
  "_id": "customer456",
  "name": "John Doe",
  "email": "john@example.com",
  "addresses": [...],
  "order_history": ["order123", "order124"]
}`,
        query: `// Get order (single query)
db.orders.findOne({"_id": "order123"})

// Update inventory (requires careful handling)
db.products.updateOne(
  {
    "_id": "product789",
    "variants.id": "variant101"
  },
  {
    $inc: {"variants.$.inventory": -2}
  }
)

// Find products by category
db.products.find({"category": "clothing"})`
      }
    },
    social: {
      title: "Social Network",
      icon: <Users className="w-5 h-5" />,
      description: "Users, posts, follows, and social interactions",
      requirements: [
        "Users can follow other users",
        "Users create posts with likes/comments",
        "News feed of followed users' posts",
        "Real-time notifications",
        "User profiles and activity"
      ],
      sql: {
        approach: "Normalized with complex relationship tables",
        pros: ["Consistent follower counts", "Strong data integrity", "Complex analytics"],
        cons: ["Feed generation is expensive", "Complex joins", "Hard to scale"],
        schema: `-- Users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  profile_image VARCHAR(255),
  bio TEXT,
  follower_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0
);

-- Follows (many-to-many relationship)
CREATE TABLE follows (
  id SERIAL PRIMARY KEY,
  follower_id INTEGER REFERENCES users(id),
  following_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(follower_id, following_id)
);

-- Posts
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  content TEXT NOT NULL,
  image_url VARCHAR(255),
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Likes
CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  post_id INTEGER REFERENCES posts(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);

-- Comments
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  post_id INTEGER REFERENCES posts(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);`,
        query: `-- Generate user feed (expensive operation)
SELECT 
  p.*,
  u.username,
  u.profile_image,
  EXISTS(SELECT 1 FROM likes l WHERE l.post_id = p.id AND l.user_id = $1) as user_liked
FROM posts p
JOIN users u ON p.user_id = u.id
WHERE p.user_id IN (
  SELECT following_id FROM follows WHERE follower_id = $1
)
ORDER BY p.created_at DESC
LIMIT 20;`
      },
      nosql: {
        approach: "Denormalized for fast social feeds",
        pros: ["Fast feed generation", "Scales horizontally", "Real-time friendly"],
        cons: ["Data inconsistency risk", "Complex update logic", "Storage overhead"],
        schema: `// Users collection
{
  "_id": "user123",
  "username": "johndoe",
  "email": "john@example.com",
  "profile": {
    "image": "profile.jpg",
    "bio": "Software developer"
  },
  "stats": {
    "followers": 150,
    "following": 75,
    "posts": 42
  },
  "following": ["user456", "user789"], // for small lists
  "created_at": "2023-01-01T00:00:00Z"
}

// Posts collection  
{
  "_id": "post123",
  "author": {
    "id": "user123",
    "username": "johndoe",
    "profile_image": "profile.jpg"
  },
  "content": "Having a great day coding!",
  "image": "post-image.jpg",
  "stats": {
    "likes": 25,
    "comments": 8,
    "shares": 3
  },
  "interactions": {
    "recent_likes": [
      {"user_id": "user456", "username": "janedoe"},
      {"user_id": "user789", "username": "bobsmith"}
    ],
    "recent_comments": [...]
  },
  "created_at": "2024-01-15T14:30:00Z"
}

// User feeds (pre-computed for performance)
{
  "_id": "feed_user123",
  "user_id": "user123", 
  "posts": [
    {
      "post_id": "post456",
      "author_id": "user789",
      "created_at": "2024-01-15T12:00:00Z"
    }
  ],
  "last_updated": "2024-01-15T14:35:00Z"
}`,
        query: `// Get user feed (fast lookup)
db.feeds.findOne({"user_id": "user123"})

// Get full post details
db.posts.findOne({"_id": "post123"})

// Like a post (atomic operation)
db.posts.updateOne(
  {"_id": "post123"},
  {
    $inc: {"stats.likes": 1},
    $push: {
      "interactions.recent_likes": {
        $each: [{"user_id": "user456", "username": "janedoe"}],
        $slice: -10  // Keep only last 10
      }
    }
  }
)`
      }
    }
  };

  const designPrinciples = {
    sql: [
      {
        principle: "Normalize to reduce redundancy",
        description: "Break data into separate tables to eliminate duplication",
        example: "Separate users, posts, and comments tables"
      },
      {
        principle: "Use foreign keys for relationships",
        description: "Enforce referential integrity with foreign key constraints", 
        example: "post.author_id references users.id"
      },
      {
        principle: "Design for data integrity",
        description: "Use constraints and transactions to maintain consistency",
        example: "CHECK constraints, UNIQUE indexes, transactions"
      },
      {
        principle: "Optimize for writes and consistency",
        description: "Prioritize data accuracy over read performance",
        example: "ACID transactions for critical operations"
      }
    ],
    nosql: [
      {
        principle: "Denormalize for query patterns",
        description: "Structure data to match how it will be accessed",
        example: "Embed comments in posts for single-query retrieval"
      },
      {
        principle: "Duplicate data strategically",
        description: "Accept redundancy to avoid complex joins",
        example: "Store author info in both posts and users collections"
      },
      {
        principle: "Design for read performance",
        description: "Optimize document structure for fast queries",
        example: "Pre-computed user feeds for social media"
      },
      {
        principle: "Handle eventual consistency",
        description: "Design application logic to handle temporary inconsistencies",
        example: "Update follower counts asynchronously"
      }
    ]
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Data Modeling Workshop
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="scenarios" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="scenarios">Modeling Scenarios</TabsTrigger>
              <TabsTrigger value="principles">Design Principles</TabsTrigger>
            </TabsList>

            <TabsContent value="scenarios" className="space-y-4">
              <div className="flex gap-2 flex-wrap mb-4">
                {Object.entries(modelingScenarios).map(([key, scenario]) => (
                  <Button
                    key={key}
                    variant={activeScenario === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveScenario(key)}
                    className="flex items-center gap-2"
                  >
                    {scenario.icon}
                    {scenario.title}
                  </Button>
                ))}
              </div>

              {activeScenario && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {modelingScenarios[activeScenario as keyof typeof modelingScenarios].icon}
                        {modelingScenarios[activeScenario as keyof typeof modelingScenarios].title}
                      </CardTitle>
                      <p className="text-muted-foreground">
                        {modelingScenarios[activeScenario as keyof typeof modelingScenarios].description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <h4 className="font-medium mb-2">Requirements:</h4>
                        <ul className="space-y-1 text-sm">
                          {modelingScenarios[activeScenario as keyof typeof modelingScenarios].requirements.map((req, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Database className="w-5 h-5 text-blue-500" />
                          SQL Approach
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {modelingScenarios[activeScenario as keyof typeof modelingScenarios].sql.approach}
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-green-600 mb-1">Pros:</h5>
                            <ul className="space-y-1 text-sm">
                              {modelingScenarios[activeScenario as keyof typeof modelingScenarios].sql.pros.map((pro, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <div className="w-1 h-1 bg-green-500 rounded-full" />
                                  {pro}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-red-600 mb-1">Cons:</h5>
                            <ul className="space-y-1 text-sm">
                              {modelingScenarios[activeScenario as keyof typeof modelingScenarios].sql.cons.map((con, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <div className="w-1 h-1 bg-red-500 rounded-full" />
                                  {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">Schema:</h5>
                          <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto max-h-60">
                            <code>{modelingScenarios[activeScenario as keyof typeof modelingScenarios].sql.schema}</code>
                          </pre>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">Query Example:</h5>
                          <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto max-h-40">
                            <code>{modelingScenarios[activeScenario as keyof typeof modelingScenarios].sql.query}</code>
                          </pre>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <FileText className="w-5 h-5 text-green-500" />
                          NoSQL Approach
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {modelingScenarios[activeScenario as keyof typeof modelingScenarios].nosql.approach}
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-green-600 mb-1">Pros:</h5>
                            <ul className="space-y-1 text-sm">
                              {modelingScenarios[activeScenario as keyof typeof modelingScenarios].nosql.pros.map((pro, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <div className="w-1 h-1 bg-green-500 rounded-full" />
                                  {pro}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-red-600 mb-1">Cons:</h5>
                            <ul className="space-y-1 text-sm">
                              {modelingScenarios[activeScenario as keyof typeof modelingScenarios].nosql.cons.map((con, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <div className="w-1 h-1 bg-red-500 rounded-full" />
                                  {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">Document Structure:</h5>
                          <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto max-h-60">
                            <code>{modelingScenarios[activeScenario as keyof typeof modelingScenarios].nosql.schema}</code>
                          </pre>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">Query Examples:</h5>
                          <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto max-h-40">
                            <code>{modelingScenarios[activeScenario as keyof typeof modelingScenarios].nosql.query}</code>
                          </pre>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="principles" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-blue-500" />
                      SQL Design Principles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {designPrinciples.sql.map((principle, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-medium text-blue-700">{principle.principle}</h4>
                        <p className="text-sm text-muted-foreground mb-1">{principle.description}</p>
                        <p className="text-sm italic">Example: {principle.example}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-green-500" />
                      NoSQL Design Principles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {designPrinciples.nosql.map((principle, index) => (
                      <div key={index} className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-medium text-green-700">{principle.principle}</h4>
                        <p className="text-sm text-muted-foreground mb-1">{principle.description}</p>
                        <p className="text-sm italic">Example: {principle.example}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-700 dark:bg-yellow-900/20">
                <CardHeader>
                  <CardTitle className="text-yellow-800 dark:text-yellow-100">When to Use Which Approach</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-blue-700 mb-2">Choose SQL When:</h4>
                      <ul className="space-y-1 text-sm text-blue-600">
                        <li>• Complex relationships between entities</li>
                        <li>• Strong consistency requirements</li>
                        <li>• ACID transactions are critical</li>
                        <li>• Data integrity is paramount</li>
                        <li>• Complex analytical queries needed</li>
                        <li>• Well-defined, stable data structure</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-700 mb-2">Choose NoSQL When:</h4>
                      <ul className="space-y-1 text-sm text-green-600">
                        <li>• Rapid development and iteration</li>
                        <li>• High-scale read performance needed</li>
                        <li>• Flexible, evolving data structure</li>
                        <li>• Horizontal scaling requirements</li>
                        <li>• Simple query patterns</li>
                        <li>• Real-time applications</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};