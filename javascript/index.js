import { Futbolista } from "./models/Futbolista.js";
import { Persona } from "./models/Persona.js";
import { Profesional } from "./models/Profesional.js";
import peopleList from "./constants/index.js";
import { clearTable, fillTable, getHeadersFromArray } from "./utils/tables.js";
import { createModal } from "./utils/modals.js";
import { cleanData, getFormValues } from "./utils/forms.js";
import classMap from "./constants/classMap.js";

// 2)Dada la siguiente cadena de caracteres, generar un Array de objetos de la jerarquía del punto 1.
const createPeople = () => {
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

const people = createPeople();

// Filter people
const inputFilter = document.getElementById("personas");
let filteredPeople = [...people];

inputFilter.addEventListener("change", () => {
  const value = inputFilter.value;
  filteredPeople = [...people];
  filteredPeople = filteredPeople.filter(
    (person) => person instanceof classMap[value]
  );
  clearTable(tableHead, tableBody);
  fillTable(
    getHeadersFromArray(filteredPeople),
    filteredPeople,
    tableHead,
    tableBody,
    checkedValues
  );
});

const abmForm = document.getElementsByClassName("abm-form")[0];
const gradYear = document.getElementById("gradYear");
gradYear.max = new Date().getFullYear();
const type = document.getElementById("type");
const dataForm = document.getElementsByClassName("data-form")[0];
const checkBoxs = dataForm.querySelectorAll("input[type=checkbox]");
let checkedValues = [...checkBoxs]
  .filter((b) => !b.checked)
  .map((b) => b.value);
const futbolistasFields = document.querySelectorAll(".futbolista-field");
const profesionalFields = document.querySelectorAll(".profesional-field");

const idInput = document.getElementById("id");
const updateIdValue = () => {
  const newValue = people[people.length - 1].id + 1;
  idInput.value = newValue;
  return newValue;
};

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
  resetFutbolistaFields();
  resetProfesionalFields();
});

const openDialogButton = document.getElementById("open-form");
openDialogButton.addEventListener("click", () => {
  updateIdValue();
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
  if (event.target.value === "Futbolista") {
    futbolistasFields.forEach((futbolistaField) => {
      futbolistaField.style.display = "flex";
      const input = futbolistaField.querySelector("input, select");
      if (input) input.setAttribute("required", "");
    });
  } else if (event.target.value === "Profesional") {
    profesionalFields.forEach((profesionalField) => {
      profesionalField.style.display = "flex";
      const input = profesionalField.querySelector("input, select");
      if (input) input.setAttribute("required", "");
    });
  }
});

// Create table from data

const headers = getHeadersFromArray(people);

const tableHead = document.getElementById("table-head");
const tableBody = document.getElementById("table-body");

fillTable(headers, filteredPeople, tableHead, tableBody, checkedValues);

// Form Validation

abmForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = getFormValues(abmForm);
  try {
    const cleanedData = cleanData(data, classMap[type.value].getProperties());
    const person = new classMap[type.value](cleanedData);
    people.push(person);
    filteredPeople.push(person);
    clearTable(tableHead, tableBody);
    fillTable(
      getHeadersFromArray(filteredPeople),
      filteredPeople,
      tableHead,
      tableBody,
      checkedValues
    );
    modal.close();
  } catch (e) {
    console.log(abmForm);
  } finally {
    abmForm.reset();
  }
});

// Filter table
checkBoxs.forEach((b) => {
  b.addEventListener("change", () => {
    checkedValues = [...checkBoxs]
      .filter((b) => !b.checked)
      .map((b) => b.value);

    clearTable(tableHead, tableBody);
    fillTable(
      getHeadersFromArray(filteredPeople),
      filteredPeople,
      tableHead,
      tableBody,
      checkedValues
    );
  });
});
