import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { BookOpen, GraduationCap, ArrowRight, PlayCircle } from "lucide-react";
import { subjectsData } from "@/lib/subject-data";

export default function DemoHome() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-12 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Interactive AI Tutor for CBSE Class 12
              </h1>
              <p className="text-lg md:text-xl mb-8 text-indigo-100">
                Personalized learning with our AI tutor. Learn at your own pace with 
                audio lessons, interactive quizzes, and real-time Q&A support.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-indigo-700 hover:bg-indigo-50"
                  asChild
                >
                  <Link href="/demo">
                    <PlayCircle className="mr-2 h-5 w-5" />
                    Try Demo Lesson
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-white border-white hover:bg-white hover:text-indigo-700"
                >
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Explore Curriculum
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-white p-1 rounded-xl shadow-lg transform rotate-3">
                <img 
                  src="https://images.unsplash.com/photo-1659134692680-3fa1c811a9cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fHN0dWRlbnQlMjBsZWFybmluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60" 
                  alt="Student learning with AI tutor" 
                  className="rounded-lg w-full h-auto max-w-md"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Subjects */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Subjects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subjectsData.slice(0, 3).map((subject) => (
              <div key={subject.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-90"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 p-6 rounded-full">
                      <span className="text-5xl text-white">{subject.icon}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{subject.name}</h3>
                  <p className="text-gray-600 mb-4">
                    {subject.topics.length} topics • {subject.topics.reduce((acc, topic) => acc + topic.estimatedDuration, 0)} mins total
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/demo">
                      Browse Topics <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Why Choose AI Tutor?</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Our AI tutoring platform offers a personalized learning experience tailored to your needs
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Personalized Learning</h3>
              <p className="text-gray-600">
                Adaptive content that adjusts to your learning style and pace
              </p>
            </div>
            
            <div className="p-6 rounded-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                <GraduationCap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">CBSE Aligned</h3>
              <p className="text-gray-600">
                All content follows the latest CBSE Class 12 curriculum
              </p>
            </div>
            
            <div className="p-6 rounded-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                <PlayCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Interactive Sessions</h3>
              <p className="text-gray-600">
                Audio lessons, visual aids, and the ability to ask questions anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your learning experience?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-indigo-100">
            Start learning with our AI tutor today and experience the future of education.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-indigo-700 hover:bg-indigo-50"
            asChild
          >
            <Link href="/demo">
              Try Demo Lesson
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">AI Tutor</h3>
              <p className="text-gray-400">
                Revolutionizing education with AI-powered personalized learning.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link href="/demo" className="text-gray-400 hover:text-white">Demo</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <address className="text-gray-400 not-italic">
                <p>Email: info@aitutor.com</p>
                <p>Phone: +91 123 456 7890</p>
                <p>New Delhi, India</p>
              </address>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>© 2024 AI Tutor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
