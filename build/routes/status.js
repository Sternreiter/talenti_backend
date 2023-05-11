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
const status_model_1 = require("../models/status-model");
const autentication_1 = require("../middelware/autentication");
const app = (0, express_1.default)();
/**
 * @swagger
 *  components:
 *    schemas:
 *      Status:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            description: Status name
 *            default: Activo
 */
/**
 * @swagger
 * /api/get_status:
 *  get:
 *    summary: Get Status
 *    tags: [Status]
 *    responses:
 *      200:
 *        descriptions: number of register
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Status'
 *      404:
 *        descriptions: general error
 */
app.get('/get_status', autentication_1.VerifyToken, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const statu = yield status_model_1.status.findAll();
        return res.status(200).json({ status: true, message: "consulta exitosa", statu });
    }
    catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}));
/**
 * @swagger
 * /api/register_status:
 *  post:
 *    summary: Get Status
 *    tags: [Status]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Status'
 *    responses:
 *      200:
 *        descriptions: Register successfull
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Status'
 *      404:
 *        descriptions: General error
 */
app.post('/register_status', autentication_1.VerifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const statu = yield status_model_1.status.create(req.body);
        return res.status(200).json({ status: true, message: "Registro exitoso", statu });
    }
    catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}));
exports.default = app;
