const { Schema, model } = require("mongoose");

module.exports = model(
  "chat",
  new Schema(
    {
      senderId: { required: true, type: String },
      recieverId: { required: true, type: String },
      messageType: { required: true, type: String },
      message: { required: true, type: String },
    },
    { timestamps: true }
  )
);
