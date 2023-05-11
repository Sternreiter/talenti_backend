import express from 'express';
import { supermarket } from '../models/supermarket-model';
import { status } from '../models/status-model';
import { VerifyToken } from '../middelware/autentication';
import { validatorHandler } from '../validator/validator';
import { register_supermarket } from '../schema/supermarket-schema';
const app = express();

/**
 * @swagger
 *  components: 
 *    schemas:
 *      Supermarket:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            description: Name supermarket
 *            default: Forum
 *          description:
 *            type: string
 *            description: description of the supermarket
 *            default: Supermercado Supermayorista
 *          address:
 *            type: string
 *            description: address of the supermarket
 *            default: Los Teques
 *          opening:
 *            type: integer
 *            description: Hour of aperture
 *            default: 9:00
 *          closing:
 *            type: integer
 *            description: Hour of closed
 *            default: 20:00
 *          statusId:
 *            type: integer
 *            description: Id status
 *            default: 1
 */

/**
 * @swagger
 * /api/get_supermarket:
 *  get:
 *    summary: Get Supermarkets
 *    tags: [Supermarket]
 *    responses:
 *      200:
 *        descriptions: Obtain Supermarket
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Supermarket'
 *      404:
 *        descriptions: general error
 */

app.get('/get_supermarket', VerifyToken, async(_req, res) => {
    try {
        const supermark: any = await supermarket.findAll({include: {model: status, as: 'status'}})

        return res.status(200).json({ status: true, message: "consulta exitosa", supermark})
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
})

/**
 * @swagger
 * /api/get_supermarket/{id}:
 *  get:
 *    summary: Get Supermarkets
 *    tags: [Supermarket]
 *    parameters:
 *      -   in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Id of Supermarket
 *    responses:
 *      200:
 *        descriptions: Obtain Supermarket
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Supermarket'
 *      404:
 *        descriptions: general error
 */

app.get('/get_supermarket/:id', VerifyToken, async(req, res) => {
    try {
        const supermark: any = await supermarket.findOne({where: {id: req.params.id},include: {model: status, as: 'status'}})

        return res.status(200).json({ status: true, message: "consulta exitosa", supermark})
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
})

/**
 * @swagger
 * /api/register_supermarket:
 *  post:
 *    summary: Register Supermarket
 *    tags: [Supermarket]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Supermarket'
 *    responses:
 *      200:
 *        descriptions: Register successfull
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Supermarket'
 *      404:
 *        descriptions: general error
 */

app.post('/register_supermarket', VerifyToken, validatorHandler(register_supermarket, 'body'), async(req, res) => {
    try {
        const supermark: any = await supermarket.create(req.body);

        return res.status(200).json({ status: true, message: "Registro exitoso", supermark})
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
})

/**
 * @swagger
 * /api/update_supermarket/{id}:
 *  put:
 *    summary: Update Supermarket
 *    tags: [Supermarket]
 *    parameters:
 *      -   in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Id of Supermarket
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Supermarket'
 *    responses:
 *      200:
 *        descriptions: Update successfull
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Supermarket'
 *      404:
 *        descriptions: general error
 */

app.put('/update_supermarket/:id', VerifyToken, validatorHandler(register_supermarket, 'body'), async(req, res) => {
    try {
        const supermark: any = await supermarket.findOne({where: {id: req.params.id}});
        supermark.name = req.body.name;
        supermark.description = req.body.description;
        supermark.address = req.body.address;
        supermark.opening = req.body.opening;
        supermark.closing = req.body.closing;
        supermark.statusId = req.body.statusId;
        await supermark.save()

        return res.status(200).json({ status: true, message: "Actualización exitosa", supermark})
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
})

/**
 * @swagger
 * /api/delete_supermarket/{id}:
 *  delete:
 *    summary: Delete Supermarket by Id
 *    tags: [Supermarket]
 *    parameters:
 *      -   in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Id of Supermarket
 *    responses:
 *      200:
 *        descriptions: Delete Supermarket
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Supermarket'
 *      404:
 *        descriptions: general error
 */

app.delete('/delete_supermarket/:id', VerifyToken, async(req, res) => {
    try {
        const supermark: any = await supermarket.destroy({where: {id: req.params.id }});

        return res.status(200).json({ status: true, message: "Eliminación exitosa", supermark})
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
})

export default app;