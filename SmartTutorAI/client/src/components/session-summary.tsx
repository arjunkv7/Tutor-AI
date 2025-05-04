import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  CheckCircle,
  ChevronRight,
  Clock,
  FileText,
  GraduationCap,
  PlayCircle,
  PenTool
} from "lucide-react";
import { useState } from "react";

interface SessionSummaryProps {
  subjectName?: string;
  topicName?: string;
  lastSessionDate?: string;
  completion?: number;
  lastConcepts?: string[];
  nextConcepts?: string[];
  totalDuration?: number; // in minutes
  completedDuration?: number; // in minutes
  onResumeSession: () => void;
  onTakeTest: () => void;
  onPracticeExercises: () => void;
  onReviewNotes: () => void;
}

const SessionSummary = ({
  subjectName = "Chemistry",
  topicName = "Solutions and Colligative Properties",
  lastSessionDate = "2 days ago",
  completion = 65,
  lastConcepts = [
    "Introduction to Solutions",
    "Concentration Units",
    "Vapor Pressure Depression",
    "Freezing Point Depression"
  ],
  nextConcepts = [
    "Boiling Point Elevation",
    "Osmotic Pressure",
    "Raoult's Law Applications",
    "Abnormal Molecular Masses"
  ],
  totalDuration = 180,
  completedDuration = 120,
  onResumeSession,
  onTakeTest,
  onPracticeExercises,
  onReviewNotes
}: SessionSummaryProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Calculate remaining minutes
  const remainingDuration = totalDuration - completedDuration;
  const remainingMinutes = remainingDuration > 0 ? remainingDuration : 0;
  
  // Format time for display (e.g., "2h 15m" or "45m")
  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <div className="w-full px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Session Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{topicName}</h1>
                <p className="text-gray-600 mt-1">{subjectName} • CBSE Class 12</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="default"
                  className="flex items-center gap-2"
                  onClick={onResumeSession}
                >
                  <PlayCircle className="h-4 w-4" />
                  Resume Session
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={onTakeTest}
                >
                  <FileText className="h-4 w-4" />
                  Take Test
                </Button>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Progress */}
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Your Progress</h3>
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-14">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">{completion}%</span>
                    </div>
                    <svg className="h-14 w-14" viewBox="0 0 36 36">
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="100"
                        strokeDashoffset={100 - completion}
                        strokeLinecap="round"
                        className="text-primary"
                        transform="rotate(-90 18 18)"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last studied {lastSessionDate}</p>
                    <div className="flex items-center mt-1">
                      <Clock className="text-gray-400 h-4 w-4 mr-1" />
                      <span className="text-sm font-medium text-gray-700">
                        {formatTime(remainingMinutes)} remaining
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Time Invested</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-lg p-3 border border-gray-100">
                    <div className="text-lg font-bold text-gray-800">{formatTime(completedDuration)}</div>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-100">
                    <div className="text-lg font-bold text-gray-800">{formatTime(totalDuration)}</div>
                    <p className="text-xs text-gray-500">Total Duration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="concepts">Concepts</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Last Session Summary */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Last Session Summary</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  In your last session, you covered key concepts related to solutions and colligative properties. 
                  You learned about freezing point depression and its applications in everyday scenarios.
                </p>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Key Concepts Covered:</h3>
                <ul className="space-y-2">
                  {lastConcepts.map((concept, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{concept}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex gap-2">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={onReviewNotes}
                  >
                    <BookOpen className="h-4 w-4" />
                    Review Notes
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={onPracticeExercises}
                  >
                    <PenTool className="h-4 w-4" />
                    Practice Exercises
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Up Next */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Up Next</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  Continue your learning journey with these upcoming concepts. The next session will focus on 
                  boiling point elevation and osmotic pressure.
                </p>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Upcoming Concepts:</h3>
                <ul className="space-y-3">
                  {nextConcepts.map((concept, index) => (
                    <li key={index} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                      <span className="text-gray-700">{concept}</span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button
                    className="w-full flex items-center justify-center gap-2"
                    onClick={onResumeSession}
                  >
                    <PlayCircle className="h-4 w-4" />
                    Start Next Session
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Concepts Tab */}
        {activeTab === "concepts" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Concept Map</h2>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-md font-medium text-gray-800 mb-3">Foundational Concepts</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Introduction to Solutions",
                      "Types of Solutions",
                      "Concentration Units",
                      "Solubility and Factors Affecting It"
                    ].map((concept, index) => (
                      <div key={index} className="p-3 border border-gray-100 rounded-lg flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">{concept}</span>
                        <Badge className="ml-auto" variant="outline">Completed</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium text-gray-800 mb-3">Colligative Properties</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Vapor Pressure Depression",
                      "Freezing Point Depression",
                      "Boiling Point Elevation",
                      "Osmotic Pressure"
                    ].map((concept, index) => (
                      <div key={index} className="p-3 border border-gray-100 rounded-lg flex items-center">
                        <div className={`w-3 h-3 ${index < 2 ? 'bg-green-500' : 'bg-amber-400'} rounded-full mr-3`}></div>
                        <span className="text-gray-700">{concept}</span>
                        <Badge className="ml-auto" variant="outline">
                          {index < 2 ? 'Completed' : 'In Progress'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium text-gray-800 mb-3">Advanced Topics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Raoult's Law Applications",
                      "Abnormal Molecular Masses",
                      "Van't Hoff Factor",
                      "Applications in Daily Life"
                    ].map((concept, index) => (
                      <div key={index} className="p-3 border border-gray-100 rounded-lg flex items-center">
                        <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                        <span className="text-gray-700">{concept}</span>
                        <Badge className="ml-auto" variant="outline">Upcoming</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button
                  className="w-full flex items-center justify-center gap-2"
                  onClick={onResumeSession}
                >
                  <PlayCircle className="h-4 w-4" />
                  Continue Learning
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Activities Tab */}
        {activeTab === "activities" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden col-span-3 md:col-span-1">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <Button
                    className="w-full flex items-center justify-start gap-2 h-auto py-4"
                    onClick={onResumeSession}
                  >
                    <PlayCircle className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Resume Learning</div>
                      <div className="text-xs opacity-90">Continue from where you left off</div>
                    </div>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-start gap-2 h-auto py-4"
                    onClick={onTakeTest}
                  >
                    <FileText className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Take Assessment</div>
                      <div className="text-xs opacity-90">Test your understanding</div>
                    </div>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-start gap-2 h-auto py-4"
                    onClick={onPracticeExercises}
                  >
                    <PenTool className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Practice Exercises</div>
                      <div className="text-xs opacity-90">Solve numerical problems</div>
                    </div>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-start gap-2 h-auto py-4"
                    onClick={onReviewNotes}
                  >
                    <BookOpen className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Review Notes</div>
                      <div className="text-xs opacity-90">Study your session notes</div>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden col-span-3 md:col-span-2">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Learning Analytics</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Concept Mastery</h3>
                    <div className="bg-gray-100 rounded-full h-4 mb-1">
                      <div className="bg-green-500 h-4 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>72% mastery</span>
                      <span>8/12 concepts</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Engagement Score</h3>
                    <div className="bg-gray-100 rounded-full h-4 mb-1">
                      <div className="bg-blue-500 h-4 rounded-full" style={{ width: '86%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>86% engagement</span>
                      <span>High activity</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Study Sessions</h3>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-10 rounded-md ${[
                          3, 5, 7, 10, 14, 17, 20, 21, 25, 27
                        ].includes(i) ? 'bg-primary' : 'bg-gray-100'}`}
                        title={`Day ${i + 1}`}
                      ></div>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-gray-600 text-center">
                    Last 28 days - 10 study sessions completed
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Topic Performance</h3>
                  <div className="space-y-3">
                    {[
                      { topic: "Solutions Basic Concepts", score: 92 },
                      { topic: "Concentration Units", score: 85 },
                      { topic: "Vapor Pressure", score: 78 },
                      { topic: "Freezing Point Depression", score: 65 }
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-700">{item.topic}</span>
                          <span className="text-sm font-medium text-gray-700">{item.score}%</span>
                        </div>
                        <Progress value={item.score} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionSummary;
