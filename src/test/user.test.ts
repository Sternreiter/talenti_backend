import app from '../routes/user'
import request from 'supertest'

describe('POST /login', () =>{
    test('should respond with a 200 status code', async() =>{
        const response = await request(app).post('/login').send({
            email: "suilppm@gmail.com",
	        password: "12sd3sdakajasd"
        })
        expect(response.statusCode).toBe(200)
    })
})

describe('POST /register_user', () =>{
    test('should respond with a 200 status code', async() =>{
        const response = await request(app).post('/register_user').send({
            email: "suilp@gmail.com",
	        password: "12sd3sdakajasd",
            name: "luis"
        })
        expect(response.statusCode).toBe(400)
    })
})