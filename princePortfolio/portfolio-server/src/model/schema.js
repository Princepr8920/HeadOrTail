const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "Email is required"] },
  subject: { type: String },
  message: { type: String, required: [true, "Message is required"] },
  userID: {
    type: String,
    required: [true, "UserID is required"],
    unique: true,
  },
  time: { type: String, default: new Date() },
});

const contactSchema = mongoose.model("contactSchema", schema);

module.exports = contactSchema;
