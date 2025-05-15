const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  link: { type: String },
});

const ExperienceSchema = new mongoose.Schema({
  company: { type: String },
  role: { type: String },
  duration: { type: String },
  description: { type: String },
});

const CertificationSchema = new mongoose.Schema({
  name: { type: String },
  issuer: { type: String },
  date: { type: String },
  description: { type: String },
});

const PortfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  education: { type: String, required: true },
  about: { type: String, required: true },
  skills: { type: [String], required: true },
  projects: [ProjectSchema],
  experiences: [ExperienceSchema],
  certifications: [CertificationSchema],
  publicToken: { type: String, unique: true },
});

PortfolioSchema.pre('save', function (next) {
  if (!this.publicToken) {
    this.publicToken = randomUUID();
  }
  next();
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);

