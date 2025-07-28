import Mensaje from '../modelos/mensaje.js'
import validarMensaje from './validaciones/mensaje.js'

class AdminService {
  #model

  constructor() {
    this.#model = new Mensaje()
  }

  obtenerMensajes() {
    return this.#model.obtenerTodos()
  }

  guardarMensaje(data) {
  const validacion = validarMensaje(data)
  if (!validacion.result) {
    // Puedes lanzar un error o devolver un objeto con el mensaje de error
    throw new Error(validacion.error.details[0].message)
  }

  return this.#model.crear(data)
}
}

export default AdminService
