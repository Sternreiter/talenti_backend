"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const moment_1 = __importDefault(require("moment"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
const PORT = 3000;
app.get('/', (_, res) => {
    res.send({
        date: (0, moment_1.default)().format('YYYY-MM-DD[T]HH:mm:ss.SSSZ')
    });
});
app.use('/api', require('./routes/index'));
app.listen(PORT, () => {
    console.log(`escuchando el puerto ${PORT}`);
});
