import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { UserRound, GraduationCap, School, BookOpen } from "lucide-react";

export default function LoginPage() {
  const [_, setLocation] = useLocation();
  
  const navigate = (path: string) => {
    setLocation(path);
  };
  const { toast } = useToast();
  const [studentLoading, setStudentLoading] = useState(false);
  const [parentLoading, setParentLoading] = useState(false);

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentLoading(true);

    // Simulate login delay
    setTimeout(() => {
      setStudentLoading(false);
      // In a real app, we would check credentials here
      toast({
        title: "Logged in as student",
        description: "Welcome back, Priya!",
      });
      navigate("/student-dashboard");
    }, 1000);
  };

  const handleParentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setParentLoading(true);

    // Simulate login delay
    setTimeout(() => {
      setParentLoading(false);
      // In a real app, we would check credentials here
      toast({
        title: "Logged in as parent",
        description: "Welcome back, Mr. Sharma!",
      });
      navigate("/parent-dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white p-4">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row overflow-hidden bg-white rounded-xl shadow-xl">
        {/* Information Panel */}
        <div className="lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-8 lg:p-12">
          <div className="h-full flex flex-col">
            <div>
              <h1 className="text-3xl font-bold mb-6 flex items-center">
                <BookOpen className="mr-2 h-8 w-8" />
                AI Tutor
              </h1>
              <p className="text-xl mb-8 text-indigo-100 font-light">
                Personalized learning assistant for CBSE Class 12 students
              </p>
            </div>
            
            <div className="flex-grow">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Personalized Learning</h3>
                    <p className="text-indigo-100 text-sm">
                      AI-driven lessons tailored to your learning style and pace
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                    <School className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">CBSE Aligned Curriculum</h3>
                    <p className="text-indigo-100 text-sm">
                      Content designed specifically for CBSE Class 12 syllabus
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                    <UserRound className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Parent Monitoring</h3>
                    <p className="text-indigo-100 text-sm">
                      Track your child's progress with detailed reports and insights
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-auto pt-6">
              <p className="text-indigo-200 text-sm">
                &copy; 2024 AI Tutor. All rights reserved.
              </p>
            </div>
          </div>
        </div>
        
        {/* Login Tabs */}
        <div className="lg:w-1/2 p-6 lg:p-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600 mb-8">Sign in to continue your learning journey</p>
          
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="student" className="text-center py-3">
                <GraduationCap className="mr-2 h-4 w-4" />
                Student
              </TabsTrigger>
              <TabsTrigger value="parent" className="text-center py-3">
                <UserRound className="mr-2 h-4 w-4" />
                Parent
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="student">
              <Card>
                <CardHeader>
                  <CardTitle>Student Login</CardTitle>
                  <CardDescription>
                    Enter your student credentials to access your personalized learning environment.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleStudentLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-email">Email or Student ID</Label>
                      <Input 
                        id="student-email" 
                        type="text" 
                        placeholder="student@example.com" 
                        required 
                        defaultValue="priya.s@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="student-password">Password</Label>
                        <a href="#" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <Input 
                        id="student-password" 
                        type="password" 
                        placeholder="••••••••" 
                        required 
                        defaultValue="password"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button className="w-full" type="submit" disabled={studentLoading}>
                      {studentLoading ? "Signing in..." : "Sign in as Student"}
                    </Button>
                    <div className="text-center text-sm text-gray-600">
                      Don't have an account?{" "}
                      <a href="#" className="text-primary hover:underline">
                        Register here
                      </a>
                    </div>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="parent">
              <Card>
                <CardHeader>
                  <CardTitle>Parent Login</CardTitle>
                  <CardDescription>
                    Enter your parent credentials to monitor your child's progress.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleParentLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="parent-email">Email</Label>
                      <Input 
                        id="parent-email" 
                        type="email" 
                        placeholder="parent@example.com" 
                        required 
                        defaultValue="sharma.parent@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="parent-password">Password</Label>
                        <a href="#" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <Input 
                        id="parent-password" 
                        type="password" 
                        placeholder="••••••••" 
                        required 
                        defaultValue="password"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button className="w-full" type="submit" disabled={parentLoading}>
                      {parentLoading ? "Signing in..." : "Sign in as Parent"}
                    </Button>
                    <div className="text-center text-sm text-gray-600">
                      Don't have an account?{" "}
                      <a href="#" className="text-primary hover:underline">
                        Register here
                      </a>
                    </div>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
