"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Question = {
  question: string;
  options: string[];
  answer: string;
  category: string;
  difficulty: string;
};

export default function QuizPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch quiz questions on mount
    const fetchQuestions = async () => {
      try {
        const res = await fetch("/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 10 }),
        });

        if (!res.ok) {
          throw new Error("Failed to load quiz");
        }

        const data = await res.json();
        setQuestions(data.questions);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleSelectAnswer = (option: string) => {
    if (selectedAnswer !== null) return; // Prevent changing answer repeatedly
    setSelectedAnswer(option);

    if (option === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        setIsFinished(true);
      }
    }, 1500); // Wait 1.5 seconds to see result before moving on
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p className="text-muted-foreground">Generating questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-destructive mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Quiz Completed!</CardTitle>
            <CardDescription>Here's how you did</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-6xl font-bold text-primary mb-4">
              {score} / {questions.length}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Dashboard
            </Button>
            <Button onClick={() => window.location.reload()}>Play Again</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/20">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {currentQuestion.category} • {currentQuestion.difficulty}
            </span>
            <span className="text-sm font-medium">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
          <CardTitle className="text-2xl mt-4 leading-relaxed" 
            dangerouslySetInnerHTML={{ __html: currentQuestion.question }} 
          />
        </CardHeader>
        <CardContent className="grid gap-4 mt-6">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === currentQuestion.answer;
            const showCorrect = selectedAnswer !== null && isCorrect;
            const showIncorrect = isSelected && !isCorrect;

            let buttonVariant: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link" = "outline";
            let buttonClass = "justify-start text-left h-auto py-4 px-6 text-lg";

            if (showCorrect) {
              buttonClass += " bg-green-500/20 text-green-700 border-green-500 hover:bg-green-500/30";
            } else if (showIncorrect) {
              buttonClass += " bg-red-500/20 text-red-700 border-red-500 hover:bg-red-500/30";
            } else if (selectedAnswer !== null) {
              buttonClass += " opacity-50 cursor-not-allowed";
            }

            return (
              <Button
                key={index}
                variant={buttonVariant}
                className={buttonClass}
                disabled={selectedAnswer !== null}
                onClick={() => handleSelectAnswer(option)}
              >
                <span dangerouslySetInnerHTML={{ __html: option }} />
              </Button>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
