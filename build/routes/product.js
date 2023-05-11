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
const supermarket_model_1 = require("../models/supermarket-model");
const app = (0, express_1.default)();
/**
 * @swagger
 *  components:
 *    schemas:
 *      Products:
 *        type: object
 *        properties:
 *          supermarketid:
 *            type: integer
 *            description: Id supermarket
 *            default: 1
 *          name:
 *            type: string
 *            description: Name product
 *            default: ACE
 *          description:
 *            type: string
 *            description: description product
 *            default: Producto de limpieza
 *          quantity:
 *            type: integer
 *            description: quantity of products
 *            default: 10
 *          amount:
 *            type: integer
 *            description: amount of the product
 *            default: 1
 *          expired_at:
 *            type: string
 *            description: expiration date in format MM/DD/YYYY
 *            default: 5/30/2023
 *          statusId:
 *            type: integer
 *            description: Id status
 *            default: 1
 */
/**
 * @swagger
 * /api/get_product_by_supermarket/{id}:
 *  get:
 *    summary: Get Products by supermarketId
 *    tags: [Products]
 *    parameters:
 *      -   in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Id of product
 *    responses:
 *      200:
 *        descriptions: Obtain products
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Products'
 *      404:
 *        descriptions: general error
 */
app.get('/get_product_by_supermarket/:id', autentication_1.VerifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.product.findAll({ where: { supermarketid: req.params.id }, include: [{ model: status_model_1.status, as: 'status' }, { model: supermarket_model_1.supermarket, as: 'supermarket' }] });
        return res.status(200).json({ status: true, message: "consulta exitosa", products });
    }
    catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}));
/**
 * @swagger
 * /api/get_product_by_id/{id}:
 *  get:
 *    summary: Get Products by product Id
 *    tags: [Products]
 *    parameters:
 *      -   in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Id of product
 *    responses:
 *      200:
 *        descriptions: Obtain product
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Products'
 *      404:
 *        descriptions: general error
 */
app.get('/get_product_by_id/:id', autentication_1.VerifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.product.findOne({ where: { id: req.params.id }, include: [{ model: status_model_1.status, as: 'status' }, { model: supermarket_model_1.supermarket, as: 'supermarket' }] });
        return res.status(200).json({ status: true, message: "consulta exitosa", products });
    }
    catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}));
/**
 * @swagger
 * /api/register_product:
 *  post:
 *    summary: Register Product
 *    tags: [Products]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Products'
 *    responses:
 *      200:
 *        descriptions: Register successfull
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Products'
 *      404:
 *        descriptions: general error
 */
app.post('/register_product', autentication_1.VerifyToken, (0, validator_1.validatorHandler)(product_schema_1.register_product, 'body'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.product.create(req.body);
        return res.status(200).json({ status: true, message: "Registro exitoso", products });
    }
    catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}));
/**
 * @swagger
 * /api/update_product/{id}:
 *  put:
 *    summary: Update Product
 *    tags: [Products]
 *    parameters:
 *      -   in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Id of product
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Products'
 *    responses:
 *      200:
 *        descriptions: Update successfull
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Products'
 *      404:
 *        descriptions: general error
 */
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
/**
 * @swagger
 * /api/delete_product/{id}:
 *  delete:
 *    summary: Delete product by Id
 *    tags: [Products]
 *    parameters:
 *      -   in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Id of product
 *    responses:
 *      200:
 *        descriptions: Delete product
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Products'
 *      404:
 *        descriptions: general error
 */
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
