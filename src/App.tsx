import React, { useState } from 'react';
import Quiz from './components/Quiz';
import { Question } from './types';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const Body = styled.body`

margin: 0;
padding: 0;
box-sizing: border-box;
font-family: sans-serif; // Пример добавления базового шрифта

`

const StartPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #f6d2be, #e9c6ca);
`;

const StartButton = styled.button`
padding: 15px 30px;
font-size: 22px;
color: #5f4b44;
background: #de9e9c;
border: 1px;
border-radius: 8px;
cursor: pointer;
transition: background-color 0.3s;

  &:hover {
    background-color: #f4e1e1;
  }
`;

const Title = styled.h1`
  font-size: 34px;
  color: #5f4b44;
  margin-bottom: 20px;
`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(to top, #f6d2be, #e9c6ca);
`;

const QuizContent = styled.div`
  background: #f7f7f7;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 600px;
  color: #5f4b44;
`;

const QuestionHeader = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #5f4b44;
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


const App: React.FC = () => {
  const [start, setStart] = useState(false);

  const questions: Question[] = [
    {
      questionText: 'Расшифруйте аббревиатуру DOM',
      answerOptions: [
        { answerText: 'Digital Optical Modulation', isCorrect: false },
        { answerText: 'Domestic Object Mode', isCorrect: false },
        { answerText: 'Document Object Model', isCorrect: true },
        { answerText: 'Domain Operation Method', isCorrect: false }
      ],
      answerType: 'choice'
    },
    {
      questionText: 'Какой результат будет в консоле: console.log(2 + 2)?',
      answerOptions: [
        { answerText: '4', isCorrect: true }
      ],
      answerType: 'text'
    },
    {
      questionText: 'Какой метод разбивает строку на подстроки, используя заданный разделитель, и возвращает их в виде массива?',
      answerOptions: [
        { answerText: '.filter()', isCorrect: false },
        { answerText: '.parseInt()', isCorrect: false },
        { answerText: '.split()', isCorrect: true },
        { answerText: '.trim()', isCorrect: false }
      ],
      answerType: 'choice'
    },
    
  ];


const savedData = localStorage.getItem('timeLeft');





if (!start && !savedData) {
  return (
    <StartPage>
      <GlobalStyle />
      <Title>Здесь вы можете пройти тест по Frontend разработке</Title>
      <StartButton onClick={() => setStart(true)}>Начать тест</StartButton>
    </StartPage>
  );
}





  return (
    <div>
      <GlobalStyle />
      <Quiz questions={questions} />
    </div>
  );
};

export default App;
