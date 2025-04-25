import { Futbolista } from "./models/Futbolista.js";
import { Persona } from "./models/Persona.js";
import { Profesional } from "./models/Profesional.js";
import peopleList from "./constants/index.js";
import { clearTable, fillTable, getHeadersFromArray } from "./utils/tables.js";
import { createModal } from "./utils/modals.js";
import { cleanData, fillFormValues, getFormValues } from "./utils/forms.js";
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

// Delete person
const getDeleteButtons = () => {
  people.forEach((person) => {
    const deleteButton = document.getElementById(`delete-${person.id}`);
    deleteButton.addEventListener("click", () => {
      deletePeople(person.id);
      filteredPeople = [...people];
      filterPeople();
      clearTable(tableHead, tableBody);
      changeInnerText(
        averageAgeInput,
        `Edad promedio: ${calculateAverageAge(filteredPeople)}`
      );
      fillTable(
        getHeadersFromArray(filteredPeople),
        filteredPeople,
        tableHead,
        tableBody,
        checkedValues,
        true
      );

      getDeleteButtons();
      getUpdateButtons();
    });
  });
};

const deletePeople = (id) => {
  console.log("deletePeople(): id", id);
  const person = people.find((person) => person.id === id);
  if (!person) throw new Error("Person not found");
  const index = people.indexOf(person);
  people.splice(index, 1);
  console.log(people);
};

// Update person
const getUpdateButtons = () => {
  people.forEach((person) => {
    const updateButton = document.getElementById(`edit-${person.id}`);
    updateButton.addEventListener("click", () => {
      updateIdValue(person.id);
      showClassInputs({
        value: person.hasOwnProperty("equipo") ? "Futbolista" : "Profesional",
      });
      fillFormValues(person, abmForm);
      modal.showModal();
      getUpdateButtons();
    });
  });
};

// Filter people
const inputFilter = document.getElementById("personas");
let filteredPeople = [...people];

inputFilter.addEventListener("change", () => {
  filterPeople();
  clearTable(tableHead, tableBody);
  changeInnerText(
    averageAgeInput,
    `Edad promedio: ${calculateAverageAge(filteredPeople)}`
  );
  fillTable(
    getHeadersFromArray(filteredPeople),
    filteredPeople,
    tableHead,
    tableBody,
    checkedValues,
    true
  );
  getDeleteButtons();
  getUpdateButtons();
});

const filterPeople = () => {
  const value = inputFilter.value;
  filteredPeople = [...people];
  filteredPeople = filteredPeople.filter(
    (person) => person instanceof classMap[value]
  );
};

// Average Age
const averageAgeInput = document.getElementById("avg-age");
const calculateAverageAge = (people) => {
  let totalAge = 0;
  people.forEach((person) => {
    totalAge += person.edad;
  });
  return Math.round(totalAge / people.length) || 0;
};

const changeInnerText = (element, newText) => {
  element.innerText = newText;
};

changeInnerText(
  averageAgeInput,
  `Edad promedio: ${calculateAverageAge(filteredPeople)}`
);

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
const updateIdValue = (id = undefined) => {
  if (id) {
    idInput.value = id;
    return id;
  }
  if (people.length === 0) {
    idInput.value = 1;
    return 1;
  }
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
  showClassInputs(event.target);
});

const showClassInputs = (input) => {
  if (input.value === "Futbolista") {
    futbolistasFields.forEach((futbolistaField) => {
      futbolistaField.style.display = "flex";
      const input = futbolistaField.querySelector("input, select");
      if (input) input.setAttribute("required", "");
    });
  } else if (input.value === "Profesional") {
    profesionalFields.forEach((profesionalField) => {
      profesionalField.style.display = "flex";
      const input = profesionalField.querySelector("input, select");
      if (input) input.setAttribute("required", "");
    });
  }
};

// Create table from data

const headers = getHeadersFromArray(people);

const tableHead = document.getElementById("table-head");
const tableBody = document.getElementById("table-body");

fillTable(headers, filteredPeople, tableHead, tableBody, checkedValues, true);
getDeleteButtons();
getUpdateButtons();

// Form Validation

abmForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = getFormValues(abmForm);
  try {
    const cleanedData = cleanData(data, classMap[type.value].getProperties());
    const person = new classMap[type.value](cleanedData);
    const peopleExists = people.findIndex((p) => p.id === person.id);
    if (peopleExists !== -1) {
      people[peopleExists] = person;
      filteredPeople[peopleExists] = person;
    } else {
      people.push(person);
      filteredPeople.push(person);
    }
    clearTable(tableHead, tableBody);
    changeInnerText(
      averageAgeInput,
      `Edad promedio: ${calculateAverageAge(filteredPeople)}`
    );
    fillTable(
      getHeadersFromArray(filteredPeople),
      filteredPeople,
      tableHead,
      tableBody,
      checkedValues,
      true
    );
    getDeleteButtons();
    getUpdateButtons();
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
    changeInnerText(
      averageAgeInput,
      `Edad promedio: ${calculateAverageAge(filteredPeople)}`
    );

    fillTable(
      getHeadersFromArray(filteredPeople),
      filteredPeople,
      tableHead,
      tableBody,
      checkedValues,
      true
    );
    getDeleteButtons();
    getUpdateButtons();
  });
});
