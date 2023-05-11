"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorHandler = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
function validatorHandler(schema, property) {
    return (req, res, next) => {
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            next(res.status(400).json({ status: 400, message: boom_1.default.badRequest(error).message, data: [] }));
        }
        next();
    };
}
exports.validatorHandler = validatorHandler;
