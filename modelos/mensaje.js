class Mensaje {
  constructor(db) {
    this.db = db
  }

  obtenerTodos() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM mensajes ORDER BY id DESC', [], (err, rows) => {
        if (err) reject(err)
        else resolve(rows)
      })
    })
  }

  crear({ nombre, correo, asunto, mensaje }) {
    return new Promise((resolve, reject) => {
      this.db.run(`
        INSERT INTO mensajes (nombre, correo, asunto, mensaje)
        VALUES (?, ?, ?, ?)
      `, [nombre, correo, asunto, mensaje], function(err) {
        if (err) reject(err)
        else resolve({
          id: this.lastID,
          nombre,
          correo,
          asunto,
          mensaje
        })
      })
    })
  }
}

export default Mensaje
