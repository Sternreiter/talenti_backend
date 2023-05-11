"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const moment_1 = __importDefault(require("moment"));
const database_1 = require("./database/database");
require("./models/models");
require('dotenv').config();
const app = (0, express_1.default)();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield database_1.sequelize.sync();
            app.use(body_parser_1.default.urlencoded({ extended: false }));
            app.use(body_parser_1.default.json());
            app.use((0, cors_1.default)({
                'allowedHeaders': ['sessionId', 'Content-Type', 'Authorization'],
                'exposedHeaders': ['sessionId'],
                'origin': '*',
                'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
                'preflightContinue': false
            }));
            const PORT = process.env.PORT;
            app.get('/', (_, res) => {
                res.send({
                    date: (0, moment_1.default)().format('YYYY-MM-DD[T]HH:mm:ss.SSSZ')
                });
            });
            app.use('/api', require('./routes/index'));
            app.listen(PORT, () => {
                console.log(`escuchando el puerto ${PORT}`);
            });
        }
        catch (e) {
            console.log("Unable to connect to the database", e);
        }
    });
}
main();
