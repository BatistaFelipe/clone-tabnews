import database from "infra/database.js";

const status = async (request, response) => {
  let query;
  // updated at
  const updatedAt = new Date().toISOString();
  // database version
  query = await database.query("SHOW server_version;");
  const serverVersion = query.rows[0].server_version;
  // max connections
  query = await database.query("SHOW max_connections;");
  const maxConnections = query.rows[0].max_connections;
  // used connections
  const databaseName = process.env.POSTGRES_DB;
  query = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const openedConnections = query.rows[0].count;
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: serverVersion,
        max_connections: parseInt(maxConnections),
        opened_connections: openedConnections,
      },
    },
  });
};

export default status;
