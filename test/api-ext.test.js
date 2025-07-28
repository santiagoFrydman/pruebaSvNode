import { expect } from 'chai'
import supertest from 'supertest'
import mensajeFalso from './generador/mensaje.js';

const request = supertest('http://localhost:8000')

let agent // Definición afuera

describe('*** TEST DEL SERVICIO APIRESTful (ext) ***', () => {
  before(async () => {
    agent = supertest.agent('http://localhost:8000') // Asignación dentro del hook
    // login simulado (si aplica)
      await agent
        .post('/auth/login-test')
        .send({ password: 'admin123' }) // según tu ruta de login

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
            //console.log(mensaje)

            const response = await request.post('/admin/api/contacto').send(mensaje)
            //Se espera que status sea = a 200 y tilda en verde o rojo
            expect(response.status).to.eql(200)

            const mensajeGuardado = response.body
            expect(mensaje).to.include.keys('nombre', 'correo', 'asunto', 'mensaje')

            expect(mensajeGuardado.nombre).not.to.eql(mensaje.nombre);
            expect(mensajeGuardado.correo).not.to.eql(mensaje.correo);
            expect(mensajeGuardado.asunto).not.to.eql(mensaje.asunto);
            expect(mensajeGuardado.mensaje).not.to.eql(mensaje.mensaje);
        })
    })

    /* describe('PUT', () => {
        
    })

    describe('DELETE', () => {
        
    }) */
})