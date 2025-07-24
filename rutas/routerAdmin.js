import express from 'express'
import ControladorAdmin from '../controladores/controladorAdmin.js'

class RouterAdmin {
  #controlador

  constructor(servicio) {
    this.#controlador = new ControladorAdmin(servicio)
  }

  start() {
    const router = express.Router()

    
    router.get('/', this.#controlador.mostrarAdmin)
    router.get('/api/contacto', this.#controlador.obtenerMensajes)
    router.post('/api/contacto', this.#controlador.guardarMensaje)
    

    return router
  }
}

export default RouterAdmin
