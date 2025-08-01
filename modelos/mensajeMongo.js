// modelos/MensajeMongo.js
import { ObjectId } from 'mongodb'
import CnxMongoDB from '../databaseMongo/CnxMongoDB.js'

class MensajeMongo {
  constructor() {
    this.collection = () => CnxMongoDB.db.collection('mensajes')
  }

  async obtenerTodos() {
    if (!CnxMongoDB.connectionOK) throw new Error('No conectado a MongoDB')
    return await this.collection().find({}).sort({ _id: -1 }).toArray()
  }

  async crear({ nombre, correo, asunto, mensaje }) {
    if (!CnxMongoDB.connectionOK) throw new Error('No conectado a MongoDB')
    const nuevo = { nombre, correo, asunto, mensaje }
    const result = await this.collection().insertOne(nuevo)
    return { id: result.insertedId, ...nuevo }
  }
}

export default MensajeMongo
