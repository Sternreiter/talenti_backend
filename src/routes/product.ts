import express from 'express';
import { product } from '../models/product-model';
import { status } from '../models/status-model';
import { VerifyToken } from '../middelware/autentication';
import { validatorHandler } from '../validator/validator';
import { register_product } from '../schema/product-schema';
import { supermarket } from '../models/supermarket-model';
const app = express();

/**
 * @swagger
 *  components: 
 *    schemas:
 *      Products:
 *        type: object
 *        properties:
 *          supermarketid:
 *            type: integer
 *            description: Id supermarket
 *            default: 1
 *          name:
 *            type: string
 *            description: Name product
 *            default: ACE
 *          description:
 *            type: string
 *            description: description product
 *            default: Producto de limpieza
 *          quantity:
 *            type: integer
 *            description: quantity of products
 *            default: 10
 *          amount:
 *            type: integer
 *            description: amount of the product
 *            default: 1
 *          expired_at:
 *            type: string
 *            description: expiration date in format MM/DD/YYYY
 *            default: 5/30/2023
 *          statusId:
 *            type: integer
 *            description: Id status
 *            default: 1
 */

/**
 * @swagger
 * /api/get_product_by_supermarket/{id}:
 *  get:
 *    summary: Get Products by supermarketId
 *    tags: [Products]
 *    parameters:
 *      -   in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Id of product
 *    responses:
 *      200:
 *        descriptions: Obtain products
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Products'
 *      404:
 *        descriptions: general error
 */

app.get('/get_product_by_supermarket/:id', VerifyToken, async(req, res) => {
    try {
        const products: any = await product.findAll({where: {supermarketid: req.params.id}, include: [{model: status, as: 'status'}, {model: supermarket, as: 'supermarket'}]})

        return res.status(200).json({ status: true, message: "consulta exitosa", products})
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
})

/**
 * @swagger
 * /api/get_product_by_id/{id}:
 *  get:
 *    summary: Get Products by product Id
 *    tags: [Products]
 *    parameters:
 *      -   in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Id of product
 *    responses:
 *      200:
 *        descriptions: Obtain product
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Products'
 *      404:
 *        descriptions: general error
 */


app.get('/get_product_by_id/:id', VerifyToken, async(req, res) => {
    try {
        const products: any = await product.findOne({where: {id: req.params.id},include: [{model: status, as: 'status'}, {model: supermarket, as: 'supermarket'}]})

        return res.status(200).json({ status: true, message: "consulta exitosa", products})
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
})

/**
 * @swagger
 * /api/register_product:
 *  post:
 *    summary: Register Product
 *    tags: [Products]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Products'
 *    responses:
 *      200:
 *        descriptions: Register successfull
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Products'
 *      404:
 *        descriptions: general error
 */

app.post('/register_product', VerifyToken, validatorHandler(register_product, 'body'), async(req, res) => {
    try {
        const products: any = await product.create(req.body);

        return res.status(200).json({ status: true, message: "Registro exitoso", products})
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
})

/**
 * @swagger
 * /api/update_product/{id}:
 *  put:
 *    summary: Update Product
 *    tags: [Products]
 *    parameters:
 *      -   in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Id of product
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Products'
 *    responses:
 *      200:
 *        descriptions: Update successfull
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Products'
 *      404:
 *        descriptions: general error
 */

app.put('/update_product/:id', VerifyToken, validatorHandler(register_product, 'body'), async(req, res) => {
    try {
        const products: any = await product.findOne({where: {id: req.params.id}});
        products.supermarketid = req.body.supermarketid;
        products.name = req.body.name;
        products.description = req.body.description;
        products.quantity = req.body.quantity;
        products.amount = req.body.amount;
        products.expired_at = req.body.expired_at;
        products.statusId = req.body.statusId;
        await products.save()

        return res.status(200).json({ status: true, message: "Actualización exitosa", products})
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
})

/**
 * @swagger
 * /api/delete_product/{id}:
 *  delete:
 *    summary: Delete product by Id
 *    tags: [Products]
 *    parameters:
 *      -   in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: Id of product
 *    responses:
 *      200:
 *        descriptions: Delete product
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Products'
 *      404:
 *        descriptions: general error
 */


app.delete('/delete_product/:id', VerifyToken, async(req, res) => {
    try {
        const products: any = await product.destroy({where: {id: req.params.id }});

        return res.status(200).json({ status: true, message: "Eliminación exitosa", products})
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
})

export default app;