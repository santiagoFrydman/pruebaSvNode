import mongoose from 'mongoose'

const mensajeSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  asunto: String,
  mensaje: String,
}, { timestamps: true })

export const MensajeModel = mongoose.model('mensaje', mensajeSchema)