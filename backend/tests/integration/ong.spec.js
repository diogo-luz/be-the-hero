const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new NGO', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "APAD3",
            email: "contacto@email.com",
            whatsapp: "912912912",
            city: "Coimbra",
            uf: "PT"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
})