// databaseConexion.js
import sqlite3 from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function conectarBase(dbPath = path.join(__dirname, 'database.db')) {
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err.message)
    } else {
      console.log('Conectado a SQLite en:', dbPath)
    }
  })

  db.run(`
    CREATE TABLE IF NOT EXISTS mensajes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      correo TEXT NOT NULL,
      asunto TEXT,
      mensaje TEXT NOT NULL
    )
  `)

  return db
}
export default conectarBase
