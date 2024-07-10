import axios, { AxiosRequestConfig } from "axios";
import { delay, iterateDivClasses, logger } from "./helperFunctions";

export class InstagramScraper {
  public userName: string;
  public userId?: string;
  public followers: any[] = [];
  public following: any[] = [];
  public currentIndex: Number = 0;
  public errorDelay: number = 2500;
  public waitDelay: number = 500;
  public loginCookies: string;

  constructor(userName: string, loginCookies: string) {
    this.userName = userName;
    this.loginCookies = loginCookies;
  }

  async getUserId() {
    try {
      logger.log("info", "Getting the internal user ID");
      const config: AxiosRequestConfig = {
        method: "GET",
        url: `https://www.instagram.com/${this.userName}/`,
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "max-age=0",
          dpr: "2",
          priority: "u=0, i",
          referer: `https://www.instagram.com/${this.userName}/`,
          "sec-ch-prefers-color-scheme": "dark",
          "sec-ch-ua":
            '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
          "sec-ch-ua-full-version-list":
            '"Google Chrome";v="125.0.6422.142", "Chromium";v="125.0.6422.142", "Not.A/Brand";v="24.0.0.0"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-model": '""',
          "sec-ch-ua-platform": '"macOS"',
          "sec-ch-ua-platform-version": '"14.2.1"',
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
          "viewport-width": "1371",
        },
      };
      await axios
        .request(config)
        .then(async (response) => {
          this.userId = await iterateDivClasses(response.data);
          logger.info("Retrieved userId: " + this.userId);
        })
        .catch((error) => {
          logger.error(error);
          process.exit(1);
        });
    } catch (error) {
      logger.error(error);
      process.exit(1);
    }
  }

  async getFollowers() {
    try {
      if (this.currentIndex === undefined) {
        return;
      }
      logger.log("info", "Getting followers");
      const config: AxiosRequestConfig = {
        method: "GET",
        url: `https://www.instagram.com/api/v1/friendships/${
          this.userId
        }/followers/?count=25&search_surface=follow_list_page${
          this.currentIndex === 0 ? "" : "&max_id=" + this.currentIndex
        }`,
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          priority: "u=1, i",
          referer: `https://www.instagram.com/${this.userName}/followers/`,
          "sec-ch-prefers-color-scheme": "dark",
          "sec-ch-ua":
            '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
          "sec-ch-ua-full-version-list":
            '"Google Chrome";v="125.0.6422.142", "Chromium";v="125.0.6422.142", "Not.A/Brand";v="24.0.0.0"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-model": '""',
          "sec-ch-ua-platform": '"macOS"',
          "sec-ch-ua-platform-version": '"14.2.1"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
          "x-asbd-id": "129477",
          "x-csrftoken": "",
          "x-ig-app-id": "936619743392459",
          "x-ig-www-claim":
            "hmac.AR0l4x8eAXBWHw3kAoyoKGTPv9Usc34bPlv72XAw39uOB2oW",
          "x-requested-with": "XMLHttpRequest",
          cookie: this.loginCookies,
        },
      };
      await axios
        .request(config)
        .then(async (response) => {
          //this.currentIndex = response.data.next_max_id.split('|')[0];
          this.currentIndex = response.data.next_max_id;
          for (const follower of response.data.users) {
            this.followers.push({
              id: follower.id,
              username: follower.username,
              private: follower.is_private,
            });
          }
          logger.info(
            `Current Index: ${this.currentIndex} - Scraped Followers: ${this.followers.length}`
          );

          if (this.currentIndex != 0) {
            await delay(this.waitDelay);
            await this.getFollowers();
          }
          if (this.currentIndex === undefined) {
            return;
          }
        })
        .catch(async (e) => {
          logger.error(
            `${e} Current Index: ${this.currentIndex} - Scraped Followers: ${this.followers.length}`
          );
          await delay(this.errorDelay);
          await this.getFollowers();
        });
    } catch {
      logger.error(
        `Current Index: ${this.currentIndex} - Scraped Followers: ${this.followers.length}`
      );
      await delay(this.errorDelay);
      await this.getFollowers();
    }
  }

  async getFollowing() {
    try {
      if (this.currentIndex === undefined) {
        return;
      }
      logger.log("info", "Getting following");
      const config: AxiosRequestConfig = {
        method: "GET",
        url: `https://www.instagram.com/api/v1/friendships/${
          this.userId
        }/following/?count=25&search_surface=follow_list_page${
          this.currentIndex === 0 ? "" : "&max_id=" + this.currentIndex
        }`,
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          priority: "u=1, i",
          referer: `https://www.instagram.com/${this.userName}/followers/`,
          "sec-ch-prefers-color-scheme": "dark",
          "sec-ch-ua":
            '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
          "sec-ch-ua-full-version-list":
            '"Google Chrome";v="125.0.6422.142", "Chromium";v="125.0.6422.142", "Not.A/Brand";v="24.0.0.0"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-model": '""',
          "sec-ch-ua-platform": '"macOS"',
          "sec-ch-ua-platform-version": '"14.2.1"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
          "x-asbd-id": "129477",
          "x-csrftoken": "",
          "x-ig-app-id": "936619743392459",
          "x-ig-www-claim":
            "hmac.AR0l4x8eAXBWHw3kAoyoKGTPv9Usc34bPlv72XAw39uOB2oW",
          "x-requested-with": "XMLHttpRequest",
          cookie: this.loginCookies,
        },
      };
      await axios
        .request(config)
        .then(async (response) => {
          //this.currentIndex = response.data.next_max_id.split('|')[0];
          this.currentIndex = response.data.next_max_id;
          for (const followee of response.data.users) {
            this.following.push({
              id: followee.id,
              username: followee.username,
              private: followee.is_private,
            });
          }
          logger.info(
            `Current Index: ${this.currentIndex} - Scraped Following: ${this.following.length}`
          );

          if (this.currentIndex != 0) {
            await delay(this.waitDelay);
            await this.getFollowing();
          }
          if (this.currentIndex === undefined) {
            return;
          }
        })
        .catch(async (e) => {
          logger.error(
            `${e} Current Index: ${this.currentIndex} - Scraped Following: ${this.following.length}`
          );
          await delay(this.errorDelay);
          await this.getFollowers();
        });
    } catch {
      logger.error(
        `Current Index: ${this.currentIndex} - Scraped Following: ${this.following.length}`
      );
      await delay(this.errorDelay);
      await this.getFollowers();
    }
  }
}
