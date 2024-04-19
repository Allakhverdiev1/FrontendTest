import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import styled, { keyframes } from 'styled-components';

// Анимация появления
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Стилизованные компоненты
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(to right, #f6d2be, #e9c6ca);
`;

const QuizContent = styled.div`
  background: #f7f7f7;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 600px;
  color: #5f4b44;
  animation: ${fadeIn} 2s ease-out;
`;

const QuestionHeader = styled.h1`
  font-size: 24px;
  color: #5f4b44;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #5f4b44;
  background: #f7cac9;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s;
  animation: ${fadeIn} 2s ease-out;

  &:hover {
    background-color: #f4e1e1;
  }
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #d1c4e9;
  width: calc(100% - 22px);
  margin-top: 10px;
  background: #ffffff;
  color: #5f4b44;
`;

const Timer = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  color: #5f4b44;
`;

interface QuizProps {
  questions: Question[];
}

const Quiz: React.FC<{ questions: Question[] }> = ({ questions }) => {
    const getInitialState = (key: string, defaultValue: any) => {
      const savedValue = localStorage.getItem(key);
      if (savedValue != null) {
        return JSON.parse(savedValue);
      }
      return defaultValue;
    };
    const [userAnswer, setUserAnswer] = useState<string>('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => getInitialState('currentQuestionIndex', 0));
    const [score, setScore] = useState(() => getInitialState('score', 0));
    const [timeLeft, setTimeLeft] = useState(() => getInitialState('timeLeft', 600));
    const [isFinished, setIsFinished] = useState(() => getInitialState('isFinished', false));
  
    useEffect(() => {
      localStorage.setItem('currentQuestionIndex', JSON.stringify(currentQuestionIndex));
      localStorage.setItem('score', JSON.stringify(score));
      localStorage.setItem('timeLeft', JSON.stringify(timeLeft));
      localStorage.setItem('isFinished', JSON.stringify(isFinished));
    }, [currentQuestionIndex, score, timeLeft, isFinished]);
  
    useEffect(() => {
      const timerId = timeLeft > 0 && !isFinished && setInterval(() => {
        setTimeLeft((prevTime: number) => prevTime - 1);;
      }, 1000);
      return () => {
        if (timerId) clearInterval(timerId);
      };;
    }, [timeLeft, isFinished]);
  
    const resetQuiz = () => {
      setCurrentQuestionIndex(0);
      setScore(0);
      setTimeLeft(600);
      setIsFinished(false);
      localStorage.clear();
    };

  const handleAnswerOptionClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
    }
    setUserAnswer('');
  };

  const handleTextAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value);
  };

  const submitTextAnswer = () => {
    const correctAnswer = questions[currentQuestionIndex].answerOptions[0];
    handleAnswerOptionClick(userAnswer === correctAnswer.answerText && correctAnswer.isCorrect);
  };

  if (isFinished) {
    return (
      <Container>
        <QuizContent>
          <QuestionHeader>Тест завершен!</QuestionHeader>
          <p>Правильных ответов: {score} из {questions.length}</p>
          <Button onClick={resetQuiz}>Начать заново</Button>
        </QuizContent>
      </Container>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Container>
      <QuizContent>
        <Timer>Оставшееся время: {Math.floor(timeLeft / 60)}:{('0' + timeLeft % 60).slice(-2)}</Timer>
        <QuestionHeader>Вопрос {currentQuestionIndex + 1} из {questions.length}: {currentQuestion.questionText}</QuestionHeader>
        {currentQuestion.answerType === 'choice' ? (
          currentQuestion.answerOptions.map((option, index) => (
            <div key={index}>
              <Button onClick={() => handleAnswerOptionClick(option.isCorrect)}>
                {option.answerText}
              </Button>
            </div>
          ))
        ) : (
          <div>
            <Input type="text" value={userAnswer} onChange={handleTextAnswerChange} />
            <Button onClick={submitTextAnswer}>Отправить</Button>
          </div>
        )}
      </QuizContent>
    </Container>
  );
};

export default Quiz;
