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
const product_1 = __importDefault(require("../routes/product"));
const supertest_1 = __importDefault(require("supertest"));
describe('GET /get_product_by_supermarket/:id', () => {
    test('should respond with a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(product_1.default).get('/get_product_by_supermarket/:id').send({
            supermarketid: 1
        });
        expect(response.statusCode).toBe(200);
    }));
});
describe('GET /get_product_by_id/:id', () => {
    test('should respond with a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(product_1.default).get('/get_product_by_id/:id').send({
            id: "1"
        });
        expect(response.statusCode).toBe(200);
    }));
});
describe('POST /register_product', () => {
    test('should respond with a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(product_1.default).post('/register_product').send({
            supermarketid: 1,
            name: "ACE",
            description: "Producto de limpieza",
            quantity: 10,
            amount: 5,
            expired_at: "30/5/2023",
            statusId: 1
        });
        expect(response.statusCode).toBe(200);
    }));
});
describe('PUT /update_product/:id', () => {
    test('should respond with a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(product_1.default).put('/update_product/:id').send({
            supermarketid: 1,
            id: 2,
            name: "ACE",
            description: "Producto de limpieza",
            quantity: 10,
            amount: 5,
            expired_at: "30/5/2023",
            statusId: 1
        });
        expect(response.statusCode).toBe(200);
    }));
});
describe('DELETE /delete_product/:id', () => {
    test('should respond with a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(product_1.default).delete('/delete_product/:id').send({
            id: "1"
        });
        expect(response.statusCode).toBe(200);
    }));
});
