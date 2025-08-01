import express from 'express'
import session from 'express-session'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'

import RouterAuth from './rutas/routerAuth.js'
import RouterAdmin from './rutas/routerAdmin.js'

import AuthService from './servicios/authService.js'
import AdminService from './servicios/adminService.js'

import config from './config.js'
import MensajeModel from './modelos/mensajeFactory.js'
import CnxMongoDB from './CnxMongoDB.js'  // Para desconectar Mongo

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class Server {
  #port
  #authService
  #adminService
  #dbPath
  #db
  #server

  constructor(port = config.PORT, dbPath = config.DB_PATH) {
    this.#port = port
    this.#dbPath = dbPath
    this.#db = null
    this.#authService = new AuthService()
    this.#adminService = null
    this.#server = null
  }

  async start() {
    // Usamos el factory que devuelve { modelo, conexion }
    const { modelo, conexion } = await MensajeModel.get()
    this.#adminService = new AdminService(modelo)
    this.#db = conexion  // Será null si es Mongo

    const app = express()

    // Middlewares para parsing
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())

    // Middleware para cors
    app.use(cors({
      origin: 'https://templado1.netlify.app',
      credentials: true
    }))

    // Archivos estáticos
    app.use(express.static(path.join(__dirname, 'public')))

    // Sesiones
    app.use(session({
      secret: config.SESSION_SECRET,
      resave: false,
      saveUninitialized: false
    }))

    // Rutas con inyección de dependencias
    app.use('/auth', new RouterAuth(this.#authService).start())
    app.use('/admin', new RouterAdmin(this.#adminService).start())

    // Ruta raíz
    app.get('/', (req, res) => {
      if (req.session.authenticated) return res.redirect('/admin')
      res.redirect('/auth/login')
    })

    // Levantar servidor
    this.#server = app.listen(this.#port, () => {
      console.log(`Servidor escuchando en http://localhost:${this.#port}`)
      if (config.PERSISTENCIA === 'SQL') {
        console.log(`Conectado a SQLite en: ${this.#dbPath}`)
      } else {
        console.log(`Conectado a MongoDB en: ${config.MONGO_URI}`)
      }
    })

    this.#server.on('error', (err) => {
      console.error('Error en el servidor:', err.message)
    })

    return app
  }

  async stop() {
    if (this.#server) {
      await new Promise(resolve => this.#server.close(resolve))
      console.log('Servidor detenido')
    }

    if (this.#db) {
      // Promisificar el cierre para usar await
      await new Promise((resolve, reject) => {
        this.#db.close(err => {
          if (err) reject(err)
          else resolve()
        })
      })
      console.log('Conexión SQLite cerrada.')
    }

    if (config.PERSISTENCIA === 'MONGO') {
      await CnxMongoDB.desconectar()
      console.log('Conexión MongoDB cerrada.')
    }
  }
}

export default Server
