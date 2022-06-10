const { Schema, model } = require("mongoose");

module.exports = {
  Conversation: model(
    "conversation",
    new Schema(
      {
        name: { required: true, type: String, default: "Untitled" },
        isGroup: { required: true, type: Boolean, default: false },
        members: [],
      },
      { timestamps: true }
    )
  ),
  Message: model(
    "message",
    new Schema(
      {
        senderId: { required: true, type: String },
        conversationId: { required: true, type: String },
        text: { required: true, type: String },
      },
      { timestamps: true }
    )
  ),
};
