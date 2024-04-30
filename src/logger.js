// logger.js
import winston from "winston";
import path from "path";
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({
      filename:
        process.env.NODE_ENV === "development"
          ? "app.log"
          : "~/xtremetools_ssr.log",
    }),
  ],
});

export { logger };
