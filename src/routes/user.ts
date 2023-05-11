import express from 'express';
import { genAccessToken } from '../middelware/autentication';
import bcrypt from 'bcrypt';
import { validatorHandler } from '../validator/validator';
import { login, register } from '../schema/user-schema';
import { user } from '../models/user-model';
const app = express();

app.use(express.json())

/**
 * @swagger
 *  components: 
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *            description: Email login
 *            default: suilppm@gmail.com
 *          password:
 *            type: string
 *            description: Password login
 *            default: 12sd3sdakajasd
 */

/**
 * @swagger
 * /api/login:
 *  post:
 *    summary: Login
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        descriptions: Login successfull
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/User'
 *      404:
 *        descriptions: general error
 */


app.post('/login', validatorHandler(login, 'body'), async (req, res) => {
    try {
        const login: any = await user.findOne({
            where: {
                email: req.body.email
            }
        })
        if (login) {
            const password_valid = await bcrypt.compare(req.body.password, login.password);
            if (password_valid) {
                const token = await genAccessToken(req.body.email)
                login.token_user = token
                await login.save();
                let data = {
                    id: login.id,
                    email: login.email,
                    name: login.name,
                    token
                }
                return res.status(200).json({ status: true, messagge: "Inicio de sesión exitoso", data })
            }
            return res.status(500).json({ status: false, messagge: "Contraseña invalida" })
        }
        return res.status(500).json({ status: false, messagge: "Usuario no encontrado" })
    } catch (error: any) {
        return res.status(500).json({ status: false, messagge: error.message })
    }

})

/**
 * @swagger
 *  components: 
 *    schemas:
 *      UserRegister:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *            description: Email user register
 *            default: suilppm@gmail.com
 *          password:
 *            type: string
 *            description: Password user register
 *            default: 12sd3sdakajasd
 *          name:
 *            type: string
 *            description: Name user register
 *            default: Luis
 */

/**
 * @swagger
 * /api/register_user:
 *  post:
 *    summary: Register User
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/UserRegister'
 *    responses:
 *      200:
 *        descriptions: Register successfull
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/UserRegister'
 *      404:
 *        descriptions: general error
 */

app.post('/register_user', validatorHandler(register, 'body'), async (req, res) => {
    try {
        var salt = await bcrypt.genSalt(10)
        let data = {
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, salt),
            name: req.body.name
        }
        const usermodel = await user.create(data)

        return res.status(200).json({ usermodel })

    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
})

export default app;