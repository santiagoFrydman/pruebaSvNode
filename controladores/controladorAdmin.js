import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ControladorAdmin {
  #servicio

  constructor(servicio) {
    this.#servicio = servicio
  }

  mostrarAdmin = async (req, res) => {
    if (!req.session.authenticated) return res.redirect('/auth/login')

    // Sirvo el HTML estático del panel admin
    res.sendFile(path.join(__dirname, '../public/admin.html'));
  }

  // Endpoint para que el front pida los mensajes via AJAX
  obtenerMensajes = async (req, res) => {
    if (!req.session.authenticated) return res.status(401).json({ error: 'No autorizado' });

    try {
      const mensajes = await this.#servicio.obtenerMensajes();
      res.json(mensajes);
    } catch (error) {
      res.status(500).json({ error: 'Error al cargar mensajes' });
    }
  }

  guardarMensaje = async (req, res) => {
    const { nombre, correo, asunto, mensaje } = req.body

    if (!nombre || !correo || !mensaje) {
      return res.status(400).json({ error: "Campos requeridos incompletos" })
    }

    try {
      await this.#servicio.guardarMensaje({ nombre, correo, asunto, mensaje })
      res.json({ success: true, message: 'Mensaje guardado correctamente' })
    } catch (error) {
      res.status(500).json({ error: 'Error al guardar el mensaje' })
    }
  }
}

export default ControladorAdmin
