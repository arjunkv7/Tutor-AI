import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { 
  Search, Bell, Settings, 
  Book, BookOpen, ChevronRight, 
  FlaskRound, TestTubeDiagonal, Calculator, Dna
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { subjectsData, userProgressData } from "@/lib/subject-data";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Fetch subjects data
  const { data: subjects, isLoading: isLoadingSubjects } = useQuery({
    queryKey: ["/api/subjects"],
    initialData: subjectsData, // Use mock data until API returns real data
  });

  // Fetch recent sessions
  const { data: recentSessions, isLoading: isLoadingRecent } = useQuery({
    queryKey: ["/api/users/1/sessions/recent"],
    initialData: [
      {
        id: 1,
        subject: "Chemistry",
        subjectIcon: "vial",
        topic: "Solutions and Colligative Properties",
        progress: 75,
        timeAgo: "2 days ago",
        lastContent: "We covered freezing point depression and its applications in everyday scenarios."
      },
      {
        id: 2,
        subject: "Physics",
        subjectIcon: "flask",
        topic: "Current Electricity",
        progress: 60,
        timeAgo: "4 days ago",
        lastContent: "We explored Ohm's law and resistors in series and parallel configurations."
      },
      {
        id: 3,
        subject: "Mathematics",
        subjectIcon: "calculator",
        topic: "Calculus - Integration",
        progress: 40,
        timeAgo: "1 week ago",
        lastContent: "We practiced various integration techniques including substitution method."
      }
    ]
  });
  
  // Fetch user progress
  const { data: userProgress } = useQuery({
    queryKey: ["/api/users/1/progress"],
    initialData: userProgressData, // Use mock data until API returns real data
  });
  
  // Filter subjects based on search term
  const filteredSubjects = subjects.filter(
    (subject: any) => 
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.topics.some((topic: any) => 
        topic.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );
  
  const getSubjectIcon = (icon: string) => {
    switch (icon) {
      case "flask": return <FlaskRound className="h-5 w-5" />;
      case "vial": return <TestTubeDiagonal className="h-5 w-5" />;
      case "calculator": return <Calculator className="h-5 w-5" />;
      case "dna": return <Dna className="h-5 w-5" />;
      case "book": return <BookOpen className="h-5 w-5" />;
      default: return <Book className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-800 mr-6">AI Tutor</h1>
            <div className="relative hidden md:block w-64">
              <Input 
                type="text" 
                placeholder="Search subjects or topics..." 
                className="pr-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-5 w-5 text-gray-600" />
            </Button>
            <div className="flex items-center">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" 
                alt="Profile" 
                className="w-9 h-9 rounded-full object-cover border-2 border-white"
              />
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Search (visible only on small screens) */}
      <div className="md:hidden bg-white px-4 py-2 shadow-sm">
        <div className="relative">
          <Input 
            type="text" 
            placeholder="Search subjects or topics..." 
            className="pr-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Welcome and Progress Section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Welcome back, Priya!</h2>
                <p className="text-gray-600 mt-1">Continue your learning journey</p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-3">
                <Button className="bg-primary hover:bg-indigo-600">
                  Resume Last Session
                </Button>
                <Button variant="outline">
                  Take Practice Test
                </Button>
              </div>
            </div>
            
            <h3 className="text-lg font-medium text-gray-800 mb-4">Your Progress</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {Object.entries(userProgress.subjects).map(([subject, progress]) => (
                <div key={subject} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{subject}</span>
                    <span className="text-sm font-medium text-primary">{progress}%</span>
                  </div>
                  <Progress value={progress as number} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Subjects Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Subjects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoadingSubjects ? (
              // Loading skeleton
              Array(6).fill(0).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : filteredSubjects.length === 0 ? (
              <div className="col-span-3 text-center py-12">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800">No subjects found</h3>
                <p className="text-gray-600 mt-1">Try a different search term</p>
              </div>
            ) : (
              filteredSubjects.map((subject: any) => (
                <Card key={subject.id} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-white">
                    <div className="flex items-center mb-1">
                      <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-100 text-primary">
                        {getSubjectIcon(subject.icon)}
                      </span>
                      <CardTitle className="ml-2">{subject.name}</CardTitle>
                    </div>
                    <CardDescription>CBSE Class 12</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-600 mb-4">{subject.description || `Study of ${subject.name.toLowerCase()} as per CBSE Class 12 curriculum`}</p>
                    
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Topics:</h4>
                    <ul className="space-y-1">
                      {subject.topics.slice(0, 3).map((topic: any) => (
                        <li key={topic.id} className="text-sm text-gray-600">• {topic.name}</li>
                      ))}
                      {subject.topics.length > 3 && (
                        <li className="text-sm text-gray-500">• {subject.topics.length - 3} more topics</li>
                      )}
                    </ul>
                  </CardContent>
                  <CardFooter className="bg-gray-50 border-t">
                    <Link href={`/session/${subject.topics[0]?.id || 1}`} className="w-full">
                      <Button variant="default" className="w-full">
                        Start Learning
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
        
        {/* Educational Resources Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Educational Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Study Tips & Techniques</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Students studying" 
                  className="w-full h-40 object-cover rounded-md mb-3" 
                />
                <p className="text-sm text-gray-600">Learn effective study methods to improve retention and understanding.</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="text-primary">View Tips</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Mock Test Series</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src="https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Exam preparation" 
                  className="w-full h-40 object-cover rounded-md mb-3" 
                />
                <p className="text-sm text-gray-600">Practice with comprehensive mock tests designed for CBSE Class 12.</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="text-primary">Take a Test</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Expert Video Lectures</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src="https://images.unsplash.com/photo-1610484826967-09c5720778c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Virtual classroom" 
                  className="w-full h-40 object-cover rounded-md mb-3" 
                />
                <p className="text-sm text-gray-600">Watch detailed explanation videos by subject matter experts.</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="text-primary">Watch Videos</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Recent Sessions</h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
            {isLoadingRecent ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : recentSessions.length === 0 ? (
              <div className="text-center py-8">
                <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <BookOpen className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800">No recent activity</h3>
                <p className="text-gray-600 mt-1">Start a tutoring session to track your activity</p>
                <Button className="mt-4">Start Learning</Button>
              </div>
            ) : (
              <div className="space-y-8">
                {recentSessions.map((session: any) => (
                  <div key={session.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center text-primary">
                          {session.subjectIcon === "vial" ? <TestTubeDiagonal className="h-4 w-4" /> : <FlaskRound className="h-4 w-4" />}
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="text-md font-medium text-gray-800">{session.topic}</h3>
                              <p className="text-sm text-gray-500">{session.subject} • {session.timeAgo}</p>
                            </div>
                            <div className="flex items-center">
                              <div className="mr-4">
                                <span className="text-xs font-medium text-gray-600">Completion:</span>
                                <span className="ml-1 text-sm font-medium text-primary">{session.progress}%</span>
                              </div>
                              <Link href={`/session/${session.id}`}>
                                <Button variant="default" size="sm" className="text-white">
                                  Continue <ChevronRight className="h-3 w-3 ml-1" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                          <div className="mt-2">
                            <Progress value={session.progress} className="h-1.5 w-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Last Session Summary:</h4>
                      <p className="text-sm text-gray-600">{session.lastContent}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Link href={`/session/${session.id}`}>
                          <Button variant="default" size="sm">
                            Continue Learning
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          Review Notes
                        </Button>
                        <Button variant="outline" size="sm">
                          Take Practice Quiz
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-gray-800">AI Tutor</h3>
              <p className="text-sm text-gray-600 mt-1">Interactive learning for CBSE Class 12</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">© 2024 AI Tutor. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
