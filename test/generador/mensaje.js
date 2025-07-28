import { faker } from "@faker-js/faker/locale/en";

const getMensajeFalso = () => ({
  nombre: faker.person.fullName(),
  correo: faker.internet.email(),
  asunto: faker.lorem.sentence({ min: 3, max: 8 }),
  mensaje: faker.lorem.paragraphs({ min: 1, max: 2 })
});

// Ejemplo para test manual:
// console.log(getMensajeFalso());

export default {
  get: getMensajeFalso
};
