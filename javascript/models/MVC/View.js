import { getHeadersFromArray, hiddenValues } from "../../utils/tables";

export class View {
  dataForm;
  FormAbm;
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
    };
    this.filters = {
      profession: this.$("personas"),
      averageText: this.$("avg-age"),
      checkboxes: this.$("data-form").querySelectorAll("input[type=checkbox]"),
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

        this.dataForm.tableContainer.editButtons = [];
        // Edit
        const editTD = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.id = `edit-${person.id}`;
        editButton.textContent = "Editar";
        editButton.value = person.id;
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
}
