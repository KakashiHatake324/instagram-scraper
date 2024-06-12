import {
  getUserInput,
  logger,
  readCookies,
  saveToCSV,
} from "./store/helperFunctions";
import { InstagramScraper } from "./store/scraperClass";

// start function
async function start() {
  const loginCookies: string = await readCookies();
  if (loginCookies == "") {
    logger.error("Issue loading your login cookies");
    process.exit(1);
  }
  logger.info(
    `Got your login cookies (total: ${loginCookies.split(";").length}`
  );

  const userName: string = await getUserInput("Please enter the username: ");
  logger.info(`Will scrape user: ${userName}`);

  logger.info("Initiating the scraper instance");
  const scraper = new InstagramScraper(userName, loginCookies);
  await scraper.getUserId();
  if (!scraper.userId) {
    process.exit(1);
  }
  await scraper.getFollowers();
  logger.info(`Total Followers Scraped: ${scraper.followers.length}`);
  if (scraper.followers.length > 0) {
    await saveToCSV(scraper.followers, "followers.csv");
  }
  scraper.currentIndex = 0;
  await scraper.getFollowing();
  logger.info(`Total Following Scraped: ${scraper.following.length}`);
  if (scraper.following.length > 0) {
    await saveToCSV(scraper.following, "following.csv");
  }

  logger.info(
    `Total Followers: ${scraper.followers.length} - Total Following: ${scraper.following.length}`
  );

  process.exit(1);
}

start();
