import {
  MAX_GUESSES,
  decryptPayload,
  errorResponse,
  evaluateGuess,
  isAlphaWord,
  jsonResponse,
  normalizeGuess
} from "./wordle-lib.js";

export const handler = async (event) => {
  if (event.httpMethod && event.httpMethod !== "POST") {
    return errorResponse(405, "Method not allowed");
  }

  let payload;
  try {
    payload = event.body ? JSON.parse(event.body) : {};
  } catch (error) {
    return errorResponse(400, "Invalid JSON body");
  }

  const token = payload?.token;
  const guessRaw = payload?.guess;
  const attempt = Number(payload?.attempt);

  if (!token || !guessRaw) {
    return errorResponse(400, "Missing token or guess");
  }

  let secret;
  try {
    const decoded = decryptPayload(token);
    secret = decoded?.word;
  } catch (error) {
    return errorResponse(401, "Invalid game token");
  }

  const guess = normalizeGuess(guessRaw);
  if (!guess || guess.length !== secret.length || !isAlphaWord(guess)) {
    return errorResponse(400, "Guess must be letters only and match word length");
  }

  const result = evaluateGuess(guess, secret);
  const won = guess === secret;
  const shouldReveal = won || (Number.isInteger(attempt) && attempt >= MAX_GUESSES);

  return jsonResponse(200, {
    result,
    won,
    reveal: shouldReveal ? secret : null
  });
};
