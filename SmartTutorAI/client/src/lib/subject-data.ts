export type Subject = {
  id: number;
  name: string;
  icon: string;
  topics: Topic[];
};

export type Topic = {
  id: number;
  name: string;
  estimatedDuration: number; // in minutes
  description?: string;
};

// This data will be fetched from the API in production
// Using static data for layout during development
export const subjectsData: Subject[] = [
  {
    id: 1,
    name: "Physics",
    icon: "flask",
    topics: [
      { id: 1, name: "Electrostatics", estimatedDuration: 45, description: "Study of electric charges at rest" },
      { id: 2, name: "Current Electricity", estimatedDuration: 60, description: "Study of electric charges in motion" },
      { id: 3, name: "Magnetic Effects", estimatedDuration: 45, description: "Study of magnetic fields and their effects" }
    ]
  },
  {
    id: 2,
    name: "Chemistry",
    icon: "vial",
    topics: [
      { id: 4, name: "Solid State", estimatedDuration: 40, description: "Study of solid crystalline forms" },
      { id: 5, name: "Solutions", estimatedDuration: 45, description: "Study of homogeneous mixtures" },
      { id: 6, name: "Electrochemistry", estimatedDuration: 50, description: "Study of electricity and chemical reactions" },
      { id: 7, name: "Chemical Kinetics", estimatedDuration: 55, description: "Study of rates of chemical reactions" }
    ]
  },
  {
    id: 3,
    name: "Mathematics",
    icon: "calculator",
    topics: [
      { id: 8, name: "Relations and Functions", estimatedDuration: 60, description: "Study of relationships between sets" },
      { id: 9, name: "Inverse Trigonometric Functions", estimatedDuration: 45, description: "Study of inverse trigonometric functions" },
      { id: 10, name: "Matrices", estimatedDuration: 50, description: "Study of arrays of numbers arranged in rows and columns" },
      { id: 11, name: "Determinants", estimatedDuration: 40, description: "Study of special numbers calculated from square matrices" }
    ]
  },
  {
    id: 4,
    name: "Biology",
    icon: "dna",
    topics: [
      { id: 12, name: "Reproduction in Organisms", estimatedDuration: 45, description: "Study of reproduction processes in living organisms" },
      { id: 13, name: "Genetics and Evolution", estimatedDuration: 60, description: "Study of heredity and changes in organisms over time" },
      { id: 14, name: "Biology in Human Welfare", estimatedDuration: 50, description: "Study of biological applications for human benefit" }
    ]
  },
  {
    id: 5,
    name: "English",
    icon: "book",
    topics: [
      { id: 15, name: "Flamingo - Prose", estimatedDuration: 45, description: "Study of prose from Flamingo textbook" },
      { id: 16, name: "Flamingo - Poetry", estimatedDuration: 40, description: "Study of poetry from Flamingo textbook" },
      { id: 17, name: "Vistas", estimatedDuration: 45, description: "Study of supplementary reader Vistas" }
    ]
  }
];

export const recentSessionsData = [
  { 
    id: 1,
    subject: "Chemistry", 
    topic: "Solutions - Colligative Properties", 
    subjectIcon: "vial",
    timeAgo: "35 min ago", 
    progress: 75
  },
  { 
    id: 2,
    subject: "Physics", 
    topic: "Current Electricity - Ohm's Law", 
    subjectIcon: "flask",
    timeAgo: "Yesterday", 
    progress: 100
  },
];

export const userProgressData = {
  overall: 68,
  subjects: {
    "Physics": 75,
    "Chemistry": 62,
    "Mathematics": 58,
    "Biology": 70,
    "English": 80
  }
};
