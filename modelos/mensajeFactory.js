import config from '../config.js'
import conectarBase from '../databaseConexion.js'
import CnxMongoDB from '../CnxMongoDB.js'
import Mensaje from './mensaje.js'
import MensajeMongo from './mensajeMongo.js'

class MensajeFactory {
  static async get() {
    if (config.PERSISTENCIA === 'MONGO') {
      await CnxMongoDB.conectar()
      return { modelo: new MensajeMongo(), conexion: null }
    } else {
      const db = conectarBase(config.DB_PATH)
      return { modelo: new Mensaje(db), conexion: db }
    }
  }
}

export default MensajeFactory
