import bcrypt from "bcrypt";
import {User} from "../models/User.js";
const userRepository = {
  getUserById: async (userId) => {
    try {
      const User = await User.findById(userId);
      return User;
    } catch (error) {
      console.error(error);
      throw new Error("Fail to get user by ID");
    }
  },
};
const login = ({ email, password }) => {
  console.log(`Email: ${email}, Password: ${password}`);
};

const register = async ({ name, email, password, phoneNumber, address }) => {
  const userExisting = await User.findOne({ email }).exec();
  console.log(userExisting);
  if (userExisting) {
    throw new Error("Email đã tồn tại");
  }

  // Tạo key bí mật (secret key)
  const secretKey = "YourSecretKey"; // Thay đổi thành key thực tế của bạn

  // Kết hợp key với mật khẩu
  const passwordWithKey = password + secretKey;

  // Tạo muối để mã hóa
  const saltRounds = 10; // Bạn có thể điều chỉnh số vòng lặp tùy theo nhu cầu bảo mật
  const salt = await bcrypt.genSalt(saltRounds);

  // Mã hóa mật khẩu kết hợp với key
  const hashPassword = await bcrypt.hash(passwordWithKey, salt);

  // Tạo người dùng mới
  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    phoneNumber,
    address,
  });

  // Tuỳ chọn, bạn có thể trả về đối tượng người dùng mới được tạo
  return newUser;
};

// const getAllUser = async () => {
//   try {
//   } catch (error) {
//     console.log();
//   }
// };

// const createUser = async (userData) => {
//   try {
//     const createdUser = await User.create(userData);
//     return createdUser;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Failed to create a new user");
//   }
// };

export default {
  login,
  register,
 
};
