import mongoose from 'mongoose'
import config from './config.js'

class CnxMongoDB {
  static connectionOK = false

  static async conectar() {
    try {
      await mongoose.connect(config.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      this.connectionOK = true
    } catch (err) {
      console.error('🔴 Error al conectar a MongoDB:', err.message)
    }
  }

  static async desconectar() {
    try {
      await mongoose.disconnect()
      console.log('🟡 Desconectado de MongoDB')
      this.connectionOK = false
    } catch (err) {
      console.error('🔴 Error al desconectar de MongoDB:', err.message)
    }
  }
}

export default CnxMongoDB
