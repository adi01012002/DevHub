
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash the password if it's new or modified
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
// Instance method to match passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log("Comparing:", enteredPassword, "with", this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};


// Export the User model
const User = mongoose.model("User", userSchema);
module.exports = User;

