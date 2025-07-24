import db from '../databaseConexion.js'

class Mensaje {
  obtenerTodos() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM mensajes ORDER BY id DESC', [], (err, rows) => {
        if (err) reject(err)
        else resolve(rows)
      })
    })
  }

  crear({ nombre, correo, asunto, mensaje }) {
    return new Promise((resolve, reject) => {
      db.run(`
        INSERT INTO mensajes (nombre, correo, asunto, mensaje)
        VALUES (?, ?, ?, ?)
      `, [nombre, correo, asunto, mensaje], function(err) {
        if (err) reject(err)
        else resolve(this.lastID)
      })
    })
  }
}

export default Mensaje
