import * as winston from "winston";
import * as cheerio from "cheerio";
import * as fs from "fs";

interface CSVRow {
  [key: string]: string | number | boolean;
}

export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getUserInput(question: string): Promise<string> {
  return new Promise((resolve, reject) => {
    process.stdout.write(question);

    process.stdin.on("data", (data: Buffer) => {
      const input: string = data.toString().trim();
      resolve(input);
    });

    process.stdin.on("error", (err) => {
      reject(err);
    });
  });
}

export async function iterateDivClasses(html: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const $ = cheerio.load(html);
    let userId: string = "";

    try {
      const scriptElements = $('script[type="application/json"]').toArray();
      for (const element of scriptElements) {
        const scriptContent = $(element).html();
        if (scriptContent.includes("profile_id")) {
          const parsedJSON = JSON.parse(scriptContent);
          userId =
            parsedJSON.require[0][3][0].__bbox.require[3][3][0].initialRouteInfo
              .route.hostableView.props.id;
          break;
        }
      }
    } catch (error) {
      logger.error(`Error parsing JSON from script: ${error}`);
      reject(error);
    }

    if (userId !== "") {
      resolve(userId);
    } else {
      reject(new Error("userId is not found"));
    }
  });
}

export const logger = winston.createLogger({
  level: "info", // Set the minimum log level
  format: winston.format.simple(), // Set the log format
  transports: [
    new winston.transports.Console(), // Log to the console
  ],
});

export async function saveToCSV(data: CSVRow[], filePath: string) {
  const header = Object.keys(data[0]).join(",") + "\n";
  const rows = data.map((row) => Object.values(row).join(",") + "\n").join("");
  const csvContent = header + rows;
  try {
    fs.writeFileSync(filePath, csvContent, { encoding: "utf-8" });
    logger.info("Data has been saved to", filePath);
  } catch (err) {
    logger.error("Error writing to CSV file:", err);
  }
}

export async function readCookies(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    fs.readFile("loginCookies.txt", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading cookies file:", err);
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}
