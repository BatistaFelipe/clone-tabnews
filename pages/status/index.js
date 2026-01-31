import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let { updatedAtText, dbMaxConnections, dbOpenedConnections, dbVersion } =
    "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");

    ({
      max_connections: dbMaxConnections,
      opened_connections: dbOpenedConnections,
      version: dbVersion,
    } = data.dependencies.database);
  }

  return (
    <div>
      Última atualização: {updatedAtText}
      <br />
      <br />
      <b>Banco de Dados:</b> PostgreSQL
      <br />
      Máximo de conexões: {dbMaxConnections}
      <br />
      Conexões abertas: {dbOpenedConnections}
      <br />
      Versão: {dbVersion}
      <br />
    </div>
  );
}
