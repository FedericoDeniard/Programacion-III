import { Persona } from "../../models/Persona.js";
import { describe, test, expect } from "vitest";

describe("Persona", () => {
  test("should throw an error when trying to instantiate a Persona object", () => {
    expect(() => new Persona(1, "John", "Doe", 30)).toThrowError(
      "This class is abstract"
    );
  });
});
