import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  LineChart, 
  Wallet, 
  BookOpen, 
  BarChart3, 
  Clock, 
  Calendar,
  User,
  Settings,
  LogOut,
  Bell
} from "lucide-react";
import { userProgressData } from "@/lib/subject-data";

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
  const studentName = "Priya Sharma";
  const studentClass = "Class 12 - Science";
  
  const recentActivities = [
    { date: "Today", activity: "Completed Physics quiz on Current Electricity", time: "2 hours ago" },
    { date: "Today", activity: "Studied Chemistry lesson on Solutions", time: "5 hours ago" },
    { date: "Yesterday", activity: "Asked 8 questions in Mathematics session", time: "1 day ago" },
    { date: "Feb 28", activity: "Completed weekly assessment in Chemistry", time: "3 days ago" },
  ];
  
  const upcomingTests = [
    { subject: "Physics", topic: "AC Circuits", date: "Mar 5, 2024", time: "10:00 AM" },
    { subject: "Chemistry", topic: "Electrochemistry", date: "Mar 8, 2024", time: "11:30 AM" },
    { subject: "Mathematics", topic: "Differential Equations", date: "Mar 10, 2024", time: "2:00 PM" },
  ];
  
  const attendanceData = {
    present: 42,
    absent: 3,
    late: 5,
    total: 50,
    percentage: 84
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-800 mr-6">AI Tutor <span className="text-gray-500 text-base font-normal">Parent Dashboard</span></h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">3</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-5 w-5 text-gray-600" />
            </Button>
            <div className="flex items-center">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" 
                alt="Parent Profile" 
                className="w-9 h-9 rounded-full object-cover border-2 border-white"
              />
              <div className="ml-2 hidden md:block">
                <p className="text-sm font-medium text-gray-800">Mr. Sharma</p>
                <p className="text-xs text-gray-500">Parent</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">Welcome, Mr. Sharma</h2>
            <p className="text-gray-600">Here's your child's progress overview</p>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-3">
            <Button variant="outline" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
            <Button>
              <BarChart3 className="mr-2 h-4 w-4" />
              View Reports
            </Button>
          </div>
        </div>
        
        {/* Student Overview Card */}
        <Card className="mb-6">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg">Student Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <div className="flex items-center mb-4 md:mb-0 md:mr-8">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" 
                  alt="Student Profile" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-white mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{studentName}</h3>
                  <p className="text-gray-600">{studentClass}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full md:w-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-1">{userProgressData.overall}%</div>
                  <p className="text-sm text-gray-600">Overall Progress</p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">{attendanceData.percentage}%</div>
                  <p className="text-sm text-gray-600">Attendance</p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-1">73%</div>
                  <p className="text-sm text-gray-600">Avg. Score</p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">86%</div>
                  <p className="text-sm text-gray-600">Engagement</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Tabs */}
        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Tab Content */}
        <div>
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Subject Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-primary" />
                    Subject Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(userProgressData.subjects).map(([subject, progress]) => (
                      <div key={subject}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">{subject}</span>
                          <span className="text-sm font-medium text-primary">{progress}%</span>
                        </div>
                        <Progress value={progress as number} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-sm font-medium text-gray-800">{activity.activity}</span>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                        <p className="text-xs text-gray-500">{activity.date}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Upcoming Tests */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-primary" />
                    Upcoming Tests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingTests.map((test, index) => (
                      <div key={index} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-sm font-medium text-gray-800">{test.subject}: {test.topic}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-gray-500">{test.date} at {test.time}</p>
                          <Button variant="outline" size="sm" className="h-7 text-xs">Set Reminder</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Areas for Improvement */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <BarChart className="mr-2 h-5 w-5 text-primary" />
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">Chemistry - Electrochemistry</span>
                        <span className="text-sm font-medium text-amber-600">58%</span>
                      </div>
                      <Progress value={58} className="h-2 bg-gray-100" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">Physics - Electromagnetic Waves</span>
                        <span className="text-sm font-medium text-amber-600">62%</span>
                      </div>
                      <Progress value={62} className="h-2 bg-gray-100" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">Mathematics - Integration</span>
                        <span className="text-sm font-medium text-amber-600">65%</span>
                      </div>
                      <Progress value={65} className="h-2 bg-gray-100" />
                    </div>
                    
                    <div className="mt-4">
                      <Button variant="outline" className="w-full">Schedule Tutoring Sessions</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Performance Tab - Just placeholder for now */}
          {activeTab === "performance" && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <BarChart3 className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Performance Analytics</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Detailed performance metrics and test scores will be available here.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Attendance Tab - Just placeholder for now */}
          {activeTab === "attendance" && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <User className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Attendance Records</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Detailed attendance records and session participation will be available here.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-gray-800">AI Tutor</h3>
              <p className="text-sm text-gray-600 mt-1">Parent monitoring dashboard</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">© 2024 AI Tutor. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
