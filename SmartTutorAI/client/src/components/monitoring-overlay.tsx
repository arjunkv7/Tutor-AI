import { useState } from "react";
import { X, ArrowUp, ArrowDown, Minus, AlertCircle } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface MonitoringOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  sessionData: {
    duration: string;
    engagementScore: number;
    questionsAsked: number;
    conceptMastery: number;
  };
}

const MonitoringOverlay: React.FC<MonitoringOverlayProps> = ({
  isOpen,
  onClose,
  sessionData
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for the monitoring overlay based on design reference
  const mockChartData = Array(12).fill(0).map((_, i) => ({
    time: `${i * 3}min`,
    value: 40 + Math.floor(Math.random() * 55)
  }));

  const attentionMetrics = [
    { name: "Visual Focus", value: 92, color: "bg-green-500" },
    { name: "Audio Engagement", value: 87, color: "bg-green-500" },
    { name: "Response Time", value: 75, color: "bg-yellow-500" },
    { name: "Question Quality", value: 83, color: "bg-green-500" },
    { name: "Note-Taking", value: 68, color: "bg-yellow-500" }
  ];

  const conceptUnderstanding = {
    "Solution Concepts": [
      { name: "Definition & Types", value: 95, color: "bg-green-500" },
      { name: "Concentration Terms", value: 82, color: "bg-green-500" },
      { name: "Solubility", value: 78, color: "bg-yellow-500" }
    ],
    "Colligative Properties": [
      { name: "Vapor Pressure Lowering", value: 65, color: "bg-yellow-500" },
      { name: "Boiling Point Elevation", value: 70, color: "bg-yellow-500" },
      { name: "Freezing Point Depression", value: 48, color: "bg-red-500" }
    ]
  };

  const recentQuestions = [
    {
      question: "Can you explain depression of freezing point and its use in molecular weight determination?",
      time: "2:46 PM",
      complexity: 3,
      tag: { label: "Key Concept", color: "bg-green-100 text-green-800" }
    },
    {
      question: "What are the applications of colligative properties in daily life?",
      time: "2:38 PM",
      complexity: 2,
      tag: { label: "Application", color: "bg-blue-100 text-blue-800" }
    },
    {
      question: "Can you solve an example problem of freezing point depression?",
      time: "2:32 PM",
      complexity: 4,
      tag: { label: "Problem Solving", color: "bg-purple-100 text-purple-800" }
    }
  ];

  const learningStyle = {
    visual: 85,
    auditory: 75,
    reading: 60,
    kinesthetic: 40
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="p-4 border-b border-gray-200 flex justify-between items-center">
          <DialogTitle className="text-xl font-semibold text-gray-800">Student Monitoring</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Session Overview */}
            <div className="col-span-3 bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Current Session Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-500">Session Duration</p>
                  <p className="text-2xl font-semibold text-gray-800">{sessionData.duration}</p>
                  <div className="mt-2 text-xs text-green-600 flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    <span>18% above average</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-500">Engagement Score</p>
                  <p className="text-2xl font-semibold text-gray-800">{sessionData.engagementScore}%</p>
                  <div className="mt-2 text-xs text-green-600 flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    <span>5% improvement</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-500">Questions Asked</p>
                  <p className="text-2xl font-semibold text-gray-800">{sessionData.questionsAsked}</p>
                  <div className="mt-2 text-xs text-yellow-600 flex items-center">
                    <Minus className="h-3 w-3 mr-1" />
                    <span>Same as average</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-500">Concept Mastery</p>
                  <p className="text-2xl font-semibold text-gray-800">{sessionData.conceptMastery}%</p>
                  <div className="mt-2 text-xs text-red-600 flex items-center">
                    <ArrowDown className="h-3 w-3 mr-1" />
                    <span>Needs review</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Engagement Graph */}
            <div className="col-span-2 bg-white rounded-lg p-4 shadow-sm">
              <h3 className="text-md font-medium text-gray-800 mb-4">Engagement Over Time</h3>
              <div className="h-64 w-full">
                {/* Simplified chart representation */}
                <div className="h-full w-full bg-gray-50 rounded relative overflow-hidden">
                  <div className="absolute inset-0 flex items-end justify-between px-2">
                    {mockChartData.map((item, i) => (
                      <div 
                        key={i} 
                        className="h-[0%] w-6 bg-primary transition-all duration-1000 ease-in-out" 
                        style={{ height: `${item.value}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-4 text-xs text-gray-500">
                <div>5 min</div>
                <div>15 min</div>
                <div>25 min</div>
                <div className="text-right">35 min</div>
              </div>
            </div>
            
            {/* Attention Analysis */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="text-md font-medium text-gray-800 mb-4">Attention Analysis</h3>
              <div className="space-y-3">
                {attentionMetrics.map((metric) => (
                  <div key={metric.name}>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>{metric.name}</span>
                      <span className="font-medium">{metric.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${metric.color} rounded-full h-2`} style={{ width: `${metric.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 bg-indigo-50 p-3 rounded-lg">
                <p className="text-sm text-gray-800">
                  <span className="font-medium">AI Insight:</span> Student shows strong visual focus but could improve note-taking habits. Consider suggesting structured note templates.
                </p>
              </div>
            </div>
            
            {/* Concept Understanding */}
            <div className="col-span-2 bg-white rounded-lg p-4 shadow-sm">
              <h3 className="text-md font-medium text-gray-800 mb-4">Concept Understanding</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(conceptUnderstanding).map(([section, metrics]) => (
                  <div key={section}>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">{section}</h4>
                    <div className="space-y-2">
                      {metrics.map((metric) => (
                        <div key={metric.name}>
                          <div className="flex justify-between mb-1 text-xs">
                            <span>{metric.name}</span>
                            <span>{metric.value}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className={`${metric.color} rounded-full h-1.5`} style={{ width: `${metric.value}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Recommended Focus Areas</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Freezing Point Depression</span>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Vapor Pressure Lowering</span>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Molecular Weight Calculation</span>
                </div>
              </div>
            </div>
            
            {/* Learning Style */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="text-md font-medium text-gray-800 mb-4">Learning Style Analysis</h3>
              <div className="flex items-center justify-center">
                {/* Radar chart representation */}
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Background shape */}
                    <polygon points="50,10 90,50 50,90 10,50" fill="rgba(79, 70, 229, 0.1)" stroke="#4F46E5" strokeWidth="0.5" />
                    
                    {/* Data points */}
                    <polygon 
                      points={`50,${10 + (90 - 10) * (1 - learningStyle.visual / 100)} ${
                      90 - (90 - 10) * learningStyle.auditory / 100},50 50,${
                      90 - (90 - 10) * (1 - learningStyle.reading / 100)} ${
                      10 + (90 - 10) * learningStyle.kinesthetic / 100},50`} 
                      fill="rgba(79, 70, 229, 0.6)" 
                      stroke="#4F46E5" 
                      strokeWidth="1.5" 
                    />
                    
                    {/* Labels */}
                    <text x="50" y="5" textAnchor="middle" fill="#4F46E5" fontSize="8">Visual</text>
                    <text x="95" y="50" textAnchor="start" fill="#4F46E5" fontSize="8">Auditory</text>
                    <text x="50" y="95" textAnchor="middle" fill="#4F46E5" fontSize="8">Reading</text>
                    <text x="5" y="50" textAnchor="end" fill="#4F46E5" fontSize="8">Kinesthetic</text>
                  </svg>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-indigo-600 rounded-full mr-2"></span>
                  <span>Visual: {learningStyle.visual}%</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-indigo-600 rounded-full mr-2"></span>
                  <span>Auditory: {learningStyle.auditory}%</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-indigo-600 rounded-full mr-2"></span>
                  <span>Reading: {learningStyle.reading}%</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-indigo-600 rounded-full mr-2"></span>
                  <span>Kinesthetic: {learningStyle.kinesthetic}%</span>
                </div>
              </div>
            </div>
            
            {/* Recent Questions */}
            <div className="col-span-3 bg-white rounded-lg p-4 shadow-sm">
              <h3 className="text-md font-medium text-gray-800 mb-4">Recent Questions & Interactions</h3>
              <div className="space-y-3">
                {recentQuestions.map((question, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-800">"{question.question}"</p>
                      <span className="text-xs text-gray-500">{question.time}</span>
                    </div>
                    <div className="mt-1 flex items-center">
                      <span className="text-xs text-gray-500 mr-2">Complexity:</span>
                      <div className="flex items-center">
                        {Array(5).fill(0).map((_, i) => (
                          <svg 
                            key={i}
                            xmlns="http://www.w3.org/2000/svg" 
                            width="12" 
                            height="12" 
                            viewBox="0 0 24 24" 
                            fill={i < question.complexity ? "currentColor" : "none"}
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            className={i < question.complexity ? "text-amber-500" : "text-gray-300"}
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        ))}
                      </div>
                      <span className={`ml-auto text-xs ${question.tag.color} px-2 py-0.5 rounded-full`}>{question.tag.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="border-t border-gray-200 p-4 flex justify-between items-center">
          <div>
            <Button variant="outline" className="text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Export Report</span>
            </Button>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" className="text-gray-600 hover:text-primary">Set Learning Goals</Button>
            <Button variant="default">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
              <span>Customize Learning Path</span>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MonitoringOverlay;
