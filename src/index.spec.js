const request = require('supertest');
const app = require('./app');

describe('Test My app server', () => {
    it('should get main route', async () => {
        const res = await request(app)
        .post('/singup')
        .send({
            nome: "henrique",
            email: "henrique@teste.com",
            senha: "123456",
            telefones: [
                {
                    numero: 912345678,
                    DDD: 11
                },
                {
                    numero: 20202020,
                    DDD: 14
                }
            ]
        })

        expect(res.statusCode).toEqual(200)
        /* expect(res.body).toContain('nome'); */
    })
})