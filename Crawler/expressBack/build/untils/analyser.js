"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var Analyser = /** @class */ (function () {
    function Analyser() {
    }
    Analyser.getinstance = function () {
        if (!this.instance) {
            this.instance = new Analyser();
        }
        return this.instance;
    };
    Analyser.prototype.getInfo = function (html) {
        var infoarray = [];
        var $ = cheerio_1.default.load(html);
        var item = $('.course-item');
        item.map(function (index, element) {
            var des = $(element).find('.course-desc');
            var title = des.eq(0).text();
            var count = parseInt(des.eq(1).text().split('：')[1]);
            infoarray.push({
                title: title,
                count: count
            });
        });
        var finaldata = {
            time: (new Date()).getTime(),
            data: infoarray
        };
        return finaldata;
    };
    Analyser.prototype.makeJsondata = function (finaldata, filepath) {
        var filecontent = {};
        if (fs_1.default.existsSync(filepath)) {
            filecontent = JSON.parse(fs_1.default.readFileSync(filepath, 'utf-8'));
        }
        filecontent[finaldata.time] = finaldata.data;
        return filecontent;
    };
    Analyser.prototype.analyse = function (html, filepath) {
        var finaldata = this.getInfo(html);
        var jsonData = this.makeJsondata(finaldata, filepath);
        return JSON.stringify(jsonData);
    };
    return Analyser;
}());
exports.default = Analyser;
