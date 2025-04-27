import { createModal } from "../../utils/modals";
import { getHeadersFromArray, hiddenValues } from "../../utils/tables";

export class View {
  dataForm;
  formAbm;
  filters;
  constructor() {
    this.dataForm = {
      form: this.$("data-form"),

      tableContainer: {
        thead: this.$("table-head"),
        tbody: this.$("table-body"),
        tfoot: this.$("table-foot"),
        deleteButtons: [],
        editButtons: [],
      },
      openDialogButton: this.$("open-form"),
    };
    this.filters = {
      profession: this.$("personas"),
      averageText: this.$("avg-age"),
      checkboxes: this.$("data-form").querySelectorAll("input[type=checkbox]"),
    };
    this.formAbm = {
      form: this.$("abm-form"),
      modalObject: createModal(this.$("abm-form")),
      idInput: this.$("id"),
      type: this.$("type"),
      futbolistasFields: document.querySelectorAll(".futbolista-field"),
      profesionalFields: document.querySelectorAll(".profesional-field"),
    };
  }

  $(id) {
    return document.getElementById(id);
  }

  fillTable(data, hiddenKeys = [], canEdit = false) {
    const headers = getHeadersFromArray(data);
    let tableHead = this.dataForm.tableContainer.thead;
    let tableBody = this.dataForm.tableContainer.tbody;
    const tableHeadRow = document.createElement("tr");
    const publicHeaders = hiddenValues(headers, hiddenKeys);
    publicHeaders.forEach((header) => {
      const th = document.createElement("th");
      let textCapitalized = header.charAt(0).toUpperCase() + header.slice(1);
      th.textContent = textCapitalized;
      tableHeadRow.appendChild(th);
    });
    tableHead.appendChild(tableHeadRow);
    this.dataForm.tableContainer.deleteButtons = [];
    this.dataForm.tableContainer.editButtons = [];

    data.forEach((person) => {
      const tableRow = document.createElement("tr");
      publicHeaders.forEach((header) => {
        const td = document.createElement("td");
        td.textContent = person[header] || "N/A";
        tableRow.appendChild(td);
      });
      if (canEdit && publicHeaders.length > 0) {
        // Delete
        const td = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.id = `delete-${person.id}`;
        deleteButton.textContent = "Eliminar";
        deleteButton.classList.add("button", "--red");
        deleteButton.value = person.id;
        this.dataForm.tableContainer.deleteButtons.push(deleteButton);
        td.appendChild(deleteButton);
        tableRow.appendChild(td);

        // Edit
        const editTD = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.id = `edit-${person.id}`;
        editButton.textContent = "Editar";
        editButton.value = person.id;
        this.dataForm.tableContainer.editButtons.push(editButton);
        editButton.classList.add("button", "--yellow");
        editTD.appendChild(editButton);
        tableRow.appendChild(editTD);
      }
      tableBody.appendChild(tableRow);
    });
  }

  clearTable = () => {
    this.dataForm.tableContainer.thead.innerHTML = "";
    this.dataForm.tableContainer.tbody.innerHTML = "";
  };

  updateAverageAge(newAverageAge) {
    const averageAgeInput = this.filters.averageText;
    averageAgeInput.innerText = `Edad promedio: ${newAverageAge}`;
  }

  updateNewId(newId) {
    const idInput = this.formAbm.idInput;
    idInput.value = newId;
  }

  showClassInputs() {
    if (this.formAbm.type.value === "Futbolista") {
      this.formAbm.futbolistasFields.forEach((futbolistaField) => {
        futbolistaField.style.display = "flex";
        const input = futbolistaField.querySelector("input, select");
        if (input) this.formAbm.type.setAttribute("required", "");
        this.resetProfesionalFields();
      });
    } else if (this.formAbm.type.value === "Profesional") {
      this.formAbm.profesionalFields.forEach((profesionalField) => {
        profesionalField.style.display = "flex";
        const input = profesionalField.querySelector("input, select");
        if (input) this.formAbm.type.setAttribute("required", "");
        this.resetFutbolistaFields();
      });
    } else {
      this.resetFutbolistaFields();
      this.resetProfesionalFields();
    }
  }

  resetFutbolistaFields() {
    this.formAbm.futbolistasFields.forEach((futbolistaField) => {
      futbolistaField.style.display = "none";
      const input = futbolistaField.querySelector("input, select");
      if (input) {
        input.removeAttribute("required");
        input.value = null;
      }
    });
  }

  resetProfesionalFields() {
    this.formAbm.profesionalFields.forEach((profesionalField) => {
      profesionalField.style.display = "none";
      const input = profesionalField.querySelector("input, select");
      if (input) {
        input.removeAttribute("required");
        input.value = null;
      }
    });
  }

  fillFormValues = (data, form) => {
    const elements = form.elements;
    for (let el of elements) {
      if (!el.name) continue;

      if (el.name === "type") {
        el.value = data.hasOwnProperty("equipo") ? "Futbolista" : "Profesional";
        continue;
      }
      el.value = data[el.name] || "";
    }
  };
}
