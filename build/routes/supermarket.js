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
/**
 * @swagger
 *  components:
 *    schemas:
 *      Supermarket:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            description: Name supermarket
 *            default: Forum
 *          description:
 *            type: string
 *            description: description of the supermarket
 *            default: Supermercado Supermayorista
 *          address:
 *            type: string
 *            description: address of the supermarket
 *            default: Los Teques
 *          opening:
 *            type: integer
 *            description: Hour of aperture
 *            default: 9:00
 *          closing:
 *            type: integer
 *            description: Hour of closed
 *            default: 20:00
 *          statusId:
 *            type: integer
 *            description: Id status
 *            default: 1
 */
/**
 * @swagger
 * /api/get_supermarket:
 *  get:
 *    summary: Get Supermarkets
 *    tags: [Supermarket]
 *    responses:
 *      200:
 *        descriptions: Obtain Supermarket
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Supermarket'
 *      404:
 *        descriptions: general error
 */
app.get('/get_supermarket', autentication_1.VerifyToken, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supermark = yield supermarket_model_1.supermarket.findAll({ include: { model: status_model_1.status, as: 'status' } });
        return res.status(200).json({ status: true, message: "consulta exitosa", supermark });
    }
    catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}));
/**
 * @swagger
 * /api/get_supermarket/{id}:
 *  get:
 *    summary: Get Supermarkets
 *    tags: [Supermarket]
 *    parameters:
 *      -   in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Id of Supermarket
 *    responses:
 *      200:
 *        descriptions: Obtain Supermarket
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Supermarket'
 *      404:
 *        descriptions: general error
 */
app.get('/get_supermarket/:id', autentication_1.VerifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supermark = yield supermarket_model_1.supermarket.findOne({ where: { id: req.params.id }, include: { model: status_model_1.status, as: 'status' } });
        return res.status(200).json({ status: true, message: "consulta exitosa", supermark });
    }
    catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}));
/**
 * @swagger
 * /api/register_supermarket:
 *  post:
 *    summary: Register Supermarket
 *    tags: [Supermarket]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Supermarket'
 *    responses:
 *      200:
 *        descriptions: Register successfull
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Supermarket'
 *      404:
 *        descriptions: general error
 */
app.post('/register_supermarket', autentication_1.VerifyToken, (0, validator_1.validatorHandler)(supermarket_schema_1.register_supermarket, 'body'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supermark = yield supermarket_model_1.supermarket.create(req.body);
        return res.status(200).json({ status: true, message: "Registro exitoso", supermark });
    }
    catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}));
/**
 * @swagger
 * /api/update_supermarket/{id}:
 *  put:
 *    summary: Update Supermarket
 *    tags: [Supermarket]
 *    parameters:
 *      -   in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Id of Supermarket
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Supermarket'
 *    responses:
 *      200:
 *        descriptions: Update successfull
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Supermarket'
 *      404:
 *        descriptions: general error
 */
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
/**
 * @swagger
 * /api/delete_supermarket/{id}:
 *  delete:
 *    summary: Delete Supermarket by Id
 *    tags: [Supermarket]
 *    parameters:
 *      -   in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Id of Supermarket
 *    responses:
 *      200:
 *        descriptions: Delete Supermarket
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Supermarket'
 *      404:
 *        descriptions: general error
 */
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
