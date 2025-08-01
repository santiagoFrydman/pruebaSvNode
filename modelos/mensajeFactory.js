// modelos/MensajeFactory.js
import Mensaje from './mensaje.js'
import MensajeMongo from './mensajeMongo.js'
import conectarBase from '../databaseConexion.js'
//import CnxMongoDB from '../databaseMongo/CnxMongoDB.js'
import config from '../config.js'

async function getMensajeModel() {
  if (config.PERSISTENCIA === 'MONGO') {
    await CnxMongoDB.conectar()
    return new MensajeMongo()
  } else {
    const db = conectarBase()
    return new Mensaje(db)
  }
}

export default getMensajeModel
