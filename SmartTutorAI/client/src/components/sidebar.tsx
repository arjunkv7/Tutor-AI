import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ChevronRight, ChevronDown, Search, Bell, Settings, 
  FlaskRound, TestTubeDiagonal, Calculator, BookOpen, Dna, Clock
} from "lucide-react";
import { userProgressData, recentSessionsData } from "@/lib/subject-data";

interface SidebarProps {
  collapsed?: boolean;
  toggleSidebar?: () => void;
  showStudentProgress?: boolean;
}

interface SubjectProps {
  name: string;
  icon: string;
  isOpen: boolean;
  isActive: boolean;
  toggleOpen: () => void;
  children?: React.ReactNode;
}

const SubjectItem: React.FC<SubjectProps> = ({ 
  name, 
  icon, 
  isOpen, 
  isActive, 
  toggleOpen, 
  children 
}) => {
  const getIcon = () => {
    switch (icon) {
      case "flask": return <FlaskRound className="w-4 h-4" />;
      case "vial": return <TestTubeDiagonal className="w-4 h-4" />;
      case "calculator": return <Calculator className="w-4 h-4" />;
      case "dna": return <Dna className="w-4 h-4" />;
      case "book": return <BookOpen className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="mb-4">
      <button 
        onClick={toggleOpen}
        className={`flex items-center justify-between w-full px-3 py-2 text-left font-medium rounded-lg transition-colors hover:bg-gray-100 ${
          isActive || isOpen ? "bg-gray-100 text-primary" : "text-gray-800"
        }`}
      >
        <div className="flex items-center">
          <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-100 text-primary">
            {getIcon()}
          </span>
          <span className="ml-3">{name}</span>
        </div>
        {isOpen ? (
          <ChevronDown className="text-gray-400 h-4 w-4 transition-transform" />
        ) : (
          <ChevronRight className="text-gray-400 h-4 w-4 transition-transform" />
        )}
      </button>
      
      {isOpen && children && (
        <div className="mt-2 pl-12">
          {children}
        </div>
      )}
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, toggleSidebar, showStudentProgress = true }) => {
  const [openSubject, setOpenSubject] = useState<number | null>(2); // Default open subject is Chemistry
  const [location] = useLocation();
  
  // Fetch subjects and topics
  const { data: subjects, isLoading } = useQuery({
    queryKey: ["/api/subjects"],
    initialData: [], // We'll show a loading state instead of empty data
  });
  
  // Fetch recent sessions
  const { data: recentSessions } = useQuery({
    queryKey: ["/api/users/1/sessions/recent"],
    initialData: recentSessionsData, // Use mock data until API returns real data
  });
  
  // Fetch user progress
  const { data: userProgress } = useQuery({
    queryKey: ["/api/users/1/progress"],
    initialData: userProgressData, // Use mock data until API returns real data
  });

  const toggleSubject = (subjectId: number) => {
    setOpenSubject(openSubject === subjectId ? null : subjectId);
  };

  const getIcon = (icon: string) => {
    switch (icon) {
      case "flask": return <FlaskRound className="w-4 h-4" />;
      case "vial": return <TestTubeDiagonal className="w-4 h-4" />;
      case "calculator": return <Calculator className="w-4 h-4" />;
      case "dna": return <Dna className="w-4 h-4" />;
      case "book": return <BookOpen className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  if (collapsed) {
    return (
      <div className="bg-white shadow-lg w-20 flex-shrink-0 transition-all duration-300 overflow-y-auto z-20">
        {/* Collapsed sidebar content */}
        <div className="p-4 border-b border-gray-200 flex justify-center">
          <button className="text-primary font-bold">AI</button>
        </div>
        
        <div className="p-4 flex flex-col items-center space-y-6">
          {!isLoading && subjects.map((subject: any) => (
            <button 
              key={subject.id}
              className={`w-12 h-12 rounded-lg ${
                openSubject === subject.id ? "bg-primary text-white" : "bg-indigo-100 text-primary"
              } flex items-center justify-center`}
              onClick={() => toggleSubject(subject.id)}
            >
              {getIcon(subject.icon)}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg w-72 flex-shrink-0 transition-all duration-300 overflow-hidden z-20">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">AI Tutor</h1>
          <div className="flex space-x-2">
            <button className="text-gray-500 hover:text-primary focus:outline-none">
              <Bell className="h-5 w-5" />
            </button>
            <button className="text-gray-500 hover:text-primary focus:outline-none">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="mt-4 relative">
          <Input 
            type="text" 
            placeholder="Search subjects or topics..." 
            className="w-full pr-8"
          />
          <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
        </div>
      </div>
      
      {/* User Profile Summary */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" 
            alt="Profile" 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-800">Priya Sharma</h3>
            <p className="text-xs text-gray-500">CBSE 12 - Science</p>
          </div>
          <div className="ml-auto">
            <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">Online</span>
          </div>
        </div>
        
        {/* Overall Progress */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-gray-700">Overall Progress</span>
            <span className="text-xs font-medium text-primary">{userProgress.overall}%</span>
          </div>
          <Progress value={userProgress.overall} className="h-2" />
        </div>
      </div>
      
      {/* Subject Navigation */}
      <ScrollArea className="flex-1 h-[calc(100vh-360px)]">
        <div className="p-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Subjects</h2>
          
          {isLoading ? (
            <div className="py-4 text-center text-gray-500">Loading subjects...</div>
          ) : (
            subjects.map((subject: any) => (
              <SubjectItem
                key={subject.id}
                name={subject.name}
                icon={subject.icon}
                isOpen={openSubject === subject.id}
                isActive={location.includes(`/subject/${subject.id}`)}
                toggleOpen={() => toggleSubject(subject.id)}
              >
                {subject.topics?.map((topic: any) => (
                  <Link 
                    key={topic.id}
                    href={`/session/${topic.id}`}
                    className={`block py-2 px-3 text-sm rounded-md hover:bg-gray-100 hover:text-primary ${
                      location === `/session/${topic.id}` 
                        ? "bg-indigo-50 text-primary font-medium" 
                        : "text-gray-700"
                    }`}
                  >
                    {topic.name}
                  </Link>
                ))}
              </SubjectItem>
            ))
          )}
        </div>
      </ScrollArea>
      
      {/* Recent Sessions */}
      <div className="p-4 border-t border-gray-200">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Recent Sessions</h2>
        
        {recentSessions.length === 0 ? (
          <div className="text-center text-gray-500 text-sm py-2">No recent sessions</div>
        ) : (
          recentSessions.map((session: any) => (
            <div key={session.id} className="flex items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center text-primary">
                {session.subjectIcon === "vial" ? (
                  <TestTubeDiagonal className="h-4 w-4" />
                ) : (
                  <FlaskRound className="h-4 w-4" />
                )}
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-800">{session.topic}</h3>
                <p className="text-xs text-gray-500">{session.subject} • {session.timeAgo}</p>
                <div className="mt-1 flex items-center">
                  <Progress value={session.progress} className="h-1.5 w-full" />
                  <span className="ml-2 text-xs text-gray-600">{session.progress}%</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
