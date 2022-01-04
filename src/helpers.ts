import type { Player } from "./types";

export function shuffle(arr: unknown[]): unknown[] {
  return arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export const getPlayerName = (player: Player) =>
  `${player.firstname} ${player.surname}`;

type isAcceptablePlayerAnswerParameter = {
  firstname: string;
  surname: string;
  guess: string;
};

export const isAcceptablePlayerAnswer = ({
  firstname,
  surname,
  guess,
}: isAcceptablePlayerAnswerParameter): boolean => {
  // the following are the agreed instances of correct answers
  // - guess matches the full player name
  // - guess matches just the player's surname

  const lowerGuess = guess.toLowerCase();
  const fullName = `${firstname} ${surname}`.toLowerCase();
  return fullName === lowerGuess || surname.toLowerCase() === lowerGuess;
};

export const formatTimeLeft = (timeLeft: number): string => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
