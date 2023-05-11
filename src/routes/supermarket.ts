import express from 'express';
import { supermarket } from '../models/supermarket-model';
import { status } from '../models/status-model';
import { VerifyToken } from '../middelware/autentication';
import { validatorHandler } from '../validator/validator';
import { register_supermarket } from '../schema/supermarket-schema';
const app = express();

app.get('/get_supermarket', VerifyToken, async(_req, res) => {
    try {
        const supermark: any = await supermarket.findAll({include: {model: status, as: 'status'}})

        return res.status(200).json({ status: true, message: "consulta exitosa", supermark})
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
})

app.get('/get_supermarket/:id', VerifyToken, async(req, res) => {
    try {
        const supermark: any = await supermarket.findOne({where: {id: req.params.id},include: {model: status, as: 'status'}})

        return res.status(200).json({ status: true, message: "consulta exitosa", supermark})
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
})

app.post('/register_supermarket', VerifyToken, validatorHandler(register_supermarket, 'body'), async(req, res) => {
    try {
        const supermark: any = await supermarket.create(req.body);

        return res.status(200).json({ status: true, message: "Registro exitoso", supermark})
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
})

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

app.delete('/delete_supermarket/:id', VerifyToken, async(req, res) => {
    try {
        const supermark: any = await supermarket.destroy({where: {id: req.params.id }});

        return res.status(200).json({ status: true, message: "Eliminación exitosa", supermark})
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
})

export default app;