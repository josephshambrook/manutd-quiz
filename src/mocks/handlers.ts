import { graphql } from "msw";
import getQuizResponse from "./GetQuiz.json";

export const handlers = [
  graphql.query("GetQuiz", (req, res, ctx) => {
    return res(ctx.data(getQuizResponse));
  }),
];
