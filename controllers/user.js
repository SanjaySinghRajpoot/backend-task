import express from "express";
const router = express.Router();
import User from "../models/user.js";

export const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.send("Error " + err);
  }
};

export const getIdUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.send("Error " + err);
  }
};

export const postdetails = async (req, res) => {
  const temp = new User({
    emailID: req.body.email,
    namePerson: req.body.name,
    incomePerYear: req.body.income,
    savings: req.body.savings,
    mobile: req.body.mobile,
  });
  try {
    const a1 = await temp.save();
    res.json(a1);
  } catch (err) {
    res.send("Error" + err);
  }
};

export const updateDetails = async (req, res) => {
  try {
    const temp = await User.findById(req.params.id);
    temp.sub = req.body.sub;
    const a1 = await temp.save();
    res.json(a1);
  } catch (err) {
    res.send("Error"+ err);
  }
};
