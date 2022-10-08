"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var decorator_1 = require("../decorator/decorator");
var util_1 = require("../untils/util");
var crawler_1 = __importDefault(require("../untils/crawler"));
var analyser_1 = __importDefault(require("../untils/analyser"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var checkLogin = function (req, res, next) {
    var isLogin = !!(req.session ? req.session.login : false);
    if (isLogin) {
        next();
    }
    else {
        res.json((0, util_1.getResData)(false, 'you need to login'));
    }
};
var DataController = /** @class */ (function () {
    function DataController() {
    }
    DataController.prototype.getdata = function (req, res) {
        try {
            var secret = 'secretKey';
            var url = 'http://www.dell-lee.com/typescript/demo.html?secret=' + secret;
            var analeser = analyser_1.default.getinstance();
            var c = new crawler_1.default(url, analeser);
            res.json((0, util_1.getResData)(true));
        }
        catch (err) {
            res.json((0, util_1.getResData)(false, 'failed to crawler'));
        }
    };
    DataController.prototype.showdata = function (req, res) {
        try {
            var location_1 = path_1.default.resolve(__dirname, '../../data/crawler/save.json');
            var content = fs_1.default.readFileSync(location_1, 'utf-8');
            res.json((0, util_1.getResData)(JSON.parse(content)));
        }
        catch (e) {
            res.json((0, util_1.getResData)(false, 'no data'));
        }
    };
    __decorate([
        (0, decorator_1.get)('/getdata'),
        (0, decorator_1.Use)(checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], DataController.prototype, "getdata", null);
    __decorate([
        (0, decorator_1.get)('/showdata'),
        (0, decorator_1.Use)(checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], DataController.prototype, "showdata", null);
    DataController = __decorate([
        (0, decorator_1.controller)('/project/crawler')
    ], DataController);
    return DataController;
}());
