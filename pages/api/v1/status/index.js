import database from "infra/database.js";
import { InternalServerError } from "infra/errors";

const status = async (request, response) => {
  try {
    let query;
    const updatedAt = new Date().toISOString();

    query = await database.query("SHOW server_version;");
    const serverVersion = query.rows[0].server_version;

    query = await database.query("SHOW max_connections;");
    const maxConnections = query.rows[0].max_connections;

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
  } catch (error) {
    const publicErrorObject = new InternalServerError({
      cause: error,
    });

    console.error(publicErrorObject);

    response.status(500).json({ publicErrorObject });
  }
};

export default status;
