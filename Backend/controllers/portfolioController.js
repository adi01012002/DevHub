const Portfolio = require("../models/Portfolio");
const User = require("../models/User");
exports.createPortfolio = async (req, res) => {
  try {
    const { name, education, about, skills, projects, experiences, certifications } = req.body;
    const userId = req.user.id;
    const portfolio = new Portfolio({
      userId,
      name,
      education,
      about,
      skills,
      projects,
      experiences,
      certifications
    });
    await portfolio.save();
    res.status(201).json({ portfolio });
  } catch (error) {
    res.status(500).json({ error: "Error creating portfolio" ,error});
  }
};

// Public portfolio view by username (no auth)
exports.getPublicPortfolioByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    // console.log(user)
    // console.log(req,"req")
    if (!user) return res.status(404).json({ error: "User not found" });
    const portfolio = await Portfolio.findOne({ userId: user._id });
    if (!portfolio) return res.status(404).json({ error: "Portfolio not found" });
    res.json({ portfolio });
  } catch (error) {
    res.status(500).json({ error: "Error fetching public portfolio", details: error.message });
  }
};

exports.getPortfolioByUserId = async (req, res) => {
  try {
    const { username } = req.params;
 
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });
    const portfolio = await Portfolio.findOne({ userId: user._id });
    if (!portfolio) return res.status(404).json({ error: "Portfolio not found" });
    res.json({ portfolio });
  } catch (error) {
    res.status(500).json({ error: "Error fetching portfolio", details: error.message });
  }
};