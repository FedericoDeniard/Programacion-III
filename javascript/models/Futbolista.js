import { Persona } from "./Persona.js";

export class Futbolista extends Persona {
  constructor(id, nombre, apelllido, edad, equipo, posicion, cantidadGoles) {
    super(id, nombre, apelllido, edad);
    this.#validateFutbolista(equipo, posicion, cantidadGoles);
    this.equipo = equipo;
    this.posicion = posicion;
    this.cantidadGoles = cantidadGoles;
  }

  #validateFutbolista(equipo, posicion, cantidadGoles) {
    if (!equipo) {
      throw new Error("Team is required");
    }
    if (!posicion) {
      throw new Error("Position is required");
    }
    if (cantidadGoles === undefined || cantidadGoles === null) {
      throw new Error("Goals amount is required");
    }
    if (typeof equipo !== "string" || typeof posicion !== "string") {
      throw new Error("Team and posicion must be strings");
    }
    if (typeof cantidadGoles !== "number") {
      throw new Error("Goals ammount must be a number");
    }
    if (cantidadGoles < 0) {
      throw new Error("Goals ammount must be greater than 0");
    }
  }

  toString() {
    return `${this.id}: ${this.nombre} ${this.apellido} (${this.edad} yo) ${this.equipo} ${this.posicion} ${this.cantidadGoles}`;
  }
}
