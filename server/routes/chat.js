const router = require("express").Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

// @route    GET /
// @desc     Get most recent chats by message schema
// @access   Private

router.get("/", async (req, res) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

// @route    POST /private
// @desc     Send Messages based on Schema group message ID
// @access   Private

router.post("/private", async (req, res) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

// @route    POST /group
// @desc     Sends a message to the group
// @access   Private

router.post("/group", async (req, res) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
