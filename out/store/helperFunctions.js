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
exports.readCookies = exports.saveToCSV = exports.logger = exports.iterateDivClasses = void 0;
var winston = require("winston");
var cheerio = require("cheerio");
var fs = require("fs");
function iterateDivClasses(html) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var $ = cheerio.load(html);
                    var userId = "";
                    try {
                        var scriptElements = $('script[type="application/json"]').toArray();
                        for (var _i = 0, scriptElements_1 = scriptElements; _i < scriptElements_1.length; _i++) {
                            var element = scriptElements_1[_i];
                            var scriptContent = $(element).html();
                            if (scriptContent.includes("profile_id")) {
                                var parsedJSON = JSON.parse(scriptContent);
                                userId =
                                    parsedJSON.require[0][3][0].__bbox.require[3][3][0].initialRouteInfo
                                        .route.hostableView.props.id;
                                break;
                            }
                        }
                    }
                    catch (error) {
                        exports.logger.error("Error parsing JSON from script: ".concat(error));
                        reject(error);
                    }
                    if (userId !== "") {
                        resolve(userId);
                    }
                    else {
                        reject(new Error("userId is not found"));
                    }
                })];
        });
    });
}
exports.iterateDivClasses = iterateDivClasses;
exports.logger = winston.createLogger({
    level: "info", // Set the minimum log level
    format: winston.format.simple(), // Set the log format
    transports: [
        new winston.transports.Console(), // Log to the console
    ],
});
function saveToCSV(data, filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var header, rows, csvContent;
        return __generator(this, function (_a) {
            header = Object.keys(data[0]).join(",") + "\n";
            rows = data.map(function (row) { return Object.values(row).join(",") + "\n"; }).join("");
            csvContent = header + rows;
            try {
                fs.writeFileSync(filePath, csvContent, { encoding: "utf-8" });
                exports.logger.info("Data has been saved to", filePath);
            }
            catch (err) {
                exports.logger.error("Error writing to CSV file:", err);
            }
            return [2 /*return*/];
        });
    });
}
exports.saveToCSV = saveToCSV;
function readCookies() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    fs.readFile("loginCookies.txt", "utf8", function (err, data) {
                        if (err) {
                            console.error("Error reading cookies file:", err);
                            reject(err);
                            return;
                        }
                        resolve(data);
                    });
                })];
        });
    });
}
exports.readCookies = readCookies;
