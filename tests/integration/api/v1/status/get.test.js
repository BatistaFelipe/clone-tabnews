test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  // status code == 200 OK
  expect(response.status).toBe(200);
  // updated at
  const responseBody = await response.json();
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
  // database version
  expect(responseBody.dependencies.database.version).toEqual("16.0");
  // max connections
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  // opened connections
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
