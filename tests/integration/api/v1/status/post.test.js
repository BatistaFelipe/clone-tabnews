import orchestrator from "tests/orchestrator.js";
import { MethodNotAllowedError } from "infra/errors";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("POST /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status", {
        method: "POST",
      });

      const responseBody = await response.json();
      const publicErrorObject = new MethodNotAllowedError();
      expect(response.status).toBe(405);
      expect(responseBody).toEqual(publicErrorObject.toJSON());
    });
  });
});
