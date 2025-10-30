import express from "express";

const router = express.Router();

router.get("/login", (req, res) => {
    res.send("Login Endpoint");
});
router.get("/logout", (req, res) => {
    res.send("Logout Endpoint");
});
router.get("/signup", (req, res) => {
    res.send("Login Signup");
});

export default router;