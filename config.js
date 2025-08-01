import dotenv from 'dotenv'

dotenv.config()

export default {
  PORT: process.env.PORT || 8000,
  SESSION_SECRET: process.env.SESSION_SECRET || 'clave_super_secreta',
  DB_PATH: process.env.DB_PATH || '/data/database.db',
  DB_PATH_TEST: process.env.DB_PATH_TEST || './database-test.db'
}