"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstagramScraper = void 0;
var axios_1 = require("axios");
var helperFunctions_1 = require("./helperFunctions");
var InstagramScraper = /** @class */ (function () {
    function InstagramScraper(userName, loginCookies) {
        this.followers = [];
        this.following = [];
        this.currentIndex = 0;
        this.userName = userName;
        this.loginCookies = loginCookies;
    }
    InstagramScraper.prototype.getUserId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        helperFunctions_1.logger.log("info", "Getting the internal user ID");
                        config = {
                            method: "GET",
                            url: "https://www.instagram.com/".concat(this.userName, "/"),
                            headers: {
                                accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                                "accept-language": "en-US,en;q=0.9",
                                "cache-control": "max-age=0",
                                dpr: "2",
                                priority: "u=0, i",
                                referer: "https://www.instagram.com/".concat(this.userName, "/"),
                                "sec-ch-prefers-color-scheme": "dark",
                                "sec-ch-ua": '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
                                "sec-ch-ua-full-version-list": '"Google Chrome";v="125.0.6422.142", "Chromium";v="125.0.6422.142", "Not.A/Brand";v="24.0.0.0"',
                                "sec-ch-ua-mobile": "?0",
                                "sec-ch-ua-model": '""',
                                "sec-ch-ua-platform": '"macOS"',
                                "sec-ch-ua-platform-version": '"14.2.1"',
                                "sec-fetch-dest": "document",
                                "sec-fetch-mode": "navigate",
                                "sec-fetch-site": "same-origin",
                                "sec-fetch-user": "?1",
                                "upgrade-insecure-requests": "1",
                                "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
                                "viewport-width": "1371",
                            },
                        };
                        return [4 /*yield*/, axios_1.default
                                .request(config)
                                .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _a = this;
                                            return [4 /*yield*/, (0, helperFunctions_1.iterateDivClasses)(response.data)];
                                        case 1:
                                            _a.userId = _b.sent();
                                            helperFunctions_1.logger.info("Retrieved userId: " + this.userId);
                                            return [2 /*return*/];
                                    }
                                });
                            }); })
                                .catch(function (error) {
                                helperFunctions_1.logger.error(error);
                                process.exit(1);
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        helperFunctions_1.logger.error(error_1);
                        process.exit(1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InstagramScraper.prototype.getFollowers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.currentIndex === undefined) {
                            return [2 /*return*/];
                        }
                        helperFunctions_1.logger.log("info", "Getting followers");
                        config = {
                            method: "GET",
                            url: "https://www.instagram.com/api/v1/friendships/".concat(this.userId, "/followers/?count=25&search_surface=follow_list_page").concat(this.currentIndex === 0 ? "" : "&max_id=" + this.currentIndex),
                            headers: {
                                accept: "*/*",
                                "accept-language": "en-US,en;q=0.9",
                                priority: "u=1, i",
                                referer: "https://www.instagram.com/".concat(this.userName, "/followers/"),
                                "sec-ch-prefers-color-scheme": "dark",
                                "sec-ch-ua": '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
                                "sec-ch-ua-full-version-list": '"Google Chrome";v="125.0.6422.142", "Chromium";v="125.0.6422.142", "Not.A/Brand";v="24.0.0.0"',
                                "sec-ch-ua-mobile": "?0",
                                "sec-ch-ua-model": '""',
                                "sec-ch-ua-platform": '"macOS"',
                                "sec-ch-ua-platform-version": '"14.2.1"',
                                "sec-fetch-dest": "empty",
                                "sec-fetch-mode": "cors",
                                "sec-fetch-site": "same-origin",
                                "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
                                "x-asbd-id": "129477",
                                "x-csrftoken": "bDUgLVjrLG948yR5rV0Zot9O4tSDsgfQ",
                                "x-ig-app-id": "936619743392459",
                                "x-ig-www-claim": "hmac.AR0l4x8eAXBWHw3kAoyoKGTPv9Usc34bPlv72XAw39uOB2oW",
                                "x-requested-with": "XMLHttpRequest",
                                cookie: this.loginCookies,
                            },
                        };
                        return [4 /*yield*/, axios_1.default
                                .request(config)
                                .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                var _i, _a, follower;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            //this.currentIndex = response.data.next_max_id.split('|')[0];
                                            this.currentIndex = response.data.next_max_id;
                                            for (_i = 0, _a = response.data.users; _i < _a.length; _i++) {
                                                follower = _a[_i];
                                                this.followers.push({
                                                    id: follower.id,
                                                    username: follower.username,
                                                    private: follower.is_private,
                                                });
                                            }
                                            helperFunctions_1.logger.info("Current Index: ".concat(this.currentIndex, " - Scraped Followers: ").concat(this.followers.length));
                                            if (!(this.currentIndex != 0)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.getFollowers()];
                                        case 1:
                                            _b.sent();
                                            _b.label = 2;
                                        case 2:
                                            if (this.currentIndex === undefined) {
                                                return [2 /*return*/];
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); })
                                .catch(function (error) {
                                helperFunctions_1.logger.error(error);
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        helperFunctions_1.logger.error(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InstagramScraper.prototype.getFollowing = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config, error_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.currentIndex === undefined) {
                            return [2 /*return*/];
                        }
                        helperFunctions_1.logger.log("info", "Getting following");
                        config = {
                            method: "GET",
                            url: "https://www.instagram.com/api/v1/friendships/".concat(this.userId, "/following/?count=25&search_surface=follow_list_page").concat(this.currentIndex === 0 ? "" : "&max_id=" + this.currentIndex),
                            headers: {
                                accept: "*/*",
                                "accept-language": "en-US,en;q=0.9",
                                priority: "u=1, i",
                                referer: "https://www.instagram.com/".concat(this.userName, "/followers/"),
                                "sec-ch-prefers-color-scheme": "dark",
                                "sec-ch-ua": '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
                                "sec-ch-ua-full-version-list": '"Google Chrome";v="125.0.6422.142", "Chromium";v="125.0.6422.142", "Not.A/Brand";v="24.0.0.0"',
                                "sec-ch-ua-mobile": "?0",
                                "sec-ch-ua-model": '""',
                                "sec-ch-ua-platform": '"macOS"',
                                "sec-ch-ua-platform-version": '"14.2.1"',
                                "sec-fetch-dest": "empty",
                                "sec-fetch-mode": "cors",
                                "sec-fetch-site": "same-origin",
                                "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
                                "x-asbd-id": "129477",
                                "x-csrftoken": "bDUgLVjrLG948yR5rV0Zot9O4tSDsgfQ",
                                "x-ig-app-id": "936619743392459",
                                "x-ig-www-claim": "hmac.AR0l4x8eAXBWHw3kAoyoKGTPv9Usc34bPlv72XAw39uOB2oW",
                                "x-requested-with": "XMLHttpRequest",
                                cookie: this.loginCookies,
                            },
                        };
                        return [4 /*yield*/, axios_1.default
                                .request(config)
                                .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                var _i, _a, followee;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            //this.currentIndex = response.data.next_max_id.split('|')[0];
                                            this.currentIndex = response.data.next_max_id;
                                            for (_i = 0, _a = response.data.users; _i < _a.length; _i++) {
                                                followee = _a[_i];
                                                this.following.push({
                                                    id: followee.id,
                                                    username: followee.username,
                                                    private: followee.is_private,
                                                });
                                            }
                                            helperFunctions_1.logger.info("Current Index: ".concat(this.currentIndex, " - Scraped Following: ").concat(this.following.length));
                                            if (!(this.currentIndex != 0)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.getFollowing()];
                                        case 1:
                                            _b.sent();
                                            _b.label = 2;
                                        case 2:
                                            if (this.currentIndex === undefined) {
                                                return [2 /*return*/];
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); })
                                .catch(function (error) {
                                helperFunctions_1.logger.error(error);
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        helperFunctions_1.logger.error(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return InstagramScraper;
}());
exports.InstagramScraper = InstagramScraper;
