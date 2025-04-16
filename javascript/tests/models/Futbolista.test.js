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

  test("should instantiate a Futbolista object successfully", () => {
    expect(futbolista.id).toBe(1);
    expect(futbolista.nombre).toBe("John");
    expect(futbolista.apellido).toBe("Doe");
    expect(futbolista.edad).toBe(30);
    expect(futbolista.equipo).toBe("Boca");
    expect(futbolista.posicion).toBe("Delantero");
    expect(futbolista.cantidadGoles).toBe(20);
  });

  describe("Superclass validation", () => {
    test("should throw an error if ID is not a number", () => {
      expect(
        () => new Futbolista("1", "John", "Doe", 30, "Boca", "Delantero", 20)
      ).toThrowError("Id must be a number");
    });

    test("should throw an error if name and last name are missing", () => {
      expect(
        () => new Futbolista(1, "", "", 30, "Boca", "Delantero", 20)
      ).toThrow("All fields are required");
    });

    test("should throw an error if name or last name are not strings", () => {
      expect(
        () => new Futbolista(1, 2, "Pérez", 30, "Boca", "Delantero", 20)
      ).toThrow("Name and last name must be strings");
    });

    test("should throw an error if age is not a number", () => {
      expect(
        () => new Futbolista(1, "John", "Doe", "30", "Boca", "Delantero", 20)
      ).toThrow("Age must be a number");
    });

    test("should throw an error if age is less than or equal to 15", () => {
      expect(
        () => new Futbolista(1, "John", "Doe", 14, "Boca", "Delantero", 20)
      ).toThrow("Age must be greater than 15");
    });
  });

  describe("Futbolista validation", () => {
    test("should throw an error if equipo is missing", () => {
      expect(
        () => new Futbolista(1, "John", "Doe", 30, "", "Delantero", 20)
      ).toThrow("Team is required");
    });

    test("should throw an error if posicion is missing", () => {
      expect(
        () => new Futbolista(1, "John", "Doe", 30, "Boca", "", 20)
      ).toThrow("Position is required");
    });

    test("should throw an error if cantidadGoles is missing", () => {
      expect(
        () => new Futbolista(1, "John", "Doe", 30, "Boca", "Delantero")
      ).toThrow("Goals amount is required");
    });

    test("should throw an error if equipo or posicion are not strings", () => {
      expect(
        () => new Futbolista(1, "John", "Doe", 30, 2, "Delantero", 20)
      ).toThrow("Team and posicion must be strings");
    });

    test("should throw an error if cantidadGoles is not a number", () => {
      expect(
        () => new Futbolista(1, "John", "Doe", 30, "Boca", "Delantero", "20")
      ).toThrow("Goals ammount must be a number");
    });

    test("should throw an error if cantidadGoles is less than 0", () => {
      expect(
        () => new Futbolista(1, "John", "Doe", 30, "Boca", "Delantero", -1)
      ).toThrow("Goals ammount must be greater than 0");
    });
  });
});
