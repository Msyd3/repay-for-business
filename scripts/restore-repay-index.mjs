import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceDir = path.resolve(scriptsDir, "..");
const outputPath = path.join(workspaceDir, "artifacts", "repay-business", "index.html");
const templateDir = path.join(scriptsDir, "templates");
const partNames = [
  "repay-business-index.part1.b64",
  "repay-business-index.part2.b64",
  "repay-business-index.part3.b64",
];
const encodedParts = await Promise.all(
  partNames.map((name) => readFile(path.join(templateDir, name), "utf8")),
);
const html = encodedParts
  .map((encoded) => Buffer.from(encoded.trim(), "base64"))
  .join("")
  .replace('href="/favicon.svg"', 'href="/favicon.png"');

await writeFile(outputPath, html);