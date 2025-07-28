import Joi from "joi";

const validarMensaje = (mensaje) => {
  const mensajeSchema = Joi.object({
    nombre: Joi.string()
      .min(3)
      .max(100)
      .required()
      .messages({
        'string.base': '"nombre" debe ser una cadena de texto',
        'string.empty': '"nombre" no puede estar vacío',
        'string.min': '"nombre" debe tener al menos 3 caracteres',
        'string.max': '"nombre" no puede exceder los 100 caracteres',
        'any.required': '"nombre" es obligatorio',
      }),

    correo: Joi.string()
      .email()
      .required()
      .messages({
        'string.base': '"correo" debe ser una cadena de texto',
        'string.email': '"correo" debe tener un formato de correo válido',
        'string.empty': '"correo" no puede estar vacío',
        'any.required': '"correo" es obligatorio',
      }),

    asunto: Joi.string()
      .min(3)
      .max(150)
      .required()
      .messages({
        'string.base': '"asunto" debe ser una cadena de texto',
        'string.empty': '"asunto" no puede estar vacío',
        'string.min': '"asunto" debe tener al menos 3 caracteres',
        'string.max': '"asunto" no puede exceder los 150 caracteres',
        'any.required': '"asunto" es obligatorio',
      }),

    mensaje: Joi.string()
      .min(5)
      .max(1000)
      .required()
      .messages({
        'string.base': '"mensaje" debe ser una cadena de texto',
        'string.empty': '"mensaje" no puede estar vacío',
        'string.min': '"mensaje" debe tener al menos 5 caracteres',
        'string.max': '"mensaje" no puede exceder los 1000 caracteres',
        'any.required': '"mensaje" es obligatorio',
      }),
  });

  const { error } = mensajeSchema.validate(mensaje);
  if (error) {
    return { result: false, error };
  }
  return { result: true };
};

export default validarMensaje;
