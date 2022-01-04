import { safelog } from "../helpers.js";
import type {
  QuizSingleChoiceQuestion,
  QuizMultiInputQuestion,
  Player,
} from "../types.js";
import { createTop10GoalscorersQuestion } from "./createQuestion.js";
import questions from "./quiz.js";

type PopulateQuestionParameters = {
  questionId: string;
  answers: string[];
  correctAnswer: string;
};

const pickWrongAnswers = (dataset = [], correctAnswerIndex = 0) => {
  let answers = [];

  const selectAnswer = () => {
    const answerIndex = Math.floor(Math.random() * dataset.length);

    if (answerIndex === correctAnswerIndex) {
      return selectAnswer();
    }

    return answerIndex;
  };

  for (let i = 0; i < 3; i += 1) {
    const j = selectAnswer();
    answers.push(dataset[j]);
    dataset.splice(j, 1);
  }

  return answers;
};

// accepts parameters of data retrieved from API
export const createQuiz = (
  apiData
): (QuizSingleChoiceQuestion | QuizMultiInputQuestion<Player>)[] => {
  safelog(
    "🚀 ~ file: populateQuiz.ts ~ line 37 ~ createQuiz ~ apiData",
    apiData
  );

  const quiz = [];

  // add questions to the quiz
  quiz.push(createTop10GoalscorersQuestion(apiData.ManUtd.TopGoalScorers));

  return quiz;
};
