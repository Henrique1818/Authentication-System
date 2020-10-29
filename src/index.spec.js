const request = require('supertest');
const { path } = require('./app');
const app = require('./app');

describe('Test My app server', () => {
    it('should get main route', async () => {
        const res = await request(app)
        .get('/singin')
        .send({
            email: 'henrique@test.com',
            senha: '123456'
        })

        /* expect(res.statusCode).toEqual(200) */
        /* expect(res.body).toContain('nome'); */
    })
})