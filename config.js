import dotenv from 'dotenv'

dotenv.config()

export default {
  PORT: process.env.PORT || 3000,
  MODO_PERSISTENCIA: process.env.MODO_PERSISTENCIA || '',
  SESSION_SECRET: process.env.SESSION_SECRET || 'clave_super_secreta'
}
