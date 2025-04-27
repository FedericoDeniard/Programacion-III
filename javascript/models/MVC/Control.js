import classMap from "../../constants/classMap";
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
    this.Model.people = this.createPeople(initialData);
    this.Model.filteredPeople = this.Model.people;
    this.checkboxListener();
    this.professionListener();
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
    const checkBoxes = this.View.filters.checkboxes;
    checkBoxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        let hiddenValues = [...checkBoxes]
          .filter((b) => !b.checked)
          .map((b) => b.value);
        this.View.clearTable();
        this.Model.hiddenValues = hiddenValues;
        this.updateTable();
      });
    });
  }

  professionListener() {
    const professionInput = this.View.filters.profession;

    professionInput.addEventListener("change", () => {
      this.Model.filterPeople(this.View.filters.profession.value);
      this.updateTable();
    });
  }

  deleteButtonsListener() {
    this.View.dataForm.tableContainer.deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const id = Number(button.value);
        this.Model.deletePeople(id);
        this.updateTable();
      });
    });
  }

  updateTable() {
    this.View.clearTable();
    this.Model.filterPeople(this.View.filters.profession.value);
    this.View.fillTable(
      this.Model.filteredPeople,
      this.Model.hiddenValues,
      true
    );
    this.deleteButtonsListener();
    this.updateAverageAge();
  }

  updateAverageAge() {
    const averageAgeInput = this.View.filters.averageText;
    let totalAge = 0;
    this.Model.filteredPeople.forEach((person) => {
      totalAge += person.edad;
    });
    const averageAge =
      Math.round(totalAge / this.Model.filteredPeople.length) || 0;
    averageAgeInput.innerText = `Edad promedio: ${averageAge}`;
  }
}
