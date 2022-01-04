import { safelog } from "../helpers.js";
import type {
  QuizSingleChoiceQuestion,
  QuizMultiInputQuestion,
  Player,
} from "../types.js";
import { createTop10GoalscorersQuestion } from "./createQuestion.js";

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
