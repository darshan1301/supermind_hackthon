const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/auth.js");
const { v4: uuidv4 } = require("uuid");

const initializeCollections = async (db) => {
  try {
    // Create users collection if it doesn't exist
    await db.createCollection("users");
    console.log("Users collection initialized successfully");
  } catch (error) {
    // Collection might already exist
    console.log("Collection initialization status:", error.message);
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
    const database = req.db;
    await initializeCollections(database);

    const usersCollection = database.collection("users");

    // Check if email exists
    const existingUser = await usersCollection.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    const currentTime = new Date().toISOString();

    // Create new user document
    const newUser = {
      _id: userId,
      name,
      date_of_birth: dateOfBirth,
      time_of_birth: timeOfBirth,
      gender,
      state,
      city,
      email,
      password: hashedPassword,
      created_at: currentTime,
      updated_at: currentTime,
    };

    // Insert the user
    await usersCollection.insertOne(newUser);

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
    const database = req.db;
    const usersCollection = database.collection("users");

    // Find user by email
    const user = await usersCollection.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        message: "User not found. Please check your email and try again.",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid password. Please try again.",
      });
    }

    const token = generateToken(user._id);
    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ message: "Internal server error during login" });
  }
};

const getUserInfo = async (req, res) => {
  const userId = req.user.userId;

  try {
    const database = req.db;
    const usersCollection = database.collection("users");

    // Find user by ID
    const user = await usersCollection.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

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
  delete updateData._id;

  try {
    const database = req.db;
    const usersCollection = database.collection("users");

    // Add updated timestamp
    updateData.updated_at = new Date().toISOString();

    // Update the user document
    const result = await usersCollection.updateOne(
      { _id: userId },
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "User not found or no changes made" });
    }

    // Verify the update
    const updatedUser = await usersCollection.findOne({ _id: userId });
    if (!updatedUser) {
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
