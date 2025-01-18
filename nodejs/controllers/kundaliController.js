const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

// Helper functions remain the same
function calculateLifePathNumber(birthdate) {
  const date = moment(birthdate, "YYYY-MM-DD");
  let sum = 0;
  sum += date
    .year()
    .toString()
    .split("")
    .reduce((acc, curr) => acc + parseInt(curr), 0);
  sum += date.month() + 1;
  sum += date.date();

  while (sum >= 10) {
    sum = sum
      .toString()
      .split("")
      .reduce((acc, curr) => acc + parseInt(curr), 0);
  }
  return sum;
}

function generateKundaliChart(lifePathNumber) {
  const houses = [];
  for (let i = 0; i < 12; i++) {
    const houseValue = ((lifePathNumber + i) % 9) + 1;
    houses.push(houseValue);
  }
  return houses;
}

// Create collections if they don't exist
const initializeCollections = async (database) => {
  try {
    // Create collections if they don't exist
    await database.createCollection("kundali_data");
    console.log("Collections initialized successfully");
  } catch (error) {
    // If collection already exists, this will error but we can continue
    console.log("Collections already exist or error:", error.message);
  }
};

const getKundali = async (req, res) => {
  const userId = req.user.userId;

  try {
    const database = req.db;
    await initializeCollections(database);

    // Get the kundali_data collection
    const kundaliCollection = database.collection("kundali_data");

    // First, fetch user data from users collection
    const usersCollection = database.collection("users");
    const user = await usersCollection.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const birthdate = user.date_of_birth;

    if (!birthdate || !moment(birthdate, "YYYY-MM-DD", true).isValid()) {
      return res.status(400).json({
        message:
          "Invalid birthdate format in the database. Please ensure the format is YYYY-MM-DD.",
      });
    }

    // Calculate Life Path Number and Generate Kundali Chart
    const lifePathNumber = calculateLifePathNumber(birthdate);
    const kundaliChart = generateKundaliChart(lifePathNumber);

    // Check if kundali already exists for user
    const existingKundali = await kundaliCollection.findOne({ userId: userId });

    const kundaliId = existingKundali ? existingKundali._id : uuidv4();
    const currentTime = new Date().toISOString();

    // Prepare the kundali data
    const kundaliData = {
      _id: kundaliId,
      userId: userId,
      birthdate: birthdate,
      lifePathNumber: lifePathNumber,
      kundaliChart: kundaliChart,
      generatedAt: currentTime,
    };

    // Insert or update the kundali data
    if (existingKundali) {
      // Update existing record
      await kundaliCollection.updateOne(
        { _id: kundaliId },
        { $set: kundaliData }
      );
    } else {
      // Insert new record
      await kundaliCollection.insertOne(kundaliData);
    }

    // Verify the stored data
    const storedKundali = await kundaliCollection.findOne({ _id: kundaliId });

    if (!storedKundali) {
      throw new Error("Failed to verify stored kundali data");
    }

    // Return the kundali data
    return res.status(200).json({
      id: kundaliId,
      birthdate,
      lifePathNumber,
      kundaliChart,
      generatedAt: currentTime,
      message: "Kundali generated and stored successfully",
    });
  } catch (error) {
    console.error("Error in getKundali:", error);
    return res.status(500).json({
      message: "Error generating or storing kundali data",
      error: error.message,
    });
  }
};

const getKundaliHistory = async (req, res) => {
  const userId = req.user.userId;

  try {
    const database = req.db;
    const kundaliCollection = database.collection("kundali_data");

    // Find all kundali records for the user
    const kundaliHistory = await kundaliCollection
      .find({ userId: userId })
      .toArray();

    if (!kundaliHistory || kundaliHistory.length === 0) {
      return res.status(404).json({
        message: "No kundali data found for this user",
      });
    }

    // Format the response
    const formattedHistory = kundaliHistory.map((record) => ({
      id: record._id,
      birthdate: record.birthdate,
      lifePathNumber: record.lifePathNumber,
      kundaliChart: record.kundaliChart,
      generatedAt: record.generatedAt,
    }));

    return res.status(200).json({
      history: formattedHistory,
    });
  } catch (error) {
    console.error("Error fetching kundali history:", error);
    return res.status(500).json({
      message: "Error retrieving kundali history",
      error: error.message,
    });
  }
};

module.exports = {
  getKundali,
  getKundaliHistory,
};
