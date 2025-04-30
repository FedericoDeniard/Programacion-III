import classMap from "../../constants/classMap.js";

export class Model {
  people;
  filteredPeople;
  hiddenValues;
  constructor() {
    this.people = [];
    this.filteredPeople = [];
    this.hiddenValues = [];
  }

  deletePeople(id) {
    const person = this.people.find((person) => person.id === id);
    if (!person) throw new Error("Person not found");
    const index = this.people.indexOf(person);
    this.people.splice(index, 1);
    this.filteredPeople.splice(index, 1);
  }

  addPeople(person) {
    const peopleExists = this.people.findIndex((p) => p.id === person.id);
    if (peopleExists !== -1) {
      this.people[peopleExists] = person;
      this.filteredPeople[peopleExists] = person;
    } else {
      this.people.push(person);
      this.filteredPeople.push(person);
    }
  }

  filterPeople(profession) {
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
    if (this.people.length === 0) {
      return 1;
    }
    const newValue = this.people[this.people.length - 1].id + 1;
    return newValue;
  }

  findPerson(id) {
    const person = this.people.find((person) => person.id === id);
    return person;
  }
}
