import classMap from "../../constants/classMap";

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

  filterPeople(profession) {
    let filteredPeople = [...this.people];
    this.filteredPeople = filteredPeople;
    filteredPeople = this.people.filter(
      (person) => person instanceof classMap[profession]
    );
    this.filteredPeople = filteredPeople;
    return filteredPeople;
  }
}
