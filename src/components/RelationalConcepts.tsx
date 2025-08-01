import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GitBranch, Link, Users, ArrowRight, Database, FileText } from "lucide-react";

export const RelationalConcepts = () => {
  const [activeRelationship, setActiveRelationship] = useState("one-to-many");

  const relationships = {
    "one-to-one": {
      title: "One-to-One (1:1)",
      description: "Each record in table A relates to exactly one record in table B",
      examples: ["User ↔ Profile", "Employee ↔ Desk", "Country ↔ Capital"],
      sql: {
        explanation: "Foreign key with UNIQUE constraint",
        schema: `-- Users table
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  email VARCHAR(255) NOT NULL
);

-- User profiles table  
CREATE TABLE user_profiles (
  id INTEGER PRIMARY KEY,
  user_id INTEGER UNIQUE NOT NULL,
  bio TEXT,
  avatar_url VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id)
);`,
        query: `SELECT u.email, p.bio, p.avatar_url
FROM users u
LEFT JOIN user_profiles p ON u.id = p.user_id;`
      },
      nosql: {
        explanation: "Embed related data in same document",
        approach1: `// Embedded approach
{
  "_id": "user123",
  "email": "john@example.com",
  "profile": {
    "bio": "Software developer",
    "avatar_url": "https://example.com/avatar.jpg",
    "preferences": {...}
  }
}`,
        approach2: `// Reference approach (less common for 1:1)
// Users collection
{ "_id": "user123", "email": "john@example.com" }

// Profiles collection  
{
  "_id": "profile456",
  "user_id": "user123",
  "bio": "Software developer"
}`
      }
    },
    "one-to-many": {
      title: "One-to-Many (1:M)",
      description: "Each record in table A can relate to multiple records in table B",
      examples: ["Customer → Orders", "Category → Products", "Author → Posts"],
      sql: {
        explanation: "Foreign key in the 'many' side table",
        schema: `-- Categories table
CREATE TABLE categories (
  id INTEGER PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- Products table
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  price DECIMAL(10,2),
  category_id INTEGER NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);`,
        query: `SELECT c.name as category, p.name as product, p.price
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
ORDER BY c.name, p.name;`
      },
      nosql: {
        explanation: "Embed array or use references",
        approach1: `// Embedded approach - embed children in parent
{
  "_id": "category123",
  "name": "Electronics",
  "products": [
    {
      "name": "Laptop",
      "price": 999.99,
      "sku": "LAP001"
    },
    {
      "name": "Phone", 
      "price": 599.99,
      "sku": "PHN001"
    }
  ]
}`,
        approach2: `// Reference approach - separate collections
// Categories
{ "_id": "cat123", "name": "Electronics" }

// Products
{ "_id": "prod1", "name": "Laptop", "category_id": "cat123" }
{ "_id": "prod2", "name": "Phone", "category_id": "cat123" }`
      }
    },
    "many-to-many": {
      title: "Many-to-Many (M:M)",
      description: "Records in table A can relate to multiple records in table B and vice versa",
      examples: ["Students ↔ Courses", "Users ↔ Roles", "Posts ↔ Tags"],
      sql: {
        explanation: "Junction table with foreign keys to both tables",
        schema: `-- Students table
CREATE TABLE students (
  id INTEGER PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- Courses table
CREATE TABLE courses (
  id INTEGER PRIMARY KEY,
  title VARCHAR(200) NOT NULL
);

-- Junction table
CREATE TABLE enrollments (
  id INTEGER PRIMARY KEY,
  student_id INTEGER NOT NULL,
  course_id INTEGER NOT NULL,
  enrolled_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (course_id) REFERENCES courses(id),
  UNIQUE(student_id, course_id)
);`,
        query: `SELECT s.name as student, c.title as course, e.enrolled_at
FROM students s
JOIN enrollments e ON s.id = e.student_id  
JOIN courses c ON e.course_id = c.id
ORDER BY s.name;`
      },
      nosql: {
        explanation: "Arrays of references in both directions",
        approach1: `// Students collection
{
  "_id": "student123",
  "name": "John Doe",
  "course_ids": ["course456", "course789"]
}

// Courses collection
{
  "_id": "course456", 
  "title": "Database Design",
  "student_ids": ["student123", "student234"]
}`,
        approach2: `// Separate enrollments collection
{
  "_id": "enrollment001",
  "student_id": "student123",
  "course_id": "course456", 
  "enrolled_at": "2024-01-15T10:00:00Z",
  "grade": "A"
}`
      }
    }
  };

  const normalizationLevels = [
    {
      level: "1NF",
      title: "First Normal Form",
      rules: ["Each column contains atomic (indivisible) values", "No repeating groups", "Each row is unique"],
      before: `// Violates 1NF - multiple values in one column
| id | name | phones |
|----|------|--------|
| 1  | John | 555-1234, 555-5678 |`,
      after: `// Follows 1NF - atomic values
| id | name | phone |
|----|------|-------|
| 1  | John | 555-1234 |
| 1  | John | 555-5678 |`
    },
    {
      level: "2NF",
      title: "Second Normal Form", 
      rules: ["Must be in 1NF", "No partial dependencies", "Non-key attributes depend on entire primary key"],
      before: `// Violates 2NF - course_name depends only on course_id
| student_id | course_id | course_name | grade |
|------------|-----------|-------------|-------|
| 1          | CS101     | Intro CS    | A     |`,
      after: `// Students_Courses table
| student_id | course_id | grade |
|------------|-----------|-------|
| 1          | CS101     | A     |

// Courses table  
| course_id | course_name |
|-----------|-------------|
| CS101     | Intro CS    |`
    },
    {
      level: "3NF",
      title: "Third Normal Form",
      rules: ["Must be in 2NF", "No transitive dependencies", "Non-key attributes depend only on primary key"],
      before: `// Violates 3NF - department depends on instructor
| course_id | instructor | department |
|-----------|------------|------------|
| CS101     | Dr. Smith  | Computer Science |`,
      after: `// Courses table
| course_id | instructor_id |
|-----------|---------------|
| CS101     | 1             |

// Instructors table
| instructor_id | name | department |
|---------------|------|------------|
| 1             | Dr. Smith | Computer Science |`
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            Relational vs Non-Relational Concepts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="relationships" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="relationships">Relationships</TabsTrigger>
              <TabsTrigger value="normalization">Normalization</TabsTrigger>
              <TabsTrigger value="integrity">Data Integrity</TabsTrigger>
            </TabsList>

            <TabsContent value="relationships" className="space-y-4">
              <div className="flex gap-2 flex-wrap mb-4">
                {Object.entries(relationships).map(([key, relationship]) => (
                  <Button
                    key={key}
                    variant={activeRelationship === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveRelationship(key)}
                  >
                    {relationship.title}
                  </Button>
                ))}
              </div>

              {activeRelationship && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Link className="w-5 h-5" />
                        {relationships[activeRelationship as keyof typeof relationships].title}
                      </CardTitle>
                      <p className="text-muted-foreground">
                        {relationships[activeRelationship as keyof typeof relationships].description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Common Examples:</h4>
                        <div className="flex gap-2 flex-wrap">
                          {relationships[activeRelationship as keyof typeof relationships].examples.map((example, index) => (
                            <Badge key={index} variant="outline">{example}</Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid lg:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                              <Database className="w-5 h-5 text-blue-500" />
                              SQL Implementation
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                              {relationships[activeRelationship as keyof typeof relationships].sql.explanation}
                            </p>
                            
                            <div>
                              <h5 className="font-medium mb-2">Schema Definition:</h5>
                              <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto">
                                <code>{relationships[activeRelationship as keyof typeof relationships].sql.schema}</code>
                              </pre>
                            </div>

                            <div>
                              <h5 className="font-medium mb-2">Query Example:</h5>
                              <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto">
                                <code>{relationships[activeRelationship as keyof typeof relationships].sql.query}</code>
                              </pre>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                              <FileText className="w-5 h-5 text-green-500" />
                              NoSQL Implementation
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                              {relationships[activeRelationship as keyof typeof relationships].nosql.explanation}
                            </p>
                            
                            <div>
                              <h5 className="font-medium mb-2">Approach 1 - Embedded:</h5>
                              <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto">
                                <code>{relationships[activeRelationship as keyof typeof relationships].nosql.approach1}</code>
                              </pre>
                            </div>

                            <div>
                              <h5 className="font-medium mb-2">Approach 2 - Referenced:</h5>
                              <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto">
                                <code>{relationships[activeRelationship as keyof typeof relationships].nosql.approach2}</code>
                              </pre>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="normalization" className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">Database Normalization</h3>
                <p className="text-muted-foreground">Organizing data to reduce redundancy and improve integrity</p>
              </div>

              <div className="space-y-4">
                {normalizationLevels.map((level, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline">{level.level}</Badge>
                        {level.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Rules:</h4>
                        <ul className="space-y-1">
                          {level.rules.map((rule, ruleIndex) => (
                            <li key={ruleIndex} className="text-sm flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {rule}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2 text-red-600">Before Normalization:</h4>
                          <pre className="text-sm bg-red-50 p-3 rounded-md overflow-x-auto border border-red-200">
                            <code>{level.before}</code>
                          </pre>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2 text-green-600">After Normalization:</h4>
                          <pre className="text-sm bg-green-50 p-3 rounded-md overflow-x-auto border border-green-200">
                            <code>{level.after}</code>
                          </pre>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-700 dark:bg-yellow-900/20">
                  <CardHeader>
                    <CardTitle className="text-yellow-800 dark:text-yellow-100">NoSQL and Normalization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-yellow-700 dark:text-yellow-50">
                      NoSQL databases often deliberately <strong>denormalize</strong> data for performance. 
                      Instead of normalization, NoSQL focuses on:
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-yellow-700 dark:text-yellow-50">
                      <li>• <strong>Embedding related data</strong> to reduce joins</li>
                      <li>• <strong>Duplicating data</strong> across documents for faster reads</li>
                      <li>• <strong>Query-optimized structures</strong> over storage efficiency</li>
                      <li>• <strong>Eventually consistent updates</strong> when data changes</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="integrity" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-blue-500" />
                      SQL Data Integrity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Referential Integrity</h4>
                      <p className="text-sm text-muted-foreground mb-2">Foreign keys enforce relationships</p>
                      <pre className="text-sm bg-muted p-3 rounded-md">
                        <code>{`FOREIGN KEY (user_id) 
  REFERENCES users(id)
  ON DELETE CASCADE
  ON UPDATE RESTRICT`}</code>
                      </pre>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Domain Integrity</h4>
                      <p className="text-sm text-muted-foreground mb-2">Data type and constraint enforcement</p>
                      <pre className="text-sm bg-muted p-3 rounded-md">
                        <code>{`email VARCHAR(255) NOT NULL UNIQUE
age INTEGER CHECK (age >= 0)
status ENUM('active', 'inactive')`}</code>
                      </pre>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Entity Integrity</h4>
                      <p className="text-sm text-muted-foreground mb-2">Primary key constraints</p>
                      <pre className="text-sm bg-muted p-3 rounded-md">
                        <code>{`id INTEGER PRIMARY KEY
-- Ensures uniqueness and non-null`}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-green-500" />
                      NoSQL Data Integrity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Application-Level Validation</h4>
                      <p className="text-sm text-muted-foreground mb-2">Validation logic in application code</p>
                      <pre className="text-sm bg-muted p-3 rounded-md">
                        <code>{`// JavaScript validation
if (!user.email || !isValidEmail(user.email)) {
  throw new Error('Invalid email');
}`}</code>
                      </pre>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Schema Validation</h4>
                      <p className="text-sm text-muted-foreground mb-2">Optional schema enforcement</p>
                      <pre className="text-sm bg-muted p-3 rounded-md">
                        <code>{`// MongoDB schema validation
{
  $jsonSchema: {
    required: ["email", "name"],
    properties: {
      email: { type: "string" },
      age: { type: "integer", minimum: 0 }
    }
  }
}`}</code>
                      </pre>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Eventual Consistency</h4>
                      <p className="text-sm text-muted-foreground mb-2">Trade-offs for performance</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          High availability and performance
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                          Temporary inconsistencies possible
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          Application handles conflicts
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};