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

function isPermissionError(error) {
  const code = error && typeof error === "object" ? error.code : undefined;
  return (
    code === "ER_DBACCESS_DENIED_ERROR" ||
    code === "ER_ACCESS_DENIED_ERROR" ||
    code === "ER_SPECIFIC_ACCESS_DENIED_ERROR"
  );
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

  try {
    const [rows] = await connection.query(
      "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ? LIMIT 1",
      [database]
    );

    if (Array.isArray(rows) && rows.length > 0) {
      console.log(`Database exists: ${database}`);
      return;
    }

    const safeDatabaseName = database.replace(/`/g, "``");
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${safeDatabaseName}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );

    console.log(`Database created: ${database}`);
  } catch (error) {
    if (isPermissionError(error)) {
      console.log(
        `Skipping CREATE DATABASE (missing privileges). Ensure DB exists in Hostinger panel: ${database}`
      );
      return;
    }
    throw error;
  } finally {
    await connection.end();
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
});
