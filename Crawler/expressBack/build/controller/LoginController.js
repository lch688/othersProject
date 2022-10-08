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
var PageController = /** @class */ (function () {
    function PageController() {
    }
    PageController_1 = PageController;
    PageController.isLogin = function (req) {
        var status = req.session ? req.session.login : false;
        if (status === undefined) {
            status = false;
        }
        return status;
    };
    PageController.prototype.islogin = function (req, res) {
        var isLogin = PageController_1.isLogin(req);
        console.log(req.session);
        res.json((0, util_1.getResData)(isLogin));
    };
    PageController.prototype.login = function (req, res) {
        var password = req.body.password;
        console.log(req.session);
        var isLogin = PageController_1.isLogin(req);
        if (isLogin) {
            res.json((0, util_1.getResData)(false, 'already login'));
        }
        else {
            if (password === '123' && req.session) {
                req.session.login = true;
                res.json((0, util_1.getResData)(true));
            }
            else {
                res.json((0, util_1.getResData)(false, 'Password Error'));
            }
        }
    };
    PageController.prototype.logout = function (req, res) {
        if (req.session && req.session.login) {
            req.session.login = false;
            res.json((0, util_1.getResData)(true));
        }
        else {
            res.json((0, util_1.getResData)(false, 'have not login yet'));
        }
    };
    var PageController_1;
    __decorate([
        (0, decorator_1.get)('/islogin'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], PageController.prototype, "islogin", null);
    __decorate([
        (0, decorator_1.post)('/login'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], PageController.prototype, "login", null);
    __decorate([
        (0, decorator_1.get)('/logout'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], PageController.prototype, "logout", null);
    PageController = PageController_1 = __decorate([
        (0, decorator_1.controller)('/project/crawler')
    ], PageController);
    return PageController;
}());
