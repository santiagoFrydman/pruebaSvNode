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
import conectarBase from './databaseConexion.js'

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
    this.#dbPath = dbPath // Guardamos el path de la BD para levantarla
    this.#db = null
    this.#authService = new AuthService()
    this.#adminService = null
    this.#server = null

  }

  start() {

    // CONECTO LA BASE DE DATOS AL SERVICIO USANDO EL PATH CONFIGURABLE

    this.#db = conectarBase(this.#dbPath) // Levantamos la BD con el path que se pase
    this.#adminService = new AdminService(this.#db)

    const app = express()

    // Middlewares para parsing
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())

    //Middleware para cors
    app.use(cors({
    origin: 'https://templado1.netlify.app',
    credentials: true }))

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
      console.log(`Servidor escuchando en http://localhost:${this.#port}`);
    });

    this.#server.on('error', (err) => {
      console.error('Error en el servidor:', err.message)
    })

    return app
  }

  async stop() {
    // DETENER SERVIDOR Y CERRAR CONEXIÓN A LA BASE DE DATOS
    if (this.#server) {
      await this.#server.close()
      console.log('Servidor detenido')
    }

    if (this.#db) {
      this.#db.close((err) => {
        if (err) {
          console.error('Error al cerrar la base de datos SQLite:', err.message)
        } else {
          console.log('Conexión SQLite cerrada.')
        }
      })
    }
  }
}

export default Server
