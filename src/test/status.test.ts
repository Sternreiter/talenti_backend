import app from '../routes/status'
import request from 'supertest'

describe('GET /get_status', () =>{
    test('should respond with a 200 status code', async() =>{
        const response = await request(app).get('/get_status').send()
        expect(response.statusCode).toBe(200)
    })
})

describe('POST /register_status', () =>{
    test('should respond with a 200 status code', async() =>{
        const response = await request(app).post('/register_status').send({
            name: "Activr"
        })
        expect(response.statusCode).toBe(200)
    })
})