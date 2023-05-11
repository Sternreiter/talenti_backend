"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register_product = void 0;
const joi_1 = __importDefault(require("joi"));
const name = joi_1.default.string();
const description = joi_1.default.string();
const quantity = joi_1.default.number();
const amount = joi_1.default.number();
const expired_at = joi_1.default.string();
const statusId = joi_1.default.number();
const supermarketid = joi_1.default.number();
exports.register_product = joi_1.default.object({
    supermarketid: supermarketid.required(),
    name: name.required(),
    description: description.required(),
    quantity: quantity.required(),
    amount: amount.required(),
    expired_at: expired_at.required(),
    statusId: statusId.required()
});
