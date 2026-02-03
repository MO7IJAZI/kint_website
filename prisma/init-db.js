require("dotenv").config();

const mysql = require("mysql2/promise");

function parseDatabaseUrl(databaseUrl) {
  const url = new URL(databaseUrl);
  const database = decodeURIComponent(url.pathname.replace(/^\/+/, ""));
  const port = url.port ? Number(url.port) : 3306;

  return {
    host: url.hostname,
    port,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database,
  };
}

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  const { host, port, user, password, database } = parseDatabaseUrl(databaseUrl);

  if (!database) {
    throw new Error("DATABASE_URL does not include a database name");
  }

  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
    multipleStatements: false,
  });

  const safeDatabaseName = database.replace(/`/g, "``");

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${safeDatabaseName}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );

  await connection.end();

  console.log(`Database ensured: ${database}`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
});
