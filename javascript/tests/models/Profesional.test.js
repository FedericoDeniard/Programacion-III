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

  test("should correctly initialize a Profesional object", () => {
    expect(profesional.id).toBe(1);
    expect(profesional.nombre).toBe("John");
    expect(profesional.apellido).toBe("Doe");
    expect(profesional.edad).toBe(30);
    expect(profesional.titulo).toBe("Programacion");
    expect(profesional.facultad).toBe("UTN");
    expect(profesional.añoGraduacion).toBe(2020);
  });

  test("ID is not a number", () => {
    expect(
      () => new Profesional("1", "John", "Doe", 30, "Programacion", "UTN", 2020)
    ).toThrowError("Id must be a number");
  });

  test("Name and LastName are missing", () => {
    expect(
      () => new Profesional(1, "", "", 30, "Programación", "UTN", 2020)
    ).toThrow("All fields are required");
  });

  test("Name or Lastname are not a string", () => {
    expect(
      () => new Profesional(1, 2, "Pérez", 30, "Programación", "UTN", 2020)
    ).toThrow("Name and last name must be strings");
  });
});
