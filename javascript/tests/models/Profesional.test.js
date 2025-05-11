import { Profesional } from "../../models/Profesional.js";
import { describe, test, expect } from "vitest";

describe("Profesional", () => {
  const profesional = new Profesional({
    id: 1,
    nombre: "John",
    apellido: "Doe",
    edad: 30,
    titulo: "Programacion",
    facultad: "UTN",
    añoGraduacion: 2020,
  });

  test("should instantiate a Profesional object successfully", () => {
    expect(profesional.id).toBe(1);
    expect(profesional.nombre).toBe("John");
    expect(profesional.apellido).toBe("Doe");
    expect(profesional.edad).toBe(30);
    expect(profesional.titulo).toBe("Programacion");
    expect(profesional.facultad).toBe("UTN");
    expect(profesional.añoGraduacion).toBe(2020);
  });

  describe("Superclass validation", () => {
    test("should throw an error if ID is not a number", () => {
      expect(
        () =>
          new Profesional({
            id: "1",
            nombre: "John",
            apellido: "Doe",
            edad: 30,
            titulo: "Programacion",
            facultad: "UTN",
            añoGraduacion: 2020,
          })
      ).toThrowError("Id must be a number");
    });

    test("should throw an error if name and last name are missing", () => {
      expect(
        () =>
          new Profesional({
            id: 1,
            nombre: "",
            edad: 30,
            titulo: "Programación",
            facultad: "UTN",
            añoGraduacion: 2020,
          })
      ).toThrow("All fields are required");
    });

    test("should throw an error if name or last name are not strings", () => {
      expect(
        () =>
          new Profesional({
            id: 1,
            nombre: 2,
            apellido: "Pérez",
            edad: 30,
            titulo: "Programación",
            facultad: "UTN",
            añoGraduacion: 2020,
          })
      ).toThrow("Name and last name must be strings");
    });

    test("should throw an error if age is not a number", () => {
      expect(
        () =>
          new Profesional({
            id: 1,
            nombre: "John",
            apellido: "Doe",
            edad: "30",
            titulo: "Programación",
            facultad: "UTN",
            añoGraduacion: 2020,
          })
      ).toThrow("Age must be a number");
    });

    test("should throw an error if age is less than or equal to 15", () => {
      expect(
        () =>
          new Profesional({
            id: 1,
            nombre: "John",
            apellido: "Doe",
            edad: 14,
            titulo: "Programación",
            facultad: "UTN",
            añoGraduacion: 2020,
          })
      ).toThrow("Age must be greater than 15");
    });
  });

  describe("Profesional validation", () => {
    test("should throw an error if title is missing", () => {
      expect(
        () =>
          new Profesional({
            id: 1,
            nombre: "John",
            apellido: "Doe",
            edad: 30,
            facultad: "UTN",
            añoGraduacion: 2020,
          })
      ).toThrow("All fields are required");
    });

    test("should throw an error if facultad is missing", () => {
      expect(
        () =>
          new Profesional({
            id: 1,
            nombre: "John",
            apellido: "Doe",
            edad: 30,
            titulo: "Programación",
            añoGraduacion: 2020,
          })
      ).toThrow("All fields are required");
    });

    test("should throw an error if graduation year is not a number", () => {
      expect(
        () =>
          new Profesional({
            id: 1,
            nombre: "John",
            apellido: "Doe",
            edad: 30,
            titulo: "Programación",
            facultad: "UTN",
            añoGraduacion: "2020",
          })
      ).toThrow("Graduation year must be a number");
    });

    test("should throw an error if graduation year is less than 1950", () => {
      expect(
        () =>
          new Profesional({
            id: 1,
            nombre: "John",
            apellido: "Doe",
            edad: 30,
            titulo: "Programación",
            facultad: "UTN",
            añoGraduacion: 1899,
          })
      ).toThrow("Graduation year must be greater than 1950");
    });
  });
});
