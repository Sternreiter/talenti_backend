import express from 'express';
import { status } from '../models/status-model';
import { VerifyToken } from '../middelware/autentication';
const app = express();

app.get('/get_status', VerifyToken, async(_req,res) => {
    try {
        const statu = await status.findAll();

        return res.status(200).json({ status: true, message: "consulta exitosa", statu })
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message })
    }
})

app.post('/register_status', VerifyToken, async(req,res) => {
    try {
        const statu = await status.create(req.body)
        return res.status(200).json({ status: true, message: "Registro exitoso", statu})
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message})
    }
})

export default app;