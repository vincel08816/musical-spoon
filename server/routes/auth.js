const router = require("express").Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const { User } = require("../models/user");

const secret = process.env.SECRET;

// @route    GET /auth
// @desc     Get user by token
// @access   Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.sendStatus(500);
    }
  }
);

// @route    POST /auth/login
// @desc     Login
// @access   Public

router.post(
  "/login",
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.sendStatus(400);

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.sendStatus(401);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.sendStatus(401);

      const payload = { user: { id: user.id } };
      jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.cookie("token", token, { httpOnly: true });
        // {!} maybe return user data here later
        res.json({ _id: user._id, email: user.email });
      });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

// @route    DELETE /auth/logout
// @desc     Logout
// @access   Private

router.delete(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.cookie("token", "none", {
      expires: new Date(Date.now() + 5 * 1000),
      httpOnly: true,
    });
    res.sendStatus(200);
  }
);

module.exports = router;
