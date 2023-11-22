const jwtProvider = require("../config/jwtProvider.js");
const userService = require("../services/user.service.js");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    // console.log("hi", token);

    if (!token) {
      return res.status(404).send({ error: "Token not found" });
    }
    const userId = jwtProvider.getUserIdFromToken(token);
    const user = await userService.getUserById(userId);
    // console.log("auth", user);

    req.user = user;
  } catch (error) {
    console.log(error.message);

    return res.status(500).send({ error: error.message });
  }
  next();
};

module.exports = authenticate;
