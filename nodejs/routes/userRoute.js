const express = require("express");
const { verifyToken } = require("../utils/auth.js");
const {
  userLogin,
  userSignup,
  getUserInfo,
  updateUserInfo,
} = require("../controllers/userController.js");

const router = express.Router();

router.post("/login", userLogin);
router.post("/signup", userSignup);
router.get("/me", verifyToken, getUserInfo);
router.patch("/update", updateUserInfo);

module.exports = router;
