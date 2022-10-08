"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = exports.Use = exports.controller = exports.router = void 0;
var express_1 = require("express");
exports.router = (0, express_1.Router)();
var Methods;
(function (Methods) {
    Methods["get"] = "get";
    Methods["post"] = "post";
})(Methods || (Methods = {}));
function controller(target) {
    for (var key in target.prototype) {
        var path = Reflect.getMetadata('path', target.prototype, key);
        var method = Reflect.getMetadata('method', target.prototype, key);
        var handler = target.prototype[key];
        var middleware = Reflect.getMetadata('middleware', target.prototype, key);
        if (path && method && handler) {
            if (middleware) {
                exports.router[method](path, middleware, handler);
            }
            else {
                exports.router[method](path, handler);
            }
        }
    }
}
exports.controller = controller;
function Use(middle) {
    return function (target, key) {
        Reflect.defineMetadata('middleware', middle, target, key);
    };
}
exports.Use = Use;
function makeRequetMethodt(method) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', method, target, key);
        };
    };
}
exports.get = makeRequetMethodt(Methods.get);
exports.post = makeRequetMethodt(Methods.post);
