
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, FileText, BookOpen, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "AI Builder",
      description: "Build custom AI applications with guided workflows",
      icon: Brain,
      href: "/builder",
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Chunk Creator",
      description: "Transform documents into optimized chunks for AI processing",
      icon: FileText,
      href: "/chunks",
      color: "from-green-500 to-teal-600"
    },
    {
      title: "Learning Center",
      description: "Interactive demos and educational content about AI concepts",
      icon: BookOpen,
      href: "/learn",
      color: "from-orange-500 to-red-600"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <Brain className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">AI Development Platform</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Build, learn, and experiment with AI applications through our comprehensive suite of tools and educational resources.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {features.map((feature) => (
            <Card key={feature.title} className="group cursor-pointer hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="flex items-center justify-between">
                  {feature.title}
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate(feature.href)}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">5+</div>
            <div className="text-sm text-muted-foreground">Chunking Strategies</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">10+</div>
            <div className="text-sm text-muted-foreground">AI Models Supported</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-primary mb-1">15+</div>
            <div className="text-sm text-muted-foreground">Interactive Demos</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
