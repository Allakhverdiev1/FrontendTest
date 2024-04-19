export interface Question {
    questionText: string;
    answerOptions: AnswerOption[];
    answerType: 'choice' | 'text'; // 'choice' для радио кнопок, 'text' для текстового поля
  }
  
  export interface AnswerOption {
    answerText: string;
    isCorrect: boolean;
  }
  

  