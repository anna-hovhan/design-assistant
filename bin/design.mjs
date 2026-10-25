#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("..", import.meta.url));
process.exit(spawnSync("npx", ["tsx", "src/cli.ts", ...process.argv.slice(2)], { cwd: root, stdio: "inherit" }).status ?? 1);
