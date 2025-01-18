require("dotenv").config();

const token = process.env.ASTRA_DB_APPLICATION_TOKEN;
const endpoint = process.env.ASTRA_DB_API_ENDPOINT;

const { DataAPIClient } = require("@datastax/astra-db-ts");

function connectToAstraDB() {
  if (!token || !endpoint) {
    throw new Error(
      "Environment variables ASTRA_DB_API_ENDPOINT and ASTRA_DB_APPLICATION_TOKEN must be defined."
    );
  }

  const client = new DataAPIClient(token);

  const database = client.db(endpoint);

  console.log(`Connected to database ${database.id}`);

  return { database, client };
}

module.exports = { connectToAstraDB };
