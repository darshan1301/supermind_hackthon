const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/auth.js");
const { v4: uuidv4 } = require("uuid");

const createTablesIfNotExist = async (db) => {
  try {
    // Astra DB / Cassandra table creation
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        user_id uuid PRIMARY KEY,
        name text,
        date_of_birth text,
        time_of_birth text,
        gender text,
        state text,
        city text,
        email text,
        password text,
        created_at timestamp,
        updated_at timestamp
      );
    `;
    await db.execute(createTableQuery);

    // Create an index on email for efficient lookups
    const createIndexQuery = `
      CREATE INDEX IF NOT EXISTS users_email_idx ON users (email);
    `;
    await db.execute(createIndexQuery);

    console.log("Table 'users' and indices created successfully.");
  } catch (error) {
    console.error("Error creating table or index:", error);
    throw error;
  }
};

const userSignup = async (req, res) => {
  const {
    name,
    dateOfBirth,
    timeOfBirth,
    gender,
    state,
    city,
    email,
    password,
  } = req.body;

  try {
    await createTablesIfNotExist(req.db);

    // Check if email exists
    const checkEmailQuery = `SELECT email FROM users WHERE email = ? ALLOW FILTERING`;
    const existingUser = await req.db.execute(checkEmailQuery, [email], {
      prepare: true,
    });

    if (existingUser.rowLength > 0) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    const currentTime = new Date().toISOString();

    // Insert new user
    const insertQuery = `
      INSERT INTO users (
        user_id, name, date_of_birth, time_of_birth, gender, 
        state, city, email, password, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    await req.db.execute(
      insertQuery,
      [
        userId,
        name,
        dateOfBirth,
        timeOfBirth,
        gender,
        state,
        city,
        email,
        hashedPassword,
        currentTime,
        currentTime,
      ],
      { prepare: true }
    );

    const token = generateToken(userId);
    res.status(201).json({ token });
  } catch (err) {
    console.error("Error in userSignup:", err);
    res.status(500).json({ message: "Error creating user: " + err.message });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = `SELECT * FROM users WHERE email = ? ALLOW FILTERING`;
    const result = await req.db.execute(query, [email], { prepare: true });

    if (result.rowLength === 0) {
      return res.status(404).json({
        message: "User not found. Please check your email and try again.",
      });
    }

    const user = result.rows[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid password. Please try again.",
      });
    }

    const token = generateToken(user.user_id);
    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ message: "Internal server error during login" });
  }
};

const getUserInfo = async (req, res) => {
  const userId = req.user.userId;

  try {
    const query = `SELECT * FROM users WHERE user_id = ?`;
    const result = await req.db.execute(query, [userId], { prepare: true });

    if (result.rowLength === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    const user = result.rows[0];
    const { password, ...userInfo } = user;
    res.status(200).json({ user: userInfo });
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ message: "Error fetching user information" });
  }
};

const updateUserInfo = async (req, res) => {
  const userId = req.user.userId;
  const updateData = { ...req.body };

  // Remove sensitive fields from update data
  delete updateData.password;
  delete updateData.email;
  delete updateData.user_id;

  try {
    // Construct dynamic update query based on provided fields
    const updateFields = Object.keys(updateData)
      .map((field) => `${field} = ?`)
      .join(", ");

    if (!updateFields) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const query = `
      UPDATE users 
      SET ${updateFields}, updated_at = ? 
      WHERE user_id = ?
    `;

    const values = [
      ...Object.values(updateData),
      new Date().toISOString(),
      userId,
    ];

    await req.db.execute(query, values, { prepare: true });

    // Verify the update
    const checkQuery = `SELECT * FROM users WHERE user_id = ?`;
    const result = await req.db.execute(checkQuery, [userId], {
      prepare: true,
    });

    if (result.rowLength === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User information updated successfully" });
  } catch (error) {
    console.error("Error updating user info:", error);
    res.status(500).json({ message: "Error updating user information" });
  }
};

module.exports = {
  userLogin,
  userSignup,
  getUserInfo,
  updateUserInfo,
};
