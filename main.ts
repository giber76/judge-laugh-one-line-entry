// make-the-judge-laugh-in-one-line-entry (Node 22, standard library only):
// writes a single funny line, under 200 characters and nothing else, to
// /output/entry.txt. The gate takes UTF-8 text of 1 to 200 characters, and
// the blind judge compares lines two at a time, weighing surprise,
// tightness, freshness and how cleanly the line reads.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for
// /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The line: a confession about houseplants that escalates twice. The
// setup is ordinary (plants keep dying, a familiar failure), the first
// turn is the fake-plant fix, and the punchline lands on the last two
// words — feeling guilty for neglecting something that cannot be
// neglected, because it is plastic. The guilt is the joke: it is
// misplaced twice over, first on a plant that needs no care, then on
// an object that cannot suffer. Nothing is explained, nothing is
// stock, and a stranger gets it in one read. 87 characters.
const LINE =
  'My plants keep dying, so I bought fake ones \u2014 now I feel guilty for neglecting plastic.';

// The gate takes 1 to 200 UTF-8 characters: refuse loudly rather than
// emit a text the gate would score 0.
if ([...LINE].length < 1 || [...LINE].length > 200) {
  throw new Error(`line is ${[...LINE].length} characters, outside 1-200`);
}
if (LINE.trim() !== LINE || LINE.includes('\n')) {
  throw new Error('line must be a single line with no surrounding space');
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), LINE, 'utf8');

console.log(`wrote ${join(outDir, 'entry.txt')} (${[...LINE].length} characters)`);
