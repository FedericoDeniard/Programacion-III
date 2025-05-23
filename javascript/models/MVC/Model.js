import classMap from "../../constants/classMap.js";
import databaseController from "../../controllers/database.js";
import { Futbolista } from "../Futbolista.js";
import { Profesional } from "../Profesional.js";

export class Model {
  people = [];
  filteredPeople;
  hiddenValues;
  dataLoaded = false;
  sortParameter = {
    name: "",
    order: 0,
  };

  constructor() {
    this.filteredPeople = [];
    this.hiddenValues = [];
  }

  async loadPeople() {
    if (this.dataLoaded) return;
    this.people = await databaseController.getPeople();
    this.filteredPeople = this.people;
    this.dataLoaded = true;
  }

  async deletePeople(id) {
    const person = this.people.find((person) => person.id === id);
    if (!person) throw new Error("Person not found");

    const deletePeople = await databaseController.deletePeople(id);
    if (!deletePeople) throw new Error("Error deleting person");

    const index = this.people.indexOf(person);
    this.people.splice(index, 1);
    this.filteredPeople.splice(index, 1);
  }

  async addPeople(person) {
    const peopleExists = this.people.findIndex((p) => p.id === person.id);
    if (peopleExists !== -1) {
      const editPeople = await databaseController.editPeople(person);
      if (!editPeople) throw new Error("Error editing person");

      this.people[peopleExists] = person;
      this.filteredPeople[peopleExists] = person;
    } else {
      const newId = await databaseController.addPeople(person);
      if (!newId) throw new Error("Error adding person");
      person.id = Number(newId);
      this.people.push(person);
      this.filteredPeople.push(person);
    }
  }

  filterPeople(profession) {
    this.instancePeople();
    let filteredPeople = [...this.people];
    this.filteredPeople = filteredPeople;
    filteredPeople = this.people.filter(
      (person) => person instanceof classMap[profession]
    );
    this.filteredPeople = filteredPeople;
    return filteredPeople;
  }

  getIdValue(id = undefined) {
    if (id) {
      return id;
    }
    const newValue = 0;
    return newValue;
  }

  findPerson(id) {
    const person = this.people.find((person) => person.id === id);
    return person;
  }

  instancePeople() {
    const people = this.people.map((person) => {
      const titulo = person.titulo;
      return titulo ? new Profesional(person) : new Futbolista(person);
    });
    return people;
  }

  sortPeople() {
    let textContent = this.sortParameter.name;
    this.filteredPeople.sort((a, b) => {
      if (a[textContent] < b[textContent]) {
        return -this.sortParameter.order;
      }
      if (a[textContent] > b[textContent]) {
        return this.sortParameter.order;
      }
      return 0;
    });
  }

  changeSortValues(textContent) {
    textContent = textContent.charAt(0).toLowerCase() + textContent.slice(1);
    textContent = textContent.split(" ")[0];
    if (this.sortParameter.name === textContent) {
      this.sortParameter.order += 1;
      this.sortParameter.order =
        this.sortParameter.order > 1 ? -1 : this.sortParameter.order;
    } else {
      this.sortParameter.name = textContent;
      this.sortParameter.order = 1;
    }
  }
}
