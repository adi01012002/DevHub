const express = require("express");
const { createPortfolio, getPortfolioByUserId, getPublicPortfolioByUsername } = require("../controllers/portfolioController");

const authenticate = require("../authenticate");
const router = express.Router();

router.post("/create", authenticate, createPortfolio);                                    
// router.get("/:username", authenticate , getPortfolioByUserId);
router.get("/public/:username", getPublicPortfolioByUsername);                                                                             
module.exports = router;                   