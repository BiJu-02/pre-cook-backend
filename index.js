#!/usr/bin/env node

const { execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

console.log("chef at work...");

execSync(`npm init -y`);
execSync(`npm i no-code-backend@latest`);

const configTempPath = path.join(__dirname, "template", "serverConfigTemplate.json");
const configTemp = fs.readFileSync(configTempPath, "utf-8");
fs.writeFileSync("serverConfig.json", configTemp);

const indexTempPath = path.join(__dirname, "template", "indexTemplate.js");
const indexTemp = fs.readFileSync(indexTempPath, "utf-8");
fs.writeFileSync("index.js", indexTemp);

const packageJson = require("package.json");
if (!packageJson.scripts) {
    packageJson.scripts = {};
}
packageJson.scripts.start = "node index";
fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));

console.log("hot and ready to serve");