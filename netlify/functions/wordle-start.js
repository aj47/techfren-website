import {
  DEFAULT_WORD_LENGTH,
  encryptPayload,
  errorResponse,
  jsonResponse,
  pickRandomWord
} from "./wordle-lib.js";

export const handler = async (event) => {
  if (event.httpMethod && event.httpMethod !== "POST") {
    return errorResponse(405, "Method not allowed");
  }

  let requestedLength = DEFAULT_WORD_LENGTH;
  if (event.body) {
    try {
      const payload = JSON.parse(event.body);
      const length = Number(payload?.length);
      if (Number.isInteger(length) && length > 0) {
        requestedLength = length;
      }
    } catch (error) {
      return errorResponse(400, "Invalid JSON body");
    }
  }

  try {
    const word = pickRandomWord(requestedLength);
    const token = encryptPayload({ word, issuedAt: Date.now() });
    return jsonResponse(200, { token, length: word.length });
  } catch (error) {
    return errorResponse(500, error.message || "Failed to start game");
  }
};
