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
const status_1 = __importDefault(require("../routes/status"));
const supertest_1 = __importDefault(require("supertest"));
describe('GET /get_status', () => {
    test('should respond with a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(status_1.default).get('/get_status').send();
        expect(response.statusCode).toBe(200);
    }));
});
describe('POST /register_status', () => {
    test('should respond with a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(status_1.default).post('/register_status').send({
            name: "Activr"
        });
        expect(response.statusCode).toBe(200);
    }));
});
