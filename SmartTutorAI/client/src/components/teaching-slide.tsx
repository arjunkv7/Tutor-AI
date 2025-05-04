import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeachingSlideProps {
  title: string;
  content: string;
  imageUrl?: string;
  slideNumber: number;
  totalSlides: number;
  onNext?: () => void;
  onPrevious?: () => void;
  className?: string;
}

const TeachingSlide: React.FC<TeachingSlideProps> = ({
  title,
  content,
  imageUrl,
  slideNumber,
  totalSlides,
  onNext,
  onPrevious,
  className = "",
}) => {
  // Process content to find bullet points and highlight key terms
  const processContent = (text: string) => {
    // Split by lines and process each line
    return text.split("\n").map((line, index) => {
      // Check if it's a bullet point
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        return (
          <li key={index} className="ml-5 mb-2">
            {formatTextWithHighlights(line.replace(/^[\-\*]\s+/, ""))}
          </li>
        );
      }
      // Return as paragraph with proper spacing
      return (
        <p key={index} className={line.trim() === "" ? "my-4" : "mb-3"}>
          {formatTextWithHighlights(line)}
        </p>
      );
    });
  };

  // Format text to highlight terms in quotes or bold
  const formatTextWithHighlights = (text: string) => {
    // Regex to match text in quotes or with asterisks/underscores
    const segments = text.split(/("[^"]+"|\*[^\*]+\*|_[^_]+_)/);
    
    return segments.map((segment, i) => {
      if (segment.startsWith('"') && segment.endsWith('"')) {
        // Text in quotes
        return (
          <span key={i} className="text-indigo-300 font-medium">
            {segment}
          </span>
        );
      } else if (
        (segment.startsWith('*') && segment.endsWith('*')) ||
        (segment.startsWith('_') && segment.endsWith('_'))
      ) {
        // Bold/emphasized text
        return (
          <span key={i} className="font-semibold text-amber-300">
            {segment.substring(1, segment.length - 1)}
          </span>
        );
      }
      // Regular text
      return <span key={i}>{segment}</span>;
    });
  };

  return (
    <div className={`bg-white bg-opacity-10 rounded-xl overflow-hidden ${className}`}>
      {/* Header with slide info */}
      <div className="bg-indigo-700 bg-opacity-40 px-6 py-3 flex justify-between items-center">
        <h3 className="text-white font-semibold text-lg">{title}</h3>
        <div className="text-indigo-200 text-sm">
          Slide {slideNumber} of {totalSlides}
        </div>
      </div>

      {/* Content area */}
      <div className="p-6 text-white">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Text content */}
          <div className="flex-1">{processContent(content)}</div>

          {/* Image if provided */}
          {imageUrl && (
            <div className="w-full md:w-2/5 flex-shrink-0">
              <div className="bg-white rounded-lg overflow-hidden">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-auto"
                />
                <div className="p-2 bg-white text-gray-700 text-sm text-center">
                  Figure: {title}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation controls */}
      <div className="px-6 py-3 bg-indigo-900 bg-opacity-30 flex justify-between">
        <Button
          variant="ghost"
          onClick={onPrevious}
          disabled={slideNumber <= 1}
          className="text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Previous
        </Button>

        <Button
          variant="ghost"
          onClick={onNext}
          disabled={slideNumber >= totalSlides}
          className="text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          Next <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TeachingSlide;
