import express from 'express'
import ControladorAuth from '../controladores/controladorAuth.js'

class RouterAuth {
  #controlador

  constructor(servicio) {
    this.#controlador = new ControladorAuth(servicio)
  }

  start() {
    const router = express.Router()

    router.get('/login', this.#controlador.renderLogin)
    router.post('/login', this.#controlador.login)
    router.get('/logout', this.#controlador.logout)
    //Ruta para test
    router.post('/login-test', this.#controlador.loginTest)


    return router
  }
}

export default RouterAuth
