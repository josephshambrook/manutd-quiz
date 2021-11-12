import questions from "./quiz.js";

type PopulateQuestionParameters = {
  questionId: string;
  answers: string[];
  correctAnswer: string;
};

export const populateQuestion = (parameters: PopulateQuestionParameters) => {};

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

const getName = (player) => `${player.Firstname} ${player.Surname}`;

// accepts parameters of data retrieved from API
export const populateQuiz = ({ topGoalscorers }) => {
  console.log(
    "populateQuiz data",
    topGoalscorers.data.Club.AllTimeTopGoalScorers
  );
  // console.log("topGoalscorers", topGoalscorers);
  // console.log("questions", questions);

  const quiz = [...questions];

  quiz[0].correctAnswer = getName(
    topGoalscorers.data.Club.AllTimeTopGoalScorers[0]
  );
  quiz[0].possibleAnswers = pickWrongAnswers(
    topGoalscorers.data.Club.AllTimeTopGoalScorers.map((p) => getName(p)),
    0
  );

  quiz[1].correctAnswer = getName(
    topGoalscorers.data.Club.AllTimeTopGoalScorers[1]
  );
  quiz[1].possibleAnswers = pickWrongAnswers(
    topGoalscorers.data.Club.AllTimeTopGoalScorers.map((p) => getName(p)),
    1
  );

  quiz[2].correctAnswer = getName(
    topGoalscorers.data.Club.AllTimeTopGoalScorers[2]
  );
  quiz[2].possibleAnswers = pickWrongAnswers(
    topGoalscorers.data.Club.AllTimeTopGoalScorers.map((p) => getName(p)),
    2
  );

  return quiz;
};
