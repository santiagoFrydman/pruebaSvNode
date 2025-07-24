import express from 'express'
import session from 'express-session'
import path from 'path'
import { fileURLToPath } from 'url'

import RouterAuth from './rutas/routerAuth.js'
import RouterAdmin from './rutas/routerAdmin.js'

import AuthService from './servicios/authService.js'
import AdminService from './servicios/adminService.js'

import config from './config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class Server {
  #port
  #authService
  #adminService

  constructor(port = config.PORT) {
    this.#port = port
    this.#authService = new AuthService()
    this.#adminService = new AdminService()
  }

  start() {
    const app = express()

    // Middlewares para parsing
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())

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
    console.log('Antes de levantar el servidor...');
    const server = app.listen(this.#port, () => {
      console.log(`Servidor escuchando en http://localhost:${this.#port}`);
    });


    server.on('error', (err) => {
      console.error('Error en el servidor:', err.message)
    })
  }
}

export default Server
