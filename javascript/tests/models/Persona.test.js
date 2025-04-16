import { Persona } from "../../models/Persona.js";
import { describe, test, expect } from "vitest";

describe("Persona", () => {
  test("Persona", () => {
    expect(() => new Persona(1, "John", "Doe", 30)).toThrowError(
      "This class is abstract"
    );
  });
});
