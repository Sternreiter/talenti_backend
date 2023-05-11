"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const user_1 = __importDefault(require("./user"));
const product_1 = __importDefault(require("./product"));
const supermarket_1 = __importDefault(require("./supermarket"));
const status_1 = __importDefault(require("./status"));
app.use(user_1.default);
app.use(product_1.default);
app.use(supermarket_1.default);
app.use(status_1.default);
module.exports = app;
