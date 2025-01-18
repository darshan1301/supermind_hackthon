const express = require("express");
const { verifyToken } = require("../utils/auth");
const { handleUserInput } = require("../controllers/chatBotController");

const router = express.Router();

router.post("/", verifyToken, handleUserInput);

module.exports = router;
