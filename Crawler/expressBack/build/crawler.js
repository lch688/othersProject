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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const superagent_1 = __importDefault(require("superagent"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Crowlar {
    constructor(url, analyser) {
        this.url = url;
        this.analyser = analyser;
        this.filepath = path_1.default.resolve(__dirname, '../data/save.json');
        this.initProcess();
    }
    initProcess() {
        return __awaiter(this, void 0, void 0, function* () {
            let html = yield this.getHtml();
            let jsonData = this.analyser.analyse(html, this.filepath);
            this.saveJsondata(jsonData);
        });
    }
    getHtml() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield superagent_1.default.get(this.url);
            return result.text;
        });
    }
    saveJsondata(content) {
        fs_1.default.writeFileSync(this.filepath, content);
    }
}
exports.default = Crowlar;
