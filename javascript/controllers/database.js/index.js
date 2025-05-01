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
      contentType: "application/json",
      body: JSON.stringify(id),
    });
    if (response.status !== 200) {
      throw new Error("Error al obtener los datos");
      couldDelete = false;
    }
    return couldDelete;
  }
}

const databaseController = new DatabaseController();
export default databaseController;
