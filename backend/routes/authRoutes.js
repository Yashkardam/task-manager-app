const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
router.get("/me", authMiddleware, (req, res) => {
    res.json({ userId: req.userId });
});
router.post("/register", register);
router.post("/login", login);
router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
});
module.exports = router;