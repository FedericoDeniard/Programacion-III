import { getHeadersFromArray } from "../../utils/tables";
import { Futbolista } from "../Futbolista";
import { Persona } from "../Persona";
import { Profesional } from "../Profesional";

export class Controlller {
  View;
  Model;
  constructor(vista, modelo, initialData) {
    this.View = vista;
    this.Model = modelo;
    this.Model.People = this.createPeople(initialData);
    this.checkboxListener();
  }

  createPeople = (peopleList) => {
    const people = [];
    for (const person of peopleList) {
      try {
        if (person.equipo) {
          const futbolista = new Futbolista({
            id: person.id,
            nombre: person.nombre,
            apellido: person.apellido,
            edad: person.edad,
            equipo: person.equipo,
            posicion: person.posicion,
            cantidadGoles: person.cantidadGoles,
          });
          people.push(futbolista);
        } else if (person.titulo) {
          const profesional = new Profesional({
            id: person.id,
            nombre: person.nombre,
            apellido: person.apellido,
            edad: person.edad,
            titulo: person.titulo,
            facultad: person.facultad,
            añoGraduacion: person.añoGraduacion,
          });
          people.push(profesional);
        } else {
          const persona = new Persona({
            id: person.id,
            nombre: person.nombre,
            apellido: person.apellido,
            edad: person.edad,
          });
          people.push(persona);
        }
      } catch (e) {
        console.log(e);
      }
    }
    return people;
  };

  checkboxListener() {
    let checkBoxes = this.View.dataForm.checkboxes;
    checkBoxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        let hiddenValues = [...checkBoxes]
          .filter((b) => !b.checked)
          .map((b) => b.value);
        this.View.clearTable();
        this.View.fillTable(
          getHeadersFromArray(this.Model.People),
          this.Model.People,
          hiddenValues,
          true
        );
      });
    });
  }
}
