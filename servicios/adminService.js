import Mensaje from '../modelos/mensaje.js'
import validarMensaje from './validaciones/mensaje.js'

class AdminService {
  #model

  constructor(db) {
    this.#model = new Mensaje(db)
  }

  obtenerMensajes() {
    return this.#model.obtenerTodos()
  }

  guardarMensaje(data) {
    const validacion = validarMensaje(data)
    if (!validacion.result) {
      throw new Error(validacion.error.details[0].message)
    }

    return this.#model.crear(data)
  }
}

export default AdminService
