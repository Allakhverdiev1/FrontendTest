export interface Question {
    questionText: string;
    answerOptions: AnswerOption[];
    answerType: 'choice' | 'text'; 
  }
  
  export interface AnswerOption {
    answerText: string;
    isCorrect: boolean;
  }
  

  
