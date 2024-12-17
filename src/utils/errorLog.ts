import fs from "fs";
import path from "path";

/**
 * Logs any type of error (string, array, object) into /logs/debug.log.
 * Creates the logs folder and file if they do not exist.
 * @param logData - The data to log (string, object, array, etc.).
 */
export const errorLog = (logData: any): void => {
  try {
    const logsFolder = path.join(process.cwd(), "logs");
    const logFilePath = path.join(logsFolder, "debug.log");

    // Ensure the logs directory exists, create it if not
    if (!fs.existsSync(logsFolder)) {
      fs.mkdirSync(logsFolder, { recursive: true });
    }

    // Convert log data to string for consistent logging
    const logMessage = `[${new Date().toISOString()}] - ${
      typeof logData === "string"
        ? logData
        : JSON.stringify(logData, null, 2) // Pretty print for objects/arrays
    }\n`;

    // Append log message to the log file
    fs.appendFileSync(logFilePath, logMessage, "utf8");

    console.log("Log written to:", logFilePath); // Optional console log
  } catch (error) {
    console.error("Failed to write to log file:", error);
  }
};
