const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwtProvider = require("../config/jwtProvider.js");
//import jwtProvider from '../config/jwtProvider'

const createUser = async (userData) => {
  try {
    let { firstName, lastName, email, password } = userData;

    let isUserExist = await user.findOne({ email });

    if (isUserExist) {
      throw new Error("User already exists with this email ", email);
    }

    password = await bcrypt.hash(password, 10);

    const User = await user.create({ firstName, lastName, email, password });

    return User;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserById = async (userId) => {
  try {
    const User = user.findById(userId);

    if (!User) {
      throw new Error("User not found with Id :", userId).populate("address");
    }
    return User;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const User = user.findOne({ email });

    if (!User) {
      throw new Error("User not found with Email :", email);
    }
    return User;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserProfileByToken = async (token) => {
  try {
    const userId = jwtProvider.getUserIdFromToken(token);

    const User = await getUserById(userId);

    if (!User) {
      throw new Error("User not found with Id :", userId);
    }
    return User;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await user.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getUserProfileByToken,
  getAllUsers,
};
