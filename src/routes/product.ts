import express from 'express';
import { product } from '../models/product-model';
import { status } from '../models/status-model';
import { VerifyToken } from '../middelware/autentication';
import { validatorHandler } from '../validator/validator';
import { register_product } from '../schema/product-schema';
import { supermarket } from '../models/supermarket-model';
const app = express();

app.get('/get_product_by_supermarket/:id', VerifyToken, async(req, res) => {
    try {
        const products: any = await product.findAll({where: {supermarketid: req.params.id}, include: [{model: status, as: 'status'}, {model: supermarket, as: 'supermarket'}]})

        return res.status(200).json({ status: true, message: "consulta exitosa", products})
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
})

app.get('/get_product_by_id/:id', VerifyToken, async(req, res) => {
    try {
        const products: any = await product.findOne({where: {id: req.params.id},include: [{model: status, as: 'status'}, {model: supermarket, as: 'supermarket'}]})

        return res.status(200).json({ status: true, message: "consulta exitosa", products})
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
})

app.post('/register_product', VerifyToken, validatorHandler(register_product, 'body'), async(req, res) => {
    try {
        const products: any = await product.create(req.body);

        return res.status(200).json({ status: true, message: "Registro exitoso", products})
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
})

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

app.delete('/delete_product/:id', VerifyToken, async(req, res) => {
    try {
        const products: any = await product.destroy({where: {id: req.params.id }});

        return res.status(200).json({ status: true, message: "Eliminación exitosa", products})
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
})

export default app;