const express = require("express");
const router = express.Router();

const ratingController = require("../controller/rating.controller.js");
const authenticate = require("../middleware/authenticate.js");

router.post("/", authenticate, ratingController.createRating);
router.get("/product/:productId", authenticate, ratingController.getAllRating);

module.exports = router;
