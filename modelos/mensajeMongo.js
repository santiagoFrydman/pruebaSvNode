import { MensajeModel } from './mensajeMongoEstructura.js'

class MensajeMongo {
  async obtenerTodos() {
    return await MensajeModel.find().sort({ createdAt: -1 })
  }

  async crear({ nombre, correo, asunto, mensaje }) {
    const nuevo = new MensajeModel({ nombre, correo, asunto, mensaje })
    return await nuevo.save()
  }
}

export default MensajeMongo
