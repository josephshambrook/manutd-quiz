export type AuthTokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

export type Player = {
  surname: string;
  firstname: string;
  totalGoals: boolean;
  show: boolean;
};

// TODO: rather dynamic type here to fill out
export type ApiDataResponse = {};

// Quiz answers

export type QuizSingleChoiceAnswer = {
  text: string;
  isCorrect: boolean;
};

// export type QuizMultiInputAnswer = {
//   text: string;
// };

// Quiz questions

export type QuizQuestion = {
  id: string;
  question: string;
  description: string;
  timeLimit: 60 | 90 | 120 | 150 | 180;
  state: "initial" | "running" | "finished";
};

export type QuizSingleChoiceQuestion = QuizQuestion & {
  type: "single-choice";
  answers: QuizSingleChoiceAnswer[];
};

export type QuizMultiInputQuestion<AnswerType> = QuizQuestion & {
  type: "multi-input";
  answers: AnswerType[];
};
