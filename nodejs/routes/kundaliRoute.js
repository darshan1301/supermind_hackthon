const express = require("express");
const { verifyToken } = require("../utils/auth");
const {
  getKundali,
  getKundaliHistory,
} = require("../controllers/kundaliController");

const router = express.Router();

router.post("/", verifyToken, getKundali);
router.get("/history", verifyToken, getKundaliHistory);

module.exports = router;
