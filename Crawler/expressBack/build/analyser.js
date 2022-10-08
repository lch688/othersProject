"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const fs_1 = __importDefault(require("fs"));
class Analyser {
    constructor() {
    }
    static getinstance() {
        if (!this.instance) {
            this.instance = new Analyser();
        }
        return this.instance;
    }
    getInfo(html) {
        const infoarray = [];
        const $ = cheerio_1.default.load(html);
        const item = $('.course-item');
        item.map((index, element) => {
            let des = $(element).find('.course-desc');
            let title = des.eq(0).text();
            let count = parseInt(des.eq(1).text().split('：')[1]);
            infoarray.push({
                title, count
            });
        });
        const finaldata = {
            time: (new Date()).getTime(),
            data: infoarray
        };
        return finaldata;
    }
    makeJsondata(finaldata, filepath) {
        let filecontent = {};
        if (fs_1.default.existsSync(filepath)) {
            filecontent = JSON.parse(fs_1.default.readFileSync(filepath, 'utf-8'));
        }
        filecontent[finaldata.time] = finaldata.data;
        return filecontent;
    }
    analyse(html, filepath) {
        let finaldata = this.getInfo(html);
        let jsonData = this.makeJsondata(finaldata, filepath);
        return JSON.stringify(jsonData);
    }
}
exports.default = Analyser;
