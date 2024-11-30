import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "../Models/user.model.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const user = await createUser(fullname, email, password);
    const token = jwt.sign({ userId: email }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.status(201).json({
      message: "User signed up successfully",
      token: token,
      user: { _id: user.email, fullname: user.fullname, email: user.email },
    });
  } catch (error) {
    if (error.message === "User already exists") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    
    const token = jwt.sign({ userId: user.email }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { _id: user.email, fullname: user.fullname, email: user.email },
    });
  } catch (error) {
    console.error("Error in login:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
