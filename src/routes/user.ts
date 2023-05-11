import express from 'express';
import {genAccessToken} from '../middelware/autentication';
import bcrypt from 'bcrypt';
import { validatorHandler } from '../validator/validator';
import { login, register } from '../schema/user-schema';
import {user} from '../models/user-model';
const app = express();

app.post('/login', validatorHandler(login, 'body'), async(req, res) => {
    try{
        const login: any = await user.findOne({
            where: {
              email: req.body.email
            }
          })
        if(login){
            const password_valid = await bcrypt.compare(req.body.password, login.password);
            if(password_valid){
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
        return res.status(500).json({ status: false, messagge: "Usuario no encontrado"})
    } catch(error: any) {
        return res.status(500).json({ status: false, messagge: error.message })
    }
    
})

app.post('/register_user', validatorHandler(register, 'body'), async(req, res) =>{
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