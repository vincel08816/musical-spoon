const { Schema, model } = require("mongoose");

module.exports = model(
  "user",
  new Schema(
    {
      username: { type: String, required: true },
      password: { type: String, required: true },
      email: { type: String, required: true },
      picture: { type: String },
    },
    { timestamps: true }
  )
);
