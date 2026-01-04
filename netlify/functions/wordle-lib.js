import { createCipheriv, createDecipheriv, createHash, randomBytes, randomInt } from "crypto";
import { WORDS_BY_LENGTH } from "./wordle-words.js";

const DEFAULT_WORD_LENGTH = 5;
const MAX_GUESSES = 6;
const MAX_TOKEN_AGE_MS = 1000 * 60 * 60 * 12; // 12 hours

const JSON_HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store"
};

const ERROR_HEADERS = {
  ...JSON_HEADERS
};

function getKey() {
  const secret = process.env.WORDLE_SECRET;
  if (!secret) {
    throw new Error("Missing WORDLE_SECRET environment variable");
  }
  return createHash("sha256").update(secret).digest();
}

function encryptPayload(payload) {
  const key = getKey();
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const plaintext = Buffer.from(JSON.stringify(payload), "utf8");
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();

  return [iv, ciphertext, tag].map((part) => part.toString("base64url")).join(".");
}

function decryptPayload(token) {
  const key = getKey();
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid token");
  }

  const [ivB64, dataB64, tagB64] = parts;
  const iv = Buffer.from(ivB64, "base64url");
  const data = Buffer.from(dataB64, "base64url");
  const tag = Buffer.from(tagB64, "base64url");

  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  const plaintext = Buffer.concat([decipher.update(data), decipher.final()]);
  const payload = JSON.parse(plaintext.toString("utf8"));

  if (payload?.issuedAt && Date.now() - payload.issuedAt > MAX_TOKEN_AGE_MS) {
    throw new Error("Token expired");
  }

  return payload;
}

function pickRandomWord(length = DEFAULT_WORD_LENGTH) {
  const normalizedLength = Number.isInteger(length) ? length : DEFAULT_WORD_LENGTH;
  const words = WORDS_BY_LENGTH[normalizedLength] || WORDS_BY_LENGTH[DEFAULT_WORD_LENGTH];
  if (!words || words.length === 0) {
    throw new Error("No words available for requested length");
  }
  const index = randomInt(0, words.length);
  return words[index];
}

function evaluateGuess(guess, secret) {
  const secretArr = secret.split("");
  const guessArr = guess.split("");
  const result = new Array(secretArr.length).fill("absent");
  const secretUsed = new Array(secretArr.length).fill(false);

  for (let i = 0; i < secretArr.length; i += 1) {
    if (guessArr[i] === secretArr[i]) {
      result[i] = "correct";
      secretUsed[i] = true;
    }
  }

  for (let i = 0; i < secretArr.length; i += 1) {
    if (result[i] !== "correct") {
      for (let j = 0; j < secretArr.length; j += 1) {
        if (!secretUsed[j] && guessArr[i] === secretArr[j]) {
          result[i] = "present";
          secretUsed[j] = true;
          break;
        }
      }
    }
  }

  return result;
}

function isAlphaWord(value) {
  return /^[A-Z]+$/.test(value);
}

function normalizeGuess(guess) {
  if (typeof guess !== "string") {
    return null;
  }
  return guess.trim().toUpperCase();
}

function jsonResponse(statusCode, payload) {
  return {
    statusCode,
    headers: JSON_HEADERS,
    body: JSON.stringify(payload)
  };
}

function errorResponse(statusCode, message) {
  return {
    statusCode,
    headers: ERROR_HEADERS,
    body: JSON.stringify({ error: message })
  };
}

export {
  DEFAULT_WORD_LENGTH,
  MAX_GUESSES,
  decryptPayload,
  encryptPayload,
  errorResponse,
  evaluateGuess,
  isAlphaWord,
  jsonResponse,
  normalizeGuess,
  pickRandomWord
};
