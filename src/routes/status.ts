import express from 'express';
import { status } from '../models/status-model';
import { VerifyToken } from '../middelware/autentication';
const app = express();

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

app.get('/get_status', VerifyToken, async (_req, res) => {
    try {
        const statu = await status.findAll();

        return res.status(200).json({ status: true, message: "consulta exitosa", statu })
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
})

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

app.post('/register_status', VerifyToken, async (req, res) => {
    try {
        const statu = await status.create(req.body)
        return res.status(200).json({ status: true, message: "Registro exitoso", statu })
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
})

export default app;