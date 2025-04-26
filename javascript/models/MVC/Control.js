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
      this.filterPeople();
      this.updateTable();
    });
  }

  filterPeople() {
    const professionInput = this.View.filters.profession;
    const profession = professionInput.value;
    let filteredPeople = [...this.Model.people];
    this.Model.filteredPeople = filteredPeople;
    filteredPeople = this.Model.people.filter(
      (person) => person instanceof classMap[profession]
    );
    this.Model.filteredPeople = filteredPeople;
  }

  deleteButtonsListener() {
    this.View.dataForm.tableContainer.deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const id = Number(button.value);
        this.deletePeople(id);
        this.updateTable();
      });
    });
  }

  deletePeople(id) {
    const person = this.Model.people.find((person) => person.id === id);
    if (!person) throw new Error("Person not found");
    const index = this.Model.people.indexOf(person);
    this.Model.people.splice(index, 1);
    this.Model.filteredPeople.splice(index, 1);
  }

  updateTable() {
    this.View.clearTable();
    this.filterPeople();
    this.View.fillTable(
      this.Model.filteredPeople,
      this.Model.hiddenValues,
      true
    );
    this.deleteButtonsListener();
  }
}
