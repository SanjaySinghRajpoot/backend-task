const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const twilio = require("twilio");
const csvWriter = require("csv-writer");
const translate = require("translate");

const router = express.Router()

//Task Number 1
//One of our clients wanted to search for slangs (in local language) for an answer to a text question on the basis of cities (which was the answer to a different MCQ question)
export const langConverter = async (req, res) => {
  translate.engine = "google";
  console.log(req.query);
  try {
    const word = await translate(req.query.EnteredWord, req.query.Enteredlang);
    res.send(word);
  } catch {
    res.send(err.message);
  }
};
