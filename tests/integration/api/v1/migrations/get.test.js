import database from "infra/database.js";

const cleanDatabase = async () => {
  await database.query("drop schema public cascade; create schema public;");
};

beforeAll(cleanDatabase);

test("GET to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  // status code == 200 OK
  expect(response.status).toBe(200);
  const responseBody = await response.json();
  // expect an array in response
  expect(Array.isArray(responseBody)).toBe(true);
  // expect an array not empty in response
  expect(responseBody.length).toBeGreaterThan(0);
});
