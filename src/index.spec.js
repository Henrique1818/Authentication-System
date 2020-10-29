const request = require('supertest');
const app = require('./app');

describe('Test My app server', () => {
    it('verificando se o email existe', async () => {
        const res = await request(app)
        .post('/singup')
        .send({
            nome: "luiz",
            email: "luiz4@teste.com",
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

        expect(res.statusCode).toEqual(400)
    }),

    it('criando o usuário', async () => {
        const res = await request(app)
        .post('/singup')
        .send({
            nome: "luiz",
            email: "luiz13@teste.com",
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

        expect(res.statusCode).toEqual(201)
    }),

    it('verificando se o email está incorreto', async () => {
        const res = await request(app)
        .get('/singin')
        .send({
            email: "luiz22@teste.com",
            senha: "123456"
        })

        expect(res.statusCode).toEqual(401)
    }),

    it('verificando se a senha está incorreta', async () => {
        const res = await request(app)
        .get('/singin')
        .send({
            email: "luiz2@teste.com",
            senha: "123456"
        })

        expect(res.statusCode).toEqual(403)
    }),

    it('usuário autenticado', async () => {
        const res = await request(app)
        .get('/singin')
        .send({
            email: "luiz2@teste.com",
            senha: "1234567"
        })

        expect(res.statusCode).toEqual(200)
    }),

    it('retornando usuário não encontrado', async () => {
        const res = await request(app)
        .put('/luiz2@teste.com.br')
        .send({
            nome: "luiz",
            email: "luiz13@teste.com",
            senha: "123456",
            telefones: [
                {
                    numero: 20202020,
                    DDD: 14
                }
            ]
        })

        expect(res.statusCode).toEqual(404)
    }),

    it('atualização de usuário', async () => {
        const res = await request(app)
        .put('/luiz2@teste.com')
        .send({
            nome: "luiz",
            email: "luiz2@teste.com",
            senha: "1234567",
            telefones: [
                {
                    numero: 20202020,
                    DDD: 14
                }
            ]
        })

        expect(res.statusCode).toEqual(200)
    })
})