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
const supermarket_1 = __importDefault(require("../routes/supermarket"));
const supertest_1 = __importDefault(require("supertest"));
describe('GET /get_supermarket', () => {
    test('should respond with a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(supermarket_1.default).get('/get_supermarket').send({});
        expect(response.statusCode).toBe(200);
    }));
});
describe('GET /get_supermarket/:id', () => {
    test('should respond with a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(supermarket_1.default).get('/get_supermarket/:id').send({
            id: "1"
        });
        expect(response.statusCode).toBe(200);
    }));
});
describe('POST /register_supermarket', () => {
    test('should respond with a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(supermarket_1.default).post('/register_supermarket').send({
            name: "Forum",
            description: "Supermercado Mayorista",
            address: "Los Teques",
            opening: "9:00",
            closing: "23:00",
            statusId: 1
        });
        expect(response.statusCode).toBe(200);
    }));
});
describe('PUT /update_supermarket/:id', () => {
    test('should respond with a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(supermarket_1.default).put('/update_supermarket/:id').send({
            id: 2,
            name: "Forum",
            description: "Supermercado Mayorista",
            address: "Los Teques",
            opening: "9:00",
            closing: "23:00",
            statusId: 1
        });
        expect(response.statusCode).toBe(200);
    }));
});
describe('DELETE /delete_supermarket/:id', () => {
    test('should respond with a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(supermarket_1.default).delete('/delete_supermarket/:id').send({
            id: "1"
        });
        expect(response.statusCode).toBe(200);
    }));
});
