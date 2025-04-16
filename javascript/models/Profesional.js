import { Persona } from "./Persona.js";

export class Profesional extends Persona {
  constructor({ id, nombre, apellido, edad, titulo, facultad, añoGraduacion }) {
    super({ id, nombre, apellido, edad });
    this.#validateProfesional(titulo, facultad, añoGraduacion);
    this.titulo = titulo;
    this.facultad = facultad;
    this.añoGraduacion = añoGraduacion;
  }

  #validateProfesional(titulo, facultad, añoGraduacion) {
    if (!titulo || !facultad || !añoGraduacion) {
      throw new Error("All fields are required");
    }
    if (typeof titulo !== "string" || typeof facultad !== "string") {
      throw new Error("Degree and facultad must be strings");
    }
    if (typeof añoGraduacion !== "number") {
      throw new Error("Graduation year must be a number");
    }
    if (añoGraduacion < 1900) {
      throw new Error("Graduation year must be greater than 1950");
    }
  }

  toString() {
    return `${this.id}: ${this.nombre} ${this.apellido} (${this.edad} yo) ${this.titulo} ${this.facultad} ${this.añoGraduacion}`;
  }

  static getProperties() {
    return [
      "id",
      "nombre",
      "apellido",
      "edad",
      "titulo",
      "facultad",
      "añoGraduacion",
    ];
  }
}
