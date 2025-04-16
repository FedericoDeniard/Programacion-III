import { Futbolista } from "../../models/Futbolista.js";
import { describe, test, expect } from "vitest";

describe("Futbolista", () => {
  const futbolista = new Futbolista(
    1,
    "John",
    "Doe",
    30,
    "Boca",
    "Delantero",
    20
  );

  test("should correctly initialize a Futbolista object", () => {
    expect(futbolista.id).toBe(1);
    expect(futbolista.nombre).toBe("John");
    expect(futbolista.apellido).toBe("Doe");
    expect(futbolista.edad).toBe(30);
    expect(futbolista.equipo).toBe("Boca");
    expect(futbolista.posicion).toBe("Delantero");
    expect(futbolista.cantidadGoles).toBe(20);
  });

  test("ID is not a number", () => {
    expect(
      () => new Futbolista("1", "John", "Doe", 30, "Boca", "Delantero", 20)
    ).toThrowError("Id must be a number");
  });

  test("Name and LastName are missing", () => {
    expect(
      () => new Futbolista(1, "", "", 30, "Boca", "Delantero", 20)
    ).toThrow("All fields are required");
  });

  test("Name or Lastname are not a string", () => {
    expect(
      () => new Futbolista(1, 2, "Pérez", 30, "Boca", "Delantero", 20)
    ).toThrow("Name and last name must be strings");
  });

  test("Age is not a number", () => {
    expect(
      () => new Futbolista(1, "John", "Doe", "30", "Boca", "Delantero", 20)
    ).toThrow("Age must be a number");
  });

  test("Age must be greater than 15", () => {
    expect(
      () => new Futbolista(1, "John", "Doe", 14, "Boca", "Delantero", 20)
    ).toThrow("Age must be greater than 15");
  });
});
