import type { Player, QuizMultiInputQuestion } from "../types";
// import { getPlayerName } from "../helpers";

// individual questions

export const createTop10GoalscorersQuestion = (
  topGoalscorers: Player[]
): QuizMultiInputQuestion<Player> => {
  // create the question string
  const question = "Top 10 goalscorers of all time";
  const description =
    "Can you list the top 10 goalscorers of all time for Manchester United throughout its history?";

  // limitnumber of answers
  const answers = topGoalscorers.slice(0, 10).map((gs) => ({
    ...gs,
    show: false,
  }));
  // .map((goalscorer) => ({ text: getPlayerName(goalscorer) }));

  // call createQuestion with the created data and return result
  return {
    id: "top-10-goalscorers",
    type: "multi-input",
    timeLimit: 120,
    state: "initial",
    question,
    description,
    answers,
  };
};
