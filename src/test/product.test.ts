import app from '../routes/product'
import request from 'supertest'

describe('GET /get_product_by_supermarket/:id', () =>{
    test('should respond with a 200 status code', async() =>{
        const response = await request(app).get('/get_product_by_supermarket/:id').send({ 
            supermarketid: 1
        })
        expect(response.statusCode).toBe(200)
    })
})

describe('GET /get_product_by_id/:id', () =>{
    test('should respond with a 200 status code', async() =>{
        const response = await request(app).get('/get_product_by_id/:id').send({
            id: "1"
        })
        expect(response.statusCode).toBe(200)
    })
})

describe('POST /register_product', () =>{
    test('should respond with a 200 status code', async() =>{
        const response = await request(app).post('/register_product').send({
            supermarketid: 1,
            name: "ACE",
            description: "Producto de limpieza",
            quantity: 10,
            amount: 5,
            expired_at: "5/30/2023",
            statusId: 1
        })
        expect(response.statusCode).toBe(200)
    })
})

describe('PUT /update_product/:id', () =>{
    test('should respond with a 200 status code', async() =>{
        const response = await request(app).put('/update_product/:id').send({
            supermarketid: 1,
            id: 2,
            name: "ACE",
            description: "Producto de limpieza",
            quantity: 10,
            amount: 5,
            expired_at: "30/5/2023",
            statusId: 1
        })
        expect(response.statusCode).toBe(200)
    })
})

describe('DELETE /delete_product/:id', () =>{
    test('should respond with a 200 status code', async() =>{
        const response = await request(app).delete('/delete_product/:id').send({
            id: "1"
        })
        expect(response.statusCode).toBe(200)
    })
})