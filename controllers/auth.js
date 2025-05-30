import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { user } from "../models/user.js";
const secret = "agentsecret";

// SIGN IN

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await user.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "7d",
    });
    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// SIGN UP

export const signUp = async (req, res) => {
  const { userName, email, dob, password, profileImage, createdAt } = req.body;

  try {
    const oldUser = await user.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await user.create({
      userName,
      email,
      password: hashedPassword,
      createdAt,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "7d",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    error;
  }
};

// GET ALL USERS

export const getUsers = async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed" });
  }
};

//  GET USER BY ID

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await user.findById(id);

    res.status(200).json(users);
  } catch (error) {
    error;
    res.status(500).json({ message: "Internal Server Error" });
  }
};
