import { getHeadersFromArray } from "../../utils/tables";
import { describe, test, expect } from "vitest";
import { Futbolista } from "../../models/Futbolista";
import { Profesional } from "../../models/Profesional";

describe("GetHeaders", () => {
  const futbolista = new Futbolista(
    1,
    "John",
    "Doe",
    30,
    "Boca",
    "Delantero",
    20
  );

  const profesional = new Profesional(
    1,
    "John",
    "Doe",
    30,
    "Programación",
    "UTN",
    2020
  );

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

  test("should return the headers of an empty array", () => {
    const emptyArray = [];
    const emptyArrayHeaders = getHeadersFromArray(emptyArray);
    expect(emptyArrayHeaders).toEqual(new Set());
  });

  test("should fail when attempting to get headers from a non-array input", () => {
    expect(() => getHeadersFromArray(null)).toThrowError();
  });
});
