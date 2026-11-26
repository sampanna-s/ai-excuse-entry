import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const excuse =
  "Sorry, I saw the error graph spike, assumed it was applause, and promoted the deploy that caused it.";

function assertValidExcuse(value) {
  const length = [...value].length;
  if (length < 1 || length > 180 || /[\r\n]/.test(value) || value.trim().length === 0) {
    throw new Error("entry must be one non-blank line of 1 to 180 characters");
  }
}

assertValidExcuse(excuse);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });

const target = join(outputDir, "entry.txt");
const temporary = `${target}.tmp`;
writeFileSync(temporary, excuse, "utf8");
renameSync(temporary, target);
