"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.post = exports.get = exports.Use = exports.controller = exports.router = void 0;
var express_1 = require("express");
exports.router = (0, express_1.Router)();
var Methods;
(function (Methods) {
    Methods["get"] = "get";
    Methods["post"] = "post";
    Methods["delete"] = "delete";
})(Methods || (Methods = {}));
function controller(root) {
    return function controller(target) {
        for (var key in target.prototype) {
            var path = Reflect.getMetadata('path', target.prototype, key);
            var method = Reflect.getMetadata('method', target.prototype, key);
            var handler = target.prototype[key];
            var middlewares = Reflect.getMetadata('middlewares', target.prototype, key);
            if (path && method && handler) {
                var fullpath = root === '/' ? path : "".concat(root).concat(path);
                fullpath = path === '/' ? root : fullpath;
                if (middlewares) {
                    exports.router[method].apply(exports.router, __spreadArray(__spreadArray([fullpath], middlewares, false), [handler], false));
                }
                else {
                    exports.router[method](fullpath, handler);
                }
            }
        }
    };
}
exports.controller = controller;
function Use(middle) {
    return function (target, key) {
        var originMiddlewares = Reflect.getMetadata('middlewares', target, key) || [];
        originMiddlewares.push(middle);
        Reflect.defineMetadata('middlewares', originMiddlewares, target, key);
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
exports.Delete = makeRequetMethodt(Methods.delete);
