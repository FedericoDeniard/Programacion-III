import { Futbolista } from "./models/Futbolista.js";
import { Persona } from "./models/Persona.js";
import { Profesional } from "./models/Profesional.js";
import peopleList from "./constants/index.js";
import { fillTable, getHeadersFromArray } from "./utils/tables.js";
import { createModal } from "./utils/modals.js";

// 2)Dada la siguiente cadena de caracteres, generar un Array de objetos de la jerarquía del punto 1.
const createPeople = () => {
  const people = [];
  for (const person of peopleList) {
    try {
      if (person.equipo) {
        const futbolista = new Futbolista(
          person.id,
          person.nombre,
          person.apellido,
          person.edad,
          person.equipo,
          person.posicion,
          person.cantidadGoles
        );
        people.push(futbolista);
      } else if (person.titulo) {
        const profesional = new Profesional(
          person.id,
          person.nombre,
          person.apellido,
          person.edad,
          person.titulo,
          person.facultad,
          person.añoGraduacion
        );
        people.push(profesional);
      } else {
        const persona = new Persona(
          person.id,
          person.nombre,
          person.apellido,
          person.edad
        );
        people.push(persona);
      }
    } catch (e) {
      console.log(e);
    }
  }
  return people;
};

const people = createPeople();

const type = document.getElementById("type");
const futbolistasFields = document.querySelectorAll(".futbolista-field");
const profesionalFields = document.querySelectorAll(".profesional-field");

const abmForm = document.getElementsByClassName("abm-form")[0];

const { modal, closeButton } = createModal(abmForm);

const resetProfesionalFields = () => {
  profesionalFields.forEach((profesionalField) => {
    profesionalField.style.display = "none";
    const input = profesionalField.querySelector("input, select");
    if (input) {
      input.removeAttribute("required");
      input.value = null;
    }
  });
};

const resetFutbolistaFields = () => {
  futbolistasFields.forEach((futbolistaField) => {
    futbolistaField.style.display = "none";
    const input = futbolistaField.querySelector("input, select");
    if (input) {
      input.removeAttribute("required");
      input.value = null;
    }
  });
};

closeButton.addEventListener("click", () => {
  abmForm.reset();
  type.value = "";
  console.log("reset");
  resetFutbolistaFields();
  resetProfesionalFields();
});

const openDialogButton = document.getElementById("open-form");
openDialogButton.addEventListener("click", () => {
  modal.showModal();
});

futbolistasFields.forEach((futbolistaField) => {
  futbolistaField.style.display = "none";
});
profesionalFields.forEach((profesionalField) => {
  profesionalField.style.display = "none";
});

type.addEventListener("change", (event) => {
  resetFutbolistaFields();
  resetProfesionalFields();
  if (event.target.value === "futbolista") {
    futbolistasFields.forEach((futbolistaField) => {
      futbolistaField.style.display = "flex";
      const input = futbolistaField.querySelector("input, select");
      if (input) input.setAttribute("required", "");
    });
  } else if (event.target.value === "profesional") {
    profesionalFields.forEach((profesionalField) => {
      profesionalField.style.display = "flex";
      const input = profesionalField.querySelector("input, select");
      if (input) input.setAttribute("required", "");
    });
  }
});

// Create table from data

const headers = getHeadersFromArray(peopleList);

const tableHead = document.getElementById("table-head");
const tableBody = document.getElementById("table-body");

fillTable(headers, people, tableHead, tableBody);

// Form Validation
const getFormValues = (form) => {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log(data);
};

abmForm.addEventListener("submit", (event) => {
  event.preventDefault();
  getFormValues(abmForm);
  console.log(abmForm);
});
