import app from '../routes/supermarket'
import request from 'supertest'

describe('GET /get_supermarket', () =>{
    test('should respond with a 200 status code', async() =>{
        const response = await request(app).get('/get_supermarket').send({})
        expect(response.statusCode).toBe(200)
    })
})

describe('GET /get_supermarket/:id', () =>{
    test('should respond with a 200 status code', async() =>{
        const response = await request(app).get('/get_supermarket/:id').send({
            id: "1"
        })
        expect(response.statusCode).toBe(200)
    })
})

describe('POST /register_supermarket', () =>{
    test('should respond with a 200 status code', async() =>{
        const response = await request(app).post('/register_supermarket').send({
            name: "Forum",
            description: "Supermercado Mayorista",
            address: "Los Teques",
            opening: "9:00",
            closing: "23:00",
            statusId: 1
        })
        expect(response.statusCode).toBe(200)
    })
})

describe('PUT /update_supermarket/:id', () =>{
    test('should respond with a 200 status code', async() =>{
        const response = await request(app).put('/update_supermarket/:id').send({
            id: 2,
            name: "Forum",
            description: "Supermercado Mayorista",
            address: "Los Teques",
            opening: "9:00",
            closing: "23:00",
            statusId: 1
        })
        expect(response.statusCode).toBe(200)
    })
})

describe('DELETE /delete_supermarket/:id', () =>{
    test('should respond with a 200 status code', async() =>{
        const response = await request(app).delete('/delete_supermarket/:id').send({
            id: "1"
        })
        expect(response.statusCode).toBe(200)
    })
})