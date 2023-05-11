"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyToken = exports.genAccessToken = void 0;
/* importar libreria jsonwebtoken */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/*   Generar token*/
let genAccessToken = (user = '') => {
    const SEED_AUTENTICACION = 'hola';
    return jsonwebtoken_1.default.sign({
        user
    }, SEED_AUTENTICACION, { expiresIn: '10m' });
};
exports.genAccessToken = genAccessToken;
/* Autenticar token */
let VerifyToken = (req, res, next) => {
    let token = req.get('Authorization');
    const SEED_AUTENTICACION = 'hola';
    jsonwebtoken_1.default.verify(token, SEED_AUTENTICACION, (err, decoded) => {
        if (err) {
            return res.status(200).json({
                status: 302,
                message: 'Token Invalido',
            });
        }
        req.usuario = decoded.user;
        next();
    });
    /*res.json({
        token:token
    });*/
};
exports.VerifyToken = VerifyToken;
