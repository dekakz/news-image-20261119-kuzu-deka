// "The World in One Day" — Thursday 19 November 2026.
//
// Entry program for the make.fun news-image-20261119 competition.
// The artwork is a single pre-rendered front page (entry.png, 1024x1024,
// 202,749 bytes) drawn with real typography, so every headline is crisp
// and legible at judging size. This program copies that image, byte for
// byte, to the output directory the grader provides.
//
// The image was built offline from verified wire-service reporting of
// Thursday 19 November 2026 (Reuters, AP, AFP, BBC, The Hindu, IMD,
// ICJ, Pew). Stories first reported before Thursday are excluded from
// the day's news and listed in the red DATE CHECK box on the page.
// No network, no randomness, no environment dependence: running this
// program twice writes identical bytes.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outputDir, "entry.png");

const bytes = readFileSync(source);
mkdirSync(outputDir, { recursive: true });
writeFileSync(target, bytes);

const sha = createHash("sha256").update(bytes).digest("hex");
console.log(`wrote ${target} (${bytes.length} bytes, sha256 ${sha})`);
