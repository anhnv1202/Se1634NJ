import mongoose, { ObjectId, Schema }  from "mongoose";
import validator from "validator/lib/isEmail.js";
//18/9/2023
export const User = mongoose.model(
  "User", new Schema({
    id: { type: ObjectId },
    //model validation
    name: {
      type: String,
      require: true,
      validate: {
        validator:(value)=>value.length >3,
        message: "Length of name > 3"
      }
    },
    email: {
      type: String,
      require: true,
      validate: {
        validator:(value)=>value.isEmail,
        message: "Incorrect format"
      }
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: false,
    },
  })
);
