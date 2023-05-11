"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register_supermarket = void 0;
const joi_1 = __importDefault(require("joi"));
const address = joi_1.default.string();
const description = joi_1.default.string();
const name = joi_1.default.string();
const opening = joi_1.default.string();
const closing = joi_1.default.string();
const statusId = joi_1.default.number();
exports.register_supermarket = joi_1.default.object({
    address: address.required(),
    description: description.required(),
    name: name.required(),
    opening: opening.required(),
    closing: closing.required(),
    statusId: statusId.required()
});
