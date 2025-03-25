import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Monitor, Terminal, Database, Cloud, Code2, Server, 
  Cpu, Globe, Shield, Wifi, GitBranch, Bug, Network,
  Layers, Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Question {
  id: number;
  term: string;
  icon: JSX.Element;
  options: string[];
  correct: string;
  image: string;
  explanation: string;
}

const baseQuestions: Question[] = [
  {
    id: 1,
    term: 'API',
    icon: <Code2 className="w-8 h-8" />,
    options: [
      'Advanced Program Installation',
      'Application Programming Interface',
      'Automated Process Integration',
      'Application Process Index'
    ],
    correct: 'Application Programming Interface',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=2128&ixlib=rb-4.0.3',
    explanation: 'APIs allow different software applications to communicate with each other.'
  },
  {
    id: 2,
    term: 'Docker',
    icon: <Server className="w-8 h-8" />,
    options: [
      'Database System',
      'Web Browser',
      'Container Platform',
      'Programming Language'
    ],
    correct: 'Container Platform',
    image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&q=80&w=2071&ixlib=rb-4.0.3',
    explanation: 'Docker packages applications and their dependencies into containers for consistent deployment.'
  },
  {
    id: 3,
    term: 'DevOps',
    icon: <GitBranch className="w-8 h-8" />,
    options: [
      'Development Operations',
      'Device Operations',
      'Development and Operations',
      'Developer Options'
    ],
    correct: 'Development and Operations',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
    explanation: 'DevOps combines software development and IT operations to shorten development cycles and provide continuous delivery.'
  },
  {
    id: 4,
    term: 'CRUD',
    icon: <Database className="w-8 h-8" />,
    options: [
      'Create Read Update Delete',
      'Computer Resource Usage Data',
      'Control Resource Under Development',
      'Custom Resource Update Definition'
    ],
    correct: 'Create Read Update Delete',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=2071&ixlib=rb-4.0.3',
    explanation: 'CRUD represents the four basic operations performed on database data: Create, Read, Update, and Delete.'
  },
  {
    id: 5,
    term: 'JWT',
    icon: <Lock className="w-8 h-8" />,
    options: [
      'Java Web Token',
      'JSON Web Token',
      'JavaScript Worker Thread',
      'Joint Web Technology'
    ],
    correct: 'JSON Web Token',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
    explanation: 'JWT is a compact, URL-safe means of representing claims between two parties, commonly used for authentication.'
  },
  {
    id: 6,
    term: 'ORM',
    icon: <Layers className="w-8 h-8" />,
    options: [
      'Object-Relational Mapping',
      'Online Resource Management',
      'Operational Risk Monitor',
      'Output Response Model'
    ],
    correct: 'Object-Relational Mapping',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2034&ixlib=rb-4.0.3',
    explanation: 'ORM is a programming technique that lets you query and manipulate data from a database using object-oriented programming.'
  },
  {
    id: 7,
    term: 'CDN',
    icon: <Network className="w-8 h-8" />,
    options: [
      'Content Delivery Network',
      'Computer Data Network',
      'Central Distribution Node',
      'Connected Device Network'
    ],
    correct: 'Content Delivery Network',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
    explanation: 'A CDN is a network of servers that distributes content from an "origin" server throughout the world by caching content close to where each end user is accessing the internet via a web-enabled device.'
  },
  {
    id: 8,
    term: 'SDK',
    icon: <Code2 className="w-8 h-8" />,
    options: [
      'Software Development Kit',
      'System Development Key',
      'Source Data Kit',
      'Secure Development Knowledge'
    ],
    correct: 'Software Development Kit',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=2069&ixlib=rb-4.0.3',
    explanation: 'An SDK is a collection of software development tools in one installable package, helping developers create applications for specific platforms.'
  },
  {
    id: 9,
    term: 'SaaS',
    icon: <Cloud className="w-8 h-8" />,
    options: [
      'Software as a Service',
      'System as a Solution',
      'Security as a Service',
      'Storage as a Service'
    ],
    correct: 'Software as a Service',
    image: 'https://images.unsplash.com/photo-1603695762547-fba8b88ac8ad?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
    explanation: 'SaaS is a software licensing and delivery model where software is licensed on a subscription basis and centrally hosted in the cloud.'
  },
  {
    id: 10,
    term: 'CI/CD',
    icon: <GitBranch className="w-8 h-8" />,
    options: [
      'Continuous Integration/Continuous Deployment',
      'Computer Interface/Control Design',
      'Code Implementation/Code Delivery',
      'Central Integration/Configuration Distribution'
    ],
    correct: 'Continuous Integration/Continuous Deployment',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
    explanation: 'CI/CD is a method to frequently deliver apps to customers by introducing automation into the stages of app development, combining continuous integration and continuous deployment.'
  }
];

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // Shuffle the options for each question when the game starts
    const shuffledQuestions = baseQuestions.map(question => ({
      ...question,
      options: shuffleArray(question.options)
    }));
    setQuestions(shuffledQuestions);
  }, []);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === questions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }

    setShowExplanation(true);

    setTimeout(() => {
      setShowExplanation(false);
      setSelectedAnswer(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const resetGame = () => {
    // Shuffle questions and their options again when resetting
    const shuffledQuestions = baseQuestions.map(question => ({
      ...question,
      options: shuffleArray(question.options)
    }));
    setQuestions(shuffledQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setStreak(0);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (questions.length === 0) {
    return null; // Return null while questions are being initialized
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <header className="border-b py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Terminal className="w-6 h-6" />
            <span className="font-bold text-lg">TechVocab</span>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary">Score: {score}</Badge>
            {streak >= 2 && (
              <Badge variant="default" className="bg-gradient-to-r from-orange-400 to-red-500">
                🔥 {streak} Streak!
              </Badge>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto space-y-8"
            >
              <div className="space-y-4">
                <Progress value={progress} className="w-full h-2" />
                <p className="text-sm text-muted-foreground text-center">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
              </div>

              <Card className="p-6 space-y-6">
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <img
                    src={questions[currentQuestion].image}
                    alt={questions[currentQuestion].term}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="flex items-center justify-center space-x-4">
                  {questions[currentQuestion].icon}
                  <h2 className="text-2xl font-bold text-center">
                    What does {questions[currentQuestion].term} stand for?
                  </h2>
                </div>

                <div className="grid gap-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant={
                        selectedAnswer === option
                          ? option === questions[currentQuestion].correct
                            ? 'default'
                            : 'destructive'
                          : 'outline'
                      }
                      className="h-auto py-4 px-6 text-left transition-all duration-200"
                      onClick={() => handleAnswer(option)}
                      disabled={selectedAnswer !== null}
                    >
                      {option}
                    </Button>
                  ))}
                </div>

                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-secondary rounded-lg"
                  >
                    <p className="text-secondary-foreground">
                      {questions[currentQuestion].explanation}
                    </p>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto"
            >
              <Card className="p-8 text-center space-y-6">
                <h2 className="text-3xl font-bold">Game Complete! 🎉</h2>
                <div className="space-y-4">
                  <p className="text-xl">
                    Your score: {score} out of {questions.length}
                  </p>
                  <Progress 
                    value={(score / questions.length) * 100} 
                    className="h-4"
                  />
                  <p className="text-muted-foreground">
                    {score === questions.length 
                      ? "Perfect score! You're a tech vocab master! 🏆"
                      : score >= questions.length / 2 
                        ? "Great job! Keep learning! 📚"
                        : "Keep practicing to improve! 💪"}
                  </p>
                </div>
                <Button onClick={resetGame} size="lg" className="w-full">
                  Play Again
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        <p>by Dylan and Lady Vidal</p>
      </footer>
    </div>
  );
}

export default App;