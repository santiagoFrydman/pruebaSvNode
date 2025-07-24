import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ControladorAuth {
  #servicio;

  constructor(servicio) {
    this.#servicio = servicio;
  }

  renderLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
  }

  login = async (req, res) => {
    const { password } = req.body;
    const esValido = await this.#servicio.validarPassword(password);

    if (esValido) {
      req.session.authenticated = true;
      return res.redirect('/admin');
    }

    return res.redirect('/auth/login?error=1');
  }

  logout = (req, res) => {
    req.session.destroy(() => res.redirect('/auth/login'));
  }
}

export default ControladorAuth;
