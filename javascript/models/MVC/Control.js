import classMap from "../../constants/classMap.js";
import { cleanData, getFormValues } from "../../utils/forms.js";
import { Futbolista } from "../Futbolista.js";
import { Persona } from "../Persona.js";
import { Profesional } from "../Profesional.js";

export class Controlller {
  View;
  Model;
  constructor(vista, modelo, initialData) {
    this.View = vista;
    this.Model = modelo;
    this.Model.people = initialData;
    this.Model.filteredPeople = this.Model.people;
    this.checkboxListener();
    this.professionListener();
    this.openDialogListener();
    this.closeDialogListener();
  }

  checkboxListener() {
    const checkBoxes = this.View.filters.checkboxes;
    checkBoxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        let hiddenValues = [...checkBoxes]
          .filter((b) => !b.checked)
          .map((b) => b.value);
        this.Model.hiddenValues = hiddenValues;
        this.updateTable();
      });
    });
  }

  professionListener() {
    const professionInput = this.View.filters.profession;

    professionInput.addEventListener("change", () => {
      this.Model.filterPeople(this.View.filters.profession.value);
      this.updateTable();
    });
  }

  openDialogListener() {
    this.View.dataForm.openDialogButton.addEventListener("click", () => {
      this.View.formAbm.modalObject.modal.showModal();
      this.View.updateNewId(this.Model.getIdValue());
      this.View.showClassInputs();
      this.updateFieldsOnDialog();
      this.submitFormListener();
    });
  }

  closeDialogListener() {
    this.View.formAbm.modalObject.modal.addEventListener("close", () => {
      this.View.formAbm.form.reset();
    });
  }

  updateFieldsOnDialog() {
    this.View.formAbm.type.addEventListener("change", () => {
      this.View.showClassInputs();
    });
  }
  deleteButtonsListener() {
    this.View.dataForm.tableContainer.deleteButtons.forEach((button) => {
      button.addEventListener("click", async () => {
        const id = Number(button.value);
        this.View.setGeneralLoader();
        try {
          await this.Model.deletePeople(id);
        } catch (e) {
          console.log(e);
        }
        this.updateTable();
        this.View.removeGeneralLoader();
      });
    });
  }

  editButtonsListener() {
    this.View.dataForm.tableContainer.editButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const id = Number(button.value);
        const person = this.Model.findPerson(id);
        this.View.fillFormValues(person, this.View.formAbm.form);
        this.View.showClassInputs();
        this.View.updateNewId(id);
        this.View.formAbm.modalObject.modal.showModal();
        this.updateFieldsOnDialog();
        this.submitFormListener();
      });
    });
  }

  updateTable() {
    this.Model.filterPeople(this.View.filters.profession.value);
    this.View.fillTable(
      this.Model.filteredPeople,
      this.Model.hiddenValues,
      true
    );
    this.deleteButtonsListener();
    this.editButtonsListener();
    this.updateAverageAge();
  }

  updateAverageAge() {
    let totalAge = 0;
    this.Model.filteredPeople.forEach((person) => {
      totalAge += person.edad;
    });
    const averageAge =
      Math.round(totalAge / this.Model.filteredPeople.length) || 0;
    this.View.updateAverageAge(averageAge);
  }

  submitFormListener() {
    this.View.formAbm.form.addEventListener("submit", async (event) => {
      event.preventDefault();
      this.View.setGeneralLoader();
      this.View.formAbm.modalObject.modal.close();
      const data = getFormValues(this.View.formAbm.form);
      const cleanedData = cleanData(
        data,
        classMap[this.View.formAbm.type.value].getProperties()
      );
      const person = new classMap[this.View.formAbm.type.value](cleanedData);
      try {
        await this.Model.addPeople(person);
      } catch (e) {
        this.View.formAbm.modalObject.modal.showModal();
        console.log(e);
      } finally {
        this.updateTable();
        this.View.formAbm.form.reset();
        this.View.removeGeneralLoader();
      }
    });
  }
}
