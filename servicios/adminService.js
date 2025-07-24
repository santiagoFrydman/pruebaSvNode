import Mensaje from '../modelos/mensaje.js'

class AdminService {
  #model

  constructor() {
    this.#model = new Mensaje()
  }

  obtenerMensajes() {
    return this.#model.obtenerTodos()
  }

  guardarMensaje(data) {
    return this.#model.crear(data)
  }
}

export default AdminService
