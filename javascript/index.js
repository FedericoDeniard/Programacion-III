import { Futbolista } from "./models/Futbolista.js";
import { Persona } from "./models/Persona.js";
import { Profesional } from "./models/Profesional.js";
import peopleList from "./constants/index.js";

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
  console.log(people);
};

createPeople();

const type = document.getElementById("type");
const futbolistasFields = document.querySelectorAll(".futbolista-field");
const profesionalFields = document.querySelectorAll(".profesional-field");

futbolistasFields.forEach((futbolistaField) => {
  futbolistaField.style.display = "none";
});
profesionalFields.forEach((profesionalField) => {
  profesionalField.style.display = "none";
});

type.addEventListener("change", (event) => {
  futbolistasFields.forEach((futbolistaField) => {
    futbolistaField.style.display = "none";
    const input = futbolistaField.querySelector("input, select");
    if (input) {
      input.removeAttribute("required");
      input.value = "";
    }
  });
  profesionalFields.forEach((profesionalField) => {
    profesionalField.style.display = "none";
    const input = profesionalField.querySelector("input, select");
    if (input) {
      input.removeAttribute("required");
      input.value = "";
    }
  });

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

// const form = document.querySelector("form");

// const handleSubmit = (event) => {
//   event.preventDefault();
//   const name = document.querySelector("#name").value;
//   const email = document.querySelector("#email").value;
//   console.log(`Name: ${name}, Email: ${email}`);
//   form.removeEventListener("submit", handleSubmit);
// };
// form.addEventListener("submit", handleSubmit);

// const title = document.querySelector("h1");
// title.innerText;
// const parragraph = document.querySelector("p");
// setTimeout(() => {
//   parragraph.innerText = "Hola, como estas?";
// }, 5000);

// const textAnimation = (node, text, interval = 100) => {
//   let i = 0;
//   node.textContent = "";

//   const writeChar = () => {
//     if (i < text.length) {
//       node.textContent += text[i];
//       i++;
//       setTimeout(writeChar, interval);
//     } else {
//       setTimeout(() => {
//         node.textContent = "";
//         i = 0;
//         writeChar();
//       }, 1000);
//     }
//   };

//   writeChar();
// };

// textAnimation(title, "Formulario a completar");
