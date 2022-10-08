"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var crawler_1 = __importDefault(require("./untils/crawler"));
var analyser_1 = __importDefault(require("./untils/analyser"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var util_1 = require("./untils/util");
var checkLogin = function (req, res, next) {
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        next();
    }
    else {
        res.json((0, util_1.getResData)('', 'you need to login'));
    }
};
var router = (0, express_1.Router)();
router.get('/', function (req, res) {
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.send("\n    <html>\n        <body>\n            <div>already login</div>\n            <a href='/logout'>exit</a>\n             <a href='/getfunction'>use function</a>\n        </body>\n    </html>\n        ");
    }
    else {
        res.send("\n     <html>\n        <body>\n            <form method=\"post\" action=\"/login\">\n                <input type='password' name='password'>\n                <button>submit</button>\n            </form>\n        </body>\n    </html>");
    }
});
router.get('/logout', function (req, res) {
    if (req.session) {
        req.session.login = false;
    }
    res.json((0, util_1.getResData)('logout sucecc'));
});
router.post('/login', function (req, res) {
    var password = req.body.password;
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.json((0, util_1.getResData)('', 'already lgoin'));
    }
    else {
        if (password === '123' && req.session) {
            req.session.login = true;
            res.send(" \n                <html>\n                    <body>\n                        <div>login sucess</div>\n                        <a href='/logout'>exit</a>\n                        <a href='/getfunction'>use function</a>\n                        \n                    </body>\n                </html>\n");
        }
        else {
            res.send(" \n                <html>\n                    <body>\n                        <div>passwoed error!</div>\n                        <a href='/'>back</a>\n                        \n                        \n                    </body>\n                </html>\n            ");
        }
    }
});
router.get('/getfunction', checkLogin, function (req, res) {
    res.send(" \n            <html>\n                <body>\n       \n                    <a href='/logout'>exit</a>\n                    <a href='/getdata'>crawler data</a>\n                    <a href='/showdata'>show data</a>\n                    \n                </body>\n            </html>\n            ");
});
router.get('/getdata', checkLogin, function (req, res) {
    var secret = 'secretKey';
    var url = 'http://www.dell-lee.com/typescript/demo.html?secret=' + secret;
    var analeser = analyser_1.default.getinstance();
    var c = new crawler_1.default(url, analeser);
    res.json((0, util_1.getResData)(true));
});
router.get('/showdata', checkLogin, function (req, res) {
    try {
        var location_1 = path_1.default.resolve(__dirname, '../data/save.json');
        var content = fs_1.default.readFileSync(location_1, 'utf-8');
        res.json((0, util_1.getResData)(JSON.parse(content)));
    }
    catch (e) {
        res.json((0, util_1.getResData)('', 'no data'));
    }
});
exports.default = router;
