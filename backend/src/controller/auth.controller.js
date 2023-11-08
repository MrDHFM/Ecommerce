const userService = require("../services/user.service.js");
const jwtProvider = require("../config/jwtProvider.js");
const cartService = require("../services/cart.service.js");
const bcrypt = require("bcrypt");
const axios = require("axios");

const SECRET_KEY = "6LdJDAEpAAAAAClHOEHvCPxGSlewmvE30JwXqPKf";

const signUp = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    await cartService.createCart(user);

    return res.status(200).send({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const login = (req, res) => {
  try {
    const { captchaValue, email, password } = req.body;
    console.log(captchaValue);

    axios({
      url: `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${captchaValue}`,
      method: "POST",
    })
      .then(async ({ data }) => {
        console.log(data);
        if (data.success) {
          const user = await userService.getUserByEmail(email);
          if (!user) {
            return res
              .status(400)
              .send({ message: "User not found with this email ", email });
          }
          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            return res.status(400).send({ message: "Invalid Password" });
          }
          const jwt = jwtProvider.generateToken(user._id);
          return res.status(200).send({ jwt, message: "Login Success" });
        } else {
          res.status(400).send({ message: "Captcha verification failed" });
        }
      })
      .catch((err) => {
        res.status(400).send({ message: "Invalid Captcha" });
      });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { signUp, login };
