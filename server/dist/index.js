"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.SERVER_PORT || 9090;
app.get('/', (req, res, next) => {
    res.send('Example app');
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
