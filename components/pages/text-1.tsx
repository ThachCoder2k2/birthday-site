'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Gift, Check, X, RotateCcw } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const mockQuestions: Question[] = [
  {
    id: '1',
    question: "What's the most romantic way to celebrate a birthday?",
    options: [
      'A surprise candlelit dinner',
      'A big party with friends',
      'A quiet day at home together',
      'An adventure trip somewhere new',
    ],
    correctAnswer: 0,
  },
  {
    id: '2',
    question: 'Which birthday gift shows the most love?',
    options: [
      'Expensive jewelry',
      'A handwritten love letter',
      'A surprise vacation',
      'Their favorite gadget',
    ],
    correctAnswer: 1,
  },
  {
    id: '3',
    question: 'What makes a birthday kiss extra special?',
    options: [
      'It happens at midnight',
      "It's in front of everyone",
      "It's unexpected and spontaneous",
      'It comes with a wish',
    ],
    correctAnswer: 2,
  },
  {
    id: '4',
    question: 'The best birthday memory is usually about:',
    options: [
      'The expensive gifts received',
      'The people who celebrated with you',
      'The perfect Instagram photos',
      'The fancy venue or restaurant',
    ],
    correctAnswer: 1,
  },
  {
    id: '5',
    question: 'How do you make someone feel most loved on their birthday?',
    options: [
      'Buy them everything they want',
      'Throw them a huge surprise party',
      'Remember all the little details they love',
      'Post about them on social media',
    ],
    correctAnswer: 2,
  },
  {
    id: '6',
    question: "What's the sweetest birthday tradition for couples?",
    options: [
      'Recreating your first date',
      'Giving each other matching gifts',
      'Writing annual love letters to read',
      'Having a themed costume party',
    ],
    correctAnswer: 2,
  },
];

interface QuizState {
  currentQuestion: number;
  selectedAnswer: number | null;
  showFeedback: boolean; // Renamed from showResult to showFeedback
  score: number;
  answeredCorrectly: boolean[]; // Tracks if a question was answered correctly on any attempt
}

export default function QuizState() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    selectedAnswer: null,
    showFeedback: false,
    score: 0,
    answeredCorrectly: new Array(mockQuestions.length).fill(false),
  });

  const selectAnswer = (answerIndex: number) => {
    setQuizState((prev) => ({
      ...prev,
      selectedAnswer: answerIndex,
      showFeedback: false, // Hide feedback when a new answer is selected
    }));
  };

  const checkAnswer = () => {
    if (quizState.selectedAnswer === null) return;

    const isCorrect =
      quizState.selectedAnswer ===
      mockQuestions[quizState.currentQuestion].correctAnswer;

    setQuizState((prev) => {
      const newAnsweredCorrectly = [...prev.answeredCorrectly];
      if (isCorrect) {
        newAnsweredCorrectly[prev.currentQuestion] = true;
      }

      return {
        ...prev,
        showFeedback: true,
        score: isCorrect ? prev.score + 1 : prev.score,
        answeredCorrectly: newAnsweredCorrectly,
      };
    });
  };

  const nextQuestion = () => {
    // Only move to the next question if the current one has been answered correctly
    if (quizState.answeredCorrectly[quizState.currentQuestion]) {
      if (quizState.currentQuestion < mockQuestions.length - 1) {
        setQuizState((prev) => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
          selectedAnswer: null,
          showFeedback: false,
        }));
      }
    } else {
      // If not correct, allow user to re-select
      setQuizState((prev) => ({
        ...prev,
        selectedAnswer: null,
        showFeedback: false,
      }));
    }
  };

  const resetQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      selectedAnswer: null,
      showFeedback: false,
      score: 0,
      answeredCorrectly: new Array(mockQuestions.length).fill(false),
    });
  };

  const currentQ = mockQuestions[quizState.currentQuestion];
  const isQuizComplete = quizState.answeredCorrectly.every(
    (answered) => answered
  );

  if (isQuizComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-rose-100 p-4 flex items-center justify-center">
        <Card className="max-w-md w-full border-pink-200 shadow-xl">
          <CardHeader className="text-center bg-gradient-to-r from-pink-50 to-red-50">
            <div className="text-6xl mb-4">🎉</div>
            <CardTitle className="text-2xl text-pink-700">
              Quiz Complete!
            </CardTitle>
            <div className="text-sm text-gray-600">
              You did amazing! Here are your results:
            </div>
          </CardHeader>
          <CardContent className="text-center pt-6">
            <div className="text-4xl font-bold text-pink-600 mb-2">
              {quizState.score}/{mockQuestions.length}
            </div>
            <p className="text-gray-600 mb-6">
              {quizState.score === mockQuestions.length
                ? "Perfect score! You're a love and birthday expert! 💕"
                : quizState.score >= mockQuestions.length / 2
                ? 'Great job! You know how to celebrate love! ❤️'
                : 'Keep spreading the love and joy! 💪'}
            </p>
            <Button
              onClick={resetQuiz}
              className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Take Quiz Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 flex items-center">
      <div className="max-w-2xl w-full mx-auto">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="h-6 w-6 text-pink-500" />
            <h1 className="text-2xl font-bold text-pink-700">
              Love & Birthday Quiz
            </h1>
            <Gift className="h-6 w-6 text-red-500" />
          </div>
          <p className="text-gray-600">
            Question {quizState.currentQuestion + 1} of {mockQuestions.length} •
            Score: {quizState.score}
          </p>
          <div className="w-full bg-pink-200 rounded-full h-2 mt-2">
            <div
              className="bg-gradient-to-r from-pink-500 to-red-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((quizState.currentQuestion + 1) / mockQuestions.length) * 100
                }%`,
              }}
            />
          </div>
        </div>

        <Card className="border-pink-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-pink-50 to-red-50">
            <CardTitle className="text-xl text-pink-800">
              {currentQ.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 gap-3 mb-6">
              {currentQ.options.map((option, index) => {
                let buttonClass =
                  'w-full p-4 text-left border-2 transition-all duration-200 rounded-lg ';

                if (quizState.showFeedback) {
                  if (index === quizState.selectedAnswer) {
                    if (index === currentQ.correctAnswer) {
                      buttonClass +=
                        'border-green-500 bg-green-50 text-green-800';
                    } else {
                      buttonClass += 'border-red-500 bg-red-50 text-red-800';
                    }
                  } else {
                    buttonClass += 'border-gray-200 bg-gray-50 text-gray-600';
                  }
                } else if (quizState.selectedAnswer === index) {
                  buttonClass += 'border-pink-500 bg-pink-50 text-pink-800';
                } else {
                  buttonClass +=
                    'border-pink-200 hover:border-pink-400 hover:bg-pink-50 text-gray-700';
                }

                return (
                  <button
                    key={index}
                    onClick={() =>
                      !quizState.showFeedback && selectAnswer(index)
                    }
                    className={buttonClass}
                    disabled={quizState.showFeedback}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-left">{option}</span>
                      {quizState.showFeedback &&
                        index === quizState.selectedAnswer &&
                        index === currentQ.correctAnswer && (
                          <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                        )}
                      {quizState.showFeedback &&
                        index === quizState.selectedAnswer &&
                        index !== currentQ.correctAnswer && (
                          <X className="h-5 w-5 text-red-600 flex-shrink-0" />
                        )}
                    </div>
                  </button>
                );
              })}
            </div>

            {!quizState.showFeedback ? (
              <Button
                onClick={checkAnswer}
                disabled={quizState.selectedAnswer === null}
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white disabled:from-gray-300 disabled:to-gray-400 py-3 text-lg"
              >
                Check Answer 💕
              </Button>
            ) : (
              <div className="space-y-3">
                <div className="text-center p-4 rounded-lg bg-gradient-to-r from-pink-50 to-red-50 border border-pink-200">
                  {quizState.selectedAnswer === currentQ.correctAnswer ? (
                    <div className="text-green-700 font-medium">
                      🎉 Correct! You know love and birthdays well!
                    </div>
                  ) : (
                    <div className="text-red-700 font-medium">
                      💔 Not quite right, try again!
                    </div>
                  )}
                </div>
                {quizState.answeredCorrectly[quizState.currentQuestion] ? (
                  quizState.currentQuestion < mockQuestions.length - 1 ? (
                    <Button
                      onClick={nextQuestion}
                      className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white py-3 text-lg"
                    >
                      Next Question ➡️
                    </Button>
                  ) : (
                    <Button
                      onClick={() =>
                        setQuizState((prev) => ({
                          ...prev,
                          answeredCorrectly: prev.answeredCorrectly.map(
                            () => true
                          ), // Mark all as answered to show completion screen
                        }))
                      }
                      className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white py-3 text-lg"
                    >
                      Finish Quiz 🎉
                    </Button>
                  )
                ) : (
                  <Button
                    onClick={() =>
                      setQuizState((prev) => ({
                        ...prev,
                        selectedAnswer: null,
                        showFeedback: false,
                      }))
                    }
                    className="w-full bg-gradient-to-r from-pink-400 to-red-400 hover:from-pink-500 hover:to-red-500 text-white py-3 text-lg"
                  >
                    Try Again
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
