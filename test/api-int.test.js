import { expect } from 'chai'
import supertest from 'supertest'
import mensajeFalso from './generador/mensaje.js'
import Server from '../server.js'
import config from '../config.js'

describe('*** TEST DEL SERVICIO APIRESTful (int) ***', () => {
    let server, app, agent

    before(async () => {
        server = new Server(8040, config.DB_PATH_TEST) // Base test separada
        app = await server.start()
        agent = supertest.agent(app)

        await agent
            .post('/auth/login')
            .send({ password: 'admin123' })
    })

    after(async () => {
        await server.stop()
        // Opcional: borrar archivo database-test.db si querés limpiar después del test
    })

    describe('GET', () => {
        it('Debería retornar un status 200 si está logueado', async () => {
            const response = await agent.get('/admin/api/contacto')
            expect(response.status).to.eql(200)
        })
    })

    describe('POST', () => {
        it('Debería incorporar un mensaje', async () => {
            const mensaje = mensajeFalso.get()

            const response = await agent.post('/admin/api/contacto').send(mensaje)

            expect(response.status).to.eql(200)

            const respuesta = response.body
            expect(respuesta).to.have.property('success', true)
            expect(respuesta).to.have.property('message', 'Mensaje guardado correctamente')
        })
    })
})
