const { connectToAstraDB } = require("./astraDB/astraDB.js");
const userRoute = require("./routes/userRoute.js");
const chatBotRoute = require("./routes/chatBotRoute.js");
const kundaliRoute = require("./routes/kundaliRoute.js");
const cors = require("cors");

require("dotenv").config();

let database;
try {
  const dbConnection = connectToAstraDB();
  database = dbConnection.database;
  console.log("Database connection established");
} catch (error) {
  console.error("Failed to connect to database:", error);
  process.exit(1);
}

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.use((req, res, next) => {
  req.db = database;
  // console.log(database);
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to your Node.js server!");
});

//ROUTES
app.use("/user", userRoute);
app.use("/chatbot", chatBotRoute);
app.use("/kundali", kundaliRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
