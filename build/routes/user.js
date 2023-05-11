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
const autentication_1 = require("../middelware/autentication");
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = require("../validator/validator");
const user_schema_1 = require("../schema/user-schema");
const user_model_1 = require("../models/user-model");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/login', (0, validator_1.validatorHandler)(user_schema_1.login, 'body'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const login = yield user_model_1.user.findOne({
            where: {
                email: req.body.email
            }
        });
        if (login) {
            const password_valid = yield bcrypt_1.default.compare(req.body.password, login.password);
            if (password_valid) {
                const token = yield (0, autentication_1.genAccessToken)(req.body.email);
                login.token_user = token;
                yield login.save();
                let data = {
                    id: login.id,
                    email: login.email,
                    name: login.name,
                    token
                };
                return res.status(200).json({ status: true, messagge: "Inicio de sesión exitoso", data });
            }
            return res.status(500).json({ status: false, messagge: "Contraseña invalida" });
        }
        return res.status(500).json({ status: false, messagge: "Usuario no encontrado" });
    }
    catch (error) {
        return res.status(500).json({ status: false, messagge: error.message });
    }
}));
app.post('/register_user', (0, validator_1.validatorHandler)(user_schema_1.register, 'body'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var salt = yield bcrypt_1.default.genSalt(10);
        let data = {
            email: req.body.email,
            password: yield bcrypt_1.default.hash(req.body.password, salt),
            name: req.body.name
        };
        const usermodel = yield user_model_1.user.create(data);
        return res.status(200).json({ usermodel });
    }
    catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}));
exports.default = app;
