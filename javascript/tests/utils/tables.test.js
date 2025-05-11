import { getHeadersFromArray } from "../../utils/tables";
import { describe, test, expect } from "vitest";
import { Futbolista } from "../../models/Futbolista";
import { Profesional } from "../../models/Profesional";

describe("GetHeaders", () => {
  const futbolista = new Futbolista({
    id: 1,
    nombre: "John",
    apellido: "Doe",
    edad: 30,
    equipo: "Boca",
    posicion: "Delantero",
    cantidadGoles: 20,
  });

  const profesional = new Profesional({
    id: 1,
    nombre: "John",
    apellido: "Doe",
    edad: 30,
    titulo: "Programación",
    facultad: "UTN",
    añoGraduacion: 2020,
  });

  test("should return the headers of a Futbolista object", () => {
    const futbolistaHeaders = getHeadersFromArray([futbolista]);
    expect(futbolistaHeaders).toEqual(
      new Set([
        "id",
        "nombre",
        "apellido",
        "edad",
        "equipo",
        "posicion",
        "cantidadGoles",
      ])
    );
  });

  test("should return the headers of a Profesional object", () => {
    const profesionalHeaders = getHeadersFromArray([profesional]);
    expect(profesionalHeaders).toEqual(
      new Set([
        "id",
        "nombre",
        "apellido",
        "edad",
        "titulo",
        "facultad",
        "añoGraduacion",
      ])
    );
  });

  test("should return the headers of an array of objects", () => {
    const people = [futbolista, profesional];
    const peopleHeaders = getHeadersFromArray(people);
    expect(peopleHeaders).toEqual(
      new Set([
        "id",
        "nombre",
        "apellido",
        "edad",
        "equipo",
        "posicion",
        "cantidadGoles",
        "titulo",
        "facultad",
        "añoGraduacion",
      ])
    );
  });

  test("should return an empty array when attempting to get headers from an empty array", () => {
    const emptyArray = [];
    expect(getHeadersFromArray(emptyArray)).toEqual(new Set());
  });

  test("should fail when attempting to get headers from a non-array input", () => {
    expect(() => getHeadersFromArray(null)).toThrow("Input must be an array");
  });

  test("should fail when attempting to get headers from an array of non-objects", () => {
    expect(() => getHeadersFromArray([1, 2, 3])).toThrow(
      "Input at index 0 is not an object"
    );
  });

  test("should fail when not all the elements of the array are objects", () => {
    expect(() => getHeadersFromArray([futbolista, 2, profesional])).toThrow(
      "Input at index 1 is not an object"
    );
  });
});
