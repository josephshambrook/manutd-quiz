type Question = {
  id: string;
  question: string;
  possibleAnswers: string[];
  correctAnswer: string;
};

const quiz: Question[] = [
  {
    id: "001",
    question: "Who is the top goalscorer of all time?",
    possibleAnswers: [],
    correctAnswer: "",
  },
  {
    id: "002",
    question: "Who is the second top goalscorer of all time?",
    possibleAnswers: [],
    correctAnswer: "",
  },
  {
    id: "003",
    question: "Who is the third top goalscorer of all time?",
    possibleAnswers: [],
    correctAnswer: "",
  },
];

export default quiz;
