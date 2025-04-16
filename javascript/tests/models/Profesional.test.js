import { Profesional } from "../../models/Profesional.js";
import { describe, test, expect } from "vitest";

describe("Profesional", () => {
  const profesional = new Profesional(
    1,
    "John",
    "Doe",
    30,
    "Programacion",
    "UTN",
    2020
  );

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
          new Profesional("1", "John", "Doe", 30, "Programacion", "UTN", 2020)
      ).toThrowError("Id must be a number");
    });

    test("should throw an error if name and last name are missing", () => {
      expect(
        () => new Profesional(1, "", "", 30, "Programación", "UTN", 2020)
      ).toThrow("All fields are required");
    });

    test("should throw an error if name or last name are not strings", () => {
      expect(
        () => new Profesional(1, 2, "Pérez", 30, "Programación", "UTN", 2020)
      ).toThrow("Name and last name must be strings");
    });

    test("should throw an error if age is not a number", () => {
      expect(
        () =>
          new Profesional(1, "John", "Doe", "30", "Programación", "UTN", 2020)
      ).toThrow("Age must be a number");
    });

    test("should throw an error if age is less than or equal to 15", () => {
      expect(
        () => new Profesional(1, "John", "Doe", 14, "Programación", "UTN", 2020)
      ).toThrow("Age must be greater than 15");
    });
  });
});
