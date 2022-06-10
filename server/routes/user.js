const router = require("express").Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const passport = require("passport");

const expiresIn = 36000;

// @route    POST /users/register
// @desc     Register user
// @access   Public

router.post(
  "/signup",
  check("username", "username is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password at least 8 character and contain at least one uppercase letter, one lower case letter, and one special character."
  )
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors });

    try {
      const { username, email, password } = req.body;
      const lowercaseEmail = req.body.email.toLowerCase().replace(" ", "");

      if (await User.findOne({ lowercaseEmail })) return res.sendStatus(400);

      const user = new User({ username, email, password, lowercaseEmail });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);

      await user.save();

      const payload = { id: user.id, email: lowercaseEmail };
      jwt.sign(payload, secret, { expiresIn }, (err, token) => {
        if (err) throw err;
        res.cookie("token", token, { httpOnly: true });
        res.json(payload);
      });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

// @route    POST /users/friend
// @desc     Add/Remove Friend
// @access   Private

router.post(
  "/friend",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let user = await User.findById(req.user.id);
      let lowercaseEmail = req.body.email.toLowerCase().replace(" ", "");
      if (!user || !req.body?.email) return res.sendStatus(401);

      let friend = await User.findOne({ lowercaseEmail });
      if (!friend)
        return res.status(400).send({ error: "User does not exist." });

      // {!} refactor this? I can just use the id to remove later.
      const alreadyAdded = user.friends.some(
        (id) => id.toString() === friend._id.toString()
      );

      alreadyAdded
        ? (user.friends = user.friends.filter(
            (id) => id.toString() !== friend._id.toString()
          ))
        : user.friends.push(friend._id);

      await user.save();

      res.json(`User ${alreadyAdded ? "removed from" : "added to"} list`);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

module.exports = router;
