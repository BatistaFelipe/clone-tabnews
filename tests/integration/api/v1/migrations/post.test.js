import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("POST /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Running pending migrations", () => {
      test("For the first time", async () => {
        const response = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );
        // status code == 201 Created
        expect(response.status).toBe(201);
        const responseBody = await response.json();
        // expect an array in response
        expect(Array.isArray(responseBody)).toBe(true);
        // expect an array not empty in response
        expect(responseBody.length).toBeGreaterThan(0);
      });
    });
  });
});

// eslint-disable-next-line jest/no-identical-title
describe("POST /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Running pending migrations", () => {
      test("For the second time", async () => {
        const response = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );
        // status code == 200 OK
        expect(response.status).toBe(200);
        const responseBody = await response.json();
        // expect an array in response
        expect(Array.isArray(responseBody)).toBe(true);
      });
    });
  });
});
