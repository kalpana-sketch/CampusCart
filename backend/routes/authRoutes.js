const express = require("express");
const router = express.Router();

const { signup, login, updateProfile } = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.put("/update-profile", auth, updateProfile);

module.exports = router;