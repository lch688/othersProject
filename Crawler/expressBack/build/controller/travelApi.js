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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var decorator_1 = require("../decorator/decorator");
var util_1 = require("../untils/util");
var travelAPi = /** @class */ (function () {
    function travelAPi() {
    }
    travelAPi.isLogin = function (req) {
        var status = req.session ? req.session.login : false;
        if (status === undefined) {
            status = false;
        }
        return status;
    };
    travelAPi.prototype.islogin = function (req, res) {
        res.json((0, util_1.getResData)("aaa"));
    };
    travelAPi.prototype.login = function (req, res) {
    };
    __decorate([
        (0, decorator_1.get)('/getproducts'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], travelAPi.prototype, "islogin", null);
    __decorate([
        (0, decorator_1.post)('/login'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], travelAPi.prototype, "login", null);
    travelAPi = __decorate([
        (0, decorator_1.controller)('/api/travel')
    ], travelAPi);
    return travelAPi;
}());
