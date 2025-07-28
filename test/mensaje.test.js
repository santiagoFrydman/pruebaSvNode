import { expect } from 'chai';
import mensajeFalso from './generador/mensaje.js';

describe('*** TEST DEL GENERADOR DE MENSAJES ***', () => {
  it('El mensaje debe contener los campos nombre, correo, asunto y mensaje', () => {
    const mensaje = mensajeFalso.get();
    expect(mensaje).to.include.keys('nombre', 'correo', 'asunto', 'mensaje');
  });

  it('Debería generar mensajes aleatorios', () => {
    const mensaje1 = mensajeFalso.get();
    const mensaje2 = mensajeFalso.get();

    expect(mensaje1.nombre).not.to.eql(mensaje2.nombre);
    expect(mensaje1.correo).not.to.eql(mensaje2.correo);
    expect(mensaje1.asunto).not.to.eql(mensaje2.asunto);
    expect(mensaje1.mensaje).not.to.eql(mensaje2.mensaje);
  });
});
