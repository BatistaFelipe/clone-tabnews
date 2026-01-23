import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("GET /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Retrieving pending migrations", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations");
      // status code == 200 OK
      expect(response.status).toBe(200);
      const responseBody = await response.json();
      // expect an array in response
      expect(Array.isArray(responseBody)).toBe(true);
      // expect an array not empty in response
      expect(responseBody.length).toBeGreaterThan(0);
    });
  });
});
