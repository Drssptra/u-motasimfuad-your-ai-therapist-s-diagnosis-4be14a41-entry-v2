import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The v2 entry text, frozen at 128 characters. The revise pass only
// restructures how the line is assembled and adds a guard; the wording
// itself must not change.
const ENTRY_PARTS = [
  "Diagnosis: acute overthinking \u2014 you spent three days rehearsing ",
  "this session, then opened with \u2018sorry, this is probably stupid\u2019.",
];
const ENTRY = ENTRY_PARTS.join("");

// Guard: fail loudly if the frozen entry text ever drifts (length,
// trailing newline, or surrounding whitespace) instead of silently
// writing a different line.
if (ENTRY.length !== 128 || ENTRY.endsWith("\n") || ENTRY.trim() !== ENTRY) {
  throw new Error(`entry text drifted: ${ENTRY.length} chars`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output/entry.txt";
const dir = outDir.endsWith("entry.txt") ? outDir.slice(0, -"entry.txt".length) : outDir;
mkdirSync(dir || ".", { recursive: true });
writeFileSync(join(dir || ".", "entry.txt"), ENTRY, "utf8");
console.log(ENTRY);
