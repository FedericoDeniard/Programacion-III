import { Futbolista } from "../../models/Futbolista.js";
import { Profesional } from "../../models/Profesional.js";

class DatabaseController {
  url = "https://examenesutn.vercel.app/api/PersonasFutbolistasProfesionales";

  async getPeople() {
    const people = await fetch(this.url, {
      method: "GET",
    });
    if (people.status !== 200) {
      throw new Error("Error al obtener los datos");
    }
    let parsedPeople = await people.text();
    parsedPeople = await JSON.parse(parsedPeople);
    const instancedPeople = parsedPeople.map((person) => {
      const titulo = person.titulo;
      return titulo ? new Profesional(person) : new Futbolista(person);
    });
    return instancedPeople;
  }

  async deletePeople(id) {
    let couldDelete = true;
    const response = await fetch(this.url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (response.status !== 200) {
      couldDelete = false;
      throw new Error("Error al obtener los datos");
    }
    return couldDelete;
  }

  async editPeople(person) {
    let couldEdit = true;
    const response = await fetch(this.url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    if (response.status !== 200) {
      couldEdit = false;
      throw new Error("Error al obtener los datos");
    }
    console.log("editado", person);
    return couldEdit;
  }

  async addPeople(person) {
    if (person.id) delete person.id;
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    if (response.status !== 200) {
      throw new Error("Error al obtener los datos");
    }
    const id = await response.text();
    const parsedId = await JSON.parse(id);

    return parsedId.id;
  }
}

const databaseController = new DatabaseController();
export default databaseController;
