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
const product_model_1 = require("../models/product-model");
const status_model_1 = require("../models/status-model");
const autentication_1 = require("../middelware/autentication");
const validator_1 = require("../validator/validator");
const product_schema_1 = require("../schema/product-schema");
const app = (0, express_1.default)();
app.get('/get_product_by_supermarket/:id', autentication_1.VerifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.product.findAll({ where: { supermarketid: req.params.id }, include: [{ model: status_model_1.status, as: 'status' }, { model: product_model_1.product, as: 'product' }] });
        return res.status(200).json({ status: true, message: "consulta exitosa", products });
    }
    catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}));
app.get('/get_product_by_id/:id', autentication_1.VerifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.product.findOne({ where: { id: req.params.id }, include: { model: status_model_1.status, as: 'status' } });
        return res.status(200).json({ status: true, message: "consulta exitosa", products });
    }
    catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}));
app.post('/register_product', autentication_1.VerifyToken, (0, validator_1.validatorHandler)(product_schema_1.register_product, 'body'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.product.create(req.body);
        return res.status(200).json({ status: true, message: "Registro exitoso", products });
    }
    catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}));
app.put('/update_product/:id', autentication_1.VerifyToken, (0, validator_1.validatorHandler)(product_schema_1.register_product, 'body'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.product.findOne({ where: { id: req.params.id } });
        products.supermarketid = req.body.supermarketid;
        products.name = req.body.name;
        products.description = req.body.description;
        products.quantity = req.body.quantity;
        products.amount = req.body.amount;
        products.expired_at = req.body.expired_at;
        products.statusId = req.body.statusId;
        yield products.save();
        return res.status(200).json({ status: true, message: "Actualización exitosa", products });
    }
    catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}));
app.delete('/delete_product/:id', autentication_1.VerifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.product.destroy({ where: { id: req.params.id } });
        return res.status(200).json({ status: true, message: "Eliminación exitosa", products });
    }
    catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}));
exports.default = app;
