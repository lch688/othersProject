"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("./travelProject/travelApi");
require("./controller/LoginController");
require("./controller/dataController");
var decorator_1 = require("./decorator/decorator");
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var app = (0, express_1.default)();
var json = express_1.default.json({ type: '*/json' });
app.use(json);
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: ['chenhaoliu'],
    maxAge: 24 * 60 * 60 * 1000
}));
app.use(decorator_1.router);
app.listen(7001, function () {
    console.log('runing');
});
