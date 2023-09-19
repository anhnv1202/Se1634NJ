import { body, validationResult } from "express-validator";
import { userRepository } from "../repositories/index.js";

const getAllUser = async (req, res) => {
  try {
    const users = userRepository();
    return users;
  } catch (error) {}
};

const getUserById = async (req, res) => {
  const user = userRepository.getUserById(req);
};

const login = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { email, password } = req.body;

  //Call reponsitory: User
  res.status(200).json({ message: "Login successfull" });
  console.log(`Email: ${email}, Password: ${password}`);

  res.send("Login successfully");
};
//18/9/2023
const register = async (req, res) => {
  try {
    const errors = validationResult(req.body);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { 
      name,
      email, 
      password, 
      phoneNumber, 
      address 
    } = req.body;

    const newUser = await userRepository.register({ name, email, password, phoneNumber, address });

    // Rest of your controller logic

    res.status(200).json({ message: newUser });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export default {
  getAllUser,
  getUserById,
  login,
  register,
};
