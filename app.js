const { execSync } = require("child_process");
const fs = require("fs");
const util = require("util");
const path = require("path");
const logFile = fs.createWriteStream(path.join(__dirname, "app.logs"));

const logStdout = process.stdout;
console.log = function (message) {
  try {
    const timestamp = new Date().toISOString();
    logFile.write(`[${timestamp}] ${util.format(message)}` + "\n");
    logStdout.write(util.format(message) + "\n");
  } catch (error) {
    console.error("Error writing to log file:", error.message);
  }
};
const installResult = execSync("npm install", { stdio: "pipe" }).toString();
console.log(installResult);
const buildResult = execSync("npm run build", { stdio: "inherit" }).toString();
console.log(buildResult);
execSync("npm run start", { stdio: "inherit" });
