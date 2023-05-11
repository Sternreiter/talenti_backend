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
const supermarket_model_1 = require("../models/supermarket-model");
const status_model_1 = require("../models/status-model");
const autentication_1 = require("../middelware/autentication");
const validator_1 = require("../validator/validator");
const supermarket_schema_1 = require("../schema/supermarket-schema");
const app = (0, express_1.default)();
app.get('/get_supermarket', autentication_1.VerifyToken, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supermark = yield supermarket_model_1.supermarket.findAll({ include: { model: status_model_1.status, as: 'status' } });
        return res.status(200).json({ status: true, message: "consulta exitosa", supermark });
    }
    catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}));
app.get('/get_supermarket/:id', autentication_1.VerifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supermark = yield supermarket_model_1.supermarket.findOne({ where: { id: req.params.id }, include: { model: status_model_1.status, as: 'status' } });
        return res.status(200).json({ status: true, message: "consulta exitosa", supermark });
    }
    catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}));
app.post('/register_supermarket', autentication_1.VerifyToken, (0, validator_1.validatorHandler)(supermarket_schema_1.register_supermarket, 'body'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supermark = yield supermarket_model_1.supermarket.create(req.body);
        return res.status(200).json({ status: true, message: "Registro exitoso", supermark });
    }
    catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}));
app.put('/update_supermarket/:id', autentication_1.VerifyToken, (0, validator_1.validatorHandler)(supermarket_schema_1.register_supermarket, 'body'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supermark = yield supermarket_model_1.supermarket.findOne({ where: { id: req.params.id } });
        supermark.name = req.body.name;
        supermark.description = req.body.description;
        supermark.address = req.body.address;
        supermark.opening = req.body.opening;
        supermark.closing = req.body.closing;
        supermark.statusId = req.body.statusId;
        yield supermark.save();
        return res.status(200).json({ status: true, message: "Actualización exitosa", supermark });
    }
    catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}));
app.delete('/delete_supermarket/:id', autentication_1.VerifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supermark = yield supermarket_model_1.supermarket.destroy({ where: { id: req.params.id } });
        return res.status(200).json({ status: true, message: "Eliminación exitosa", supermark });
    }
    catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}));
exports.default = app;
