const router = require("express").Router();
const User = require("../models/User");
const { Conversation, Message } = require("../models/Chat");
const { check, validationResult } = require("express-validator");
const passport = require("passport");

// {!!!} Protect these routes with passport after testing

// {!} 6/10 - Test this route

// @route    GET /conversations
// @desc     Get all private conversations by a single user
// @access   Private

router.get(
  "/conversations",
  // passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // {?} query mongo by conversations with members including the current user

      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

// {!} 6/10 - Test this route

// @route    GET /messages
// @desc     Get all messages for a single conversation
// @access   Private

router.get(
  "/messages",
  // passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { conversationId } = req.body;
      if (!conversationId) return res.sendStatus(400);

      const messages = await Message.find({ conversationId });

      res.json(messages);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

// {!} 6/10 - Test this route
// {!} 6/10 - Update Route to include group messages

async function makeAndGetId(user, { name, isGroup, members }) {
  try {
    let newConversation = new Conversation({ name, members, isGroup });

    // {!} figure out how to query by: !isGroup + members[user, reciever] + etc

    // if (!isGroup && await Conversation.findOne({isGroup: false, members),  })) {
    //   throw new Error("Conversation already exists");
    // }
    await newConversation.save();
    return newConversation._id;
  } catch (error) {
    throw error;
  }
}

// @route    POST /message
// @desc     Send Messages between user or group
// @access   Private

router.post(
  "/message",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (!req.user?._id || !req.body?.members) return res.sendStatus(400);
      let conversationId =
        req.body.conversationId || (await makeAndGetId(req.user, req.body));
      await new Message({
        senderId: req.user._id,
        conversationId,
        text: req.body.text,
      }).save();
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

module.exports = router;
