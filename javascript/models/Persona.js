export class Persona {
  id;
  nombre;
  apellido;
  edad;

  constructor({ id, nombre, apellido, edad }) {
    if (new.target === Persona) {
      throw new Error("This class is abstract");
    }
    this.#validatePerson(id, nombre, apellido, edad);
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.id = id;
  }

  #validatePerson(id, nombre, apellido, edad) {
    if (!id || !nombre || !apellido || !edad) {
      throw new Error("All fields are required");
    }
    if (typeof id !== "number") {
      throw new Error("Id must be a number");
    }
    if (typeof nombre !== "string" || typeof apellido !== "string") {
      throw new Error("Name and last name must be strings");
    }
    if (typeof edad !== "number") {
      throw new Error("Age must be a number");
    }
    if (edad < 15) {
      throw new Error("Age must be greater than 15");
    }
  }

  toString() {
    return `${this.id}: ${this.nombre} ${this.apellido} (${this.edad} yo)`;
  }
}
