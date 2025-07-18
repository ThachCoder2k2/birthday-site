'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRightIcon, Check, X } from 'lucide-react';
import { useState } from 'react';

interface Question {
  id: string;
  question: string;
  image?: string;
  options: string[];
  correctAnswer: number;
}

const mockQuestions: Question[] = [
  {
    id: '1',
    question: 'Whats my fav agent in valo?',
    options: ['Neon', 'Omen', 'Sova', 'All of them'],
    correctAnswer: 0,
  },
  {
    id: '2',
    question: 'Will you love me if im a worm?',
    options: ['Ewww', 'Im dumb', 'What is wrong with u', 'OFCOUSEEE'],
    correctAnswer: 3,
  },
  {
    id: '3',
    question: 'On a scale of 1 to 10, how much do I love KristinaBelle?',
    options: [
      'A solid 7',
      'Answer 4',
      'Definitely a 10... for pizza',
      'Infinity + 1',
    ],
    correctAnswer: 1, // This was '1' in the original. If 'Infinity + 1' is the intended answer, it should be 3. I've left it as 1 as per your code.
  },
  {
    id: '4',
    question: 'Whats the best way to cheer me up when Im sad?',
    options: [
      'Leave me alone',
      'Scold me for being sad',
      'Tell me Im always right',
      'Love me more than ever',
    ],
    correctAnswer: 3,
  },
  {
    id: '5',
    question: 'Rate my cuteness compare to Jinu?',
    image:
      'https://tse3.mm.bing.net/th/id/OIF.us1fhXGH1mwSEN3co83MmA?rs=1&pid=ImgDetMain&o=7&rm=3',
    options: [
      'I am not cute',
      'I am disgusting',
      'I look like a pig',
      'I AM 100% CUTER THAN JINU',
    ],
    correctAnswer: 3,
  },
  {
    id: '6',
    question: 'Are you cute?',
    image: 'util-images/1 (24).png',
    options: [
      '0%',
      'YOU ARE THE MOST BEAUTIFUL GIRL, NO DOUBT',
      'Definitely not',
      'No',
    ],
    correctAnswer: 1,
  },
  {
    id: '7',
    question:
      'I cant think of any other questions :v. Tell me am i worth for who am i na bab? Tell the truth!',
    options: ['Nooooooooooooo', 'blank', 'Nooo', 'No'],
    correctAnswer: 1,
  },
];

interface QuizState {
  currentQuestion: number;
  selectedAnswer: number | null;
  showFeedback: boolean;
  score: number;
  correctlyAnsweredIndices: Set<number>;
}

interface Props {
  setIsOpen: (val: boolean) => void;
}

export default function Games({ setIsOpen }: Props) {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    selectedAnswer: null,
    showFeedback: false,
    score: 0,
    correctlyAnsweredIndices: new Set<number>(),
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
      const newCorrectlyAnsweredIndices = new Set(
        prev.correctlyAnsweredIndices
      );
      if (isCorrect) {
        newCorrectlyAnsweredIndices.add(prev.currentQuestion);
      }

      return {
        ...prev,
        showFeedback: true,
        score: isCorrect ? prev.score + 1 : prev.score,
        correctlyAnsweredIndices: newCorrectlyAnsweredIndices,
      };
    });
  };

  const goToNextQuestionOrRetry = () => {
    const isCurrentQuestionCorrect = quizState.correctlyAnsweredIndices.has(
      quizState.currentQuestion
    );

    if (isCurrentQuestionCorrect) {
      // If correct, move to the next question
      if (quizState.currentQuestion < mockQuestions.length - 1) {
        setQuizState((prev) => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
          selectedAnswer: null,
          showFeedback: false,
        }));
      } else {
        // If it's the last question and it's correct, mark all as answered to show completion screen
        setQuizState((prev) => ({
          ...prev,
          correctlyAnsweredIndices: new Set(
            Array.from({ length: mockQuestions.length }, (_, i) => i)
          ),
          selectedAnswer: null,
          showFeedback: false,
        }));
      }
    } else {
      // If incorrect, allow user to re-select
      setQuizState((prev) => ({
        ...prev,
        selectedAnswer: null,
        showFeedback: false,
      }));
    }
  };

  const currentQ = mockQuestions[quizState.currentQuestion];
  const isQuizComplete =
    quizState.correctlyAnsweredIndices.size === mockQuestions.length;

  if (isQuizComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-rose-100 p-4 overflow-y-auto flex items-center justify-center">
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
              onClick={() => {
                setIsOpen(false);
                // nextSection();
              }}
              className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white"
            >
              <ArrowRightIcon className="h-4 w-4 mr-2" />
              Lets go
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 flex items-center relative">
      <div className="max-w-2xl w-full mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-pink-700">
            Take a few quizzes with me babiiii
          </h1>
          <p className="text-gray-600">
            Question {quizState.currentQuestion + 1} of {mockQuestions.length} •
            Score: {quizState.score}
          </p>
          <div className="w-full bg-pink-200 rounded-full h-2 mt-2">
            <div
              className="bg-gradient-to-r from-pink-500 to-red-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((Array.from(quizState.correctlyAnsweredIndices).filter(
                    (index) => index < quizState.currentQuestion
                  ).length +
                    (quizState.correctlyAnsweredIndices.has(
                      quizState.currentQuestion
                    )
                      ? 1
                      : 0)) /
                    mockQuestions.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        <Card className="border-pink-200 bg-white shadow-xl">
          <CardHeader className="bg-gradient-to-r from-pink-50 to-red-50">
            <CardTitle className="text-xl text-pink-800">
              {currentQ.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {currentQ.image && (
              <div className="w-full  flex-shrink-0">
                {' '}
                <img
                  src={currentQ.image}
                  alt={'image'}
                  className="w-full h-64 md:h-80 object-cover rounded-xl border-4 border-white dark:border-gray-800 shadow-xl transform transition-transform duration-300 group-hover:scale-102"
                />
              </div>
            )}
            <div className="grid grid-cols-1 gap-3 mb-6">
              {currentQ.options.map((option, index) => {
                let buttonClass =
                  'w-full p-4 text-left border-2 transition-all duration-200 rounded-lg ';

                if (quizState.showFeedback) {
                  // If feedback is shown:
                  if (index === quizState.selectedAnswer) {
                    // This is the option the user selected
                    if (index === currentQ.correctAnswer) {
                      // Correct answer chosen
                      buttonClass +=
                        'border-green-500 bg-green-50 text-green-800';
                    } else {
                      // Incorrect answer chosen
                      buttonClass += 'border-red-500 bg-red-50 text-red-800';
                    }
                  } else if (
                    quizState.correctlyAnsweredIndices.has(
                      quizState.currentQuestion
                    ) &&
                    index === currentQ.correctAnswer
                  ) {
                    // Only highlight the correct answer if the question has been answered correctly
                    buttonClass +=
                      'border-green-300 bg-green-20 text-green-700';
                  } else {
                    // Other unselected options
                    buttonClass += 'border-gray-200 bg-gray-50 text-gray-600';
                  }
                } else if (quizState.selectedAnswer === index) {
                  // User has selected an answer but not yet checked
                  buttonClass += 'border-pink-500 bg-pink-50 text-pink-800';
                } else {
                  // Default state for unselected options
                  buttonClass +=
                    'border-pink-200 hover:border-pink-400 hover:bg-pink-50 text-gray-700';
                }

                return (
                  <button
                    key={index}
                    onClick={() =>
                      !quizState.showFeedback && selectAnswer(index)
                    }
                    className={cn(buttonClass, 'cursor-pointer')}
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
                {quizState.correctlyAnsweredIndices.has(
                  quizState.currentQuestion
                ) ? (
                  <Button
                    onClick={goToNextQuestionOrRetry}
                    className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white py-3 text-lg"
                  >
                    {quizState.currentQuestion < mockQuestions.length - 1
                      ? 'Next Question ➡️'
                      : 'Finish Quiz 🎉'}
                  </Button>
                ) : (
                  <Button
                    onClick={goToNextQuestionOrRetry}
                    className="w-full bg-gradient-to-r from-pink-400 to-red-400 hover:from-pink-500 hover:to-red-500 text-white py-3 text-lg"
                  >
                    Try Again! 🔄
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
