import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  emailID: {
    type: String,
    required: true,
    unique: true,
  },
  namePerson: {
    type: String,
    required: true,
  },
  incomePerYear: {
    type: Number,
    required: true,
    integer: true,
  },
  savings: {
    type: Number,
    required: false,
    integer: true,
    minValue: 0,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    integer: true,
  },
});

export default mongoose.model("User", userSchema);
