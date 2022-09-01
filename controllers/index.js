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

export const storeFile = async (req, res, next) => {
    try {
      var users = await User.find();
      var createCsvWriter = csvWriter.createObjectCsvWriter;
      const CSV = createCsvWriter({
        path: "./DataStore/data.csv",
        header: [
          { id: "id", title: "ID" },
          { id: "emailID", title: "EmailID" },
          { id: "namePerson", title: "NamePerson" },
          { id: "incomePerYear", title: "IncomePerYear" },
          { id: "savings", title: "Saving Per Year" },
          { id: "mobile", title: "Mobile Number" },
        ],
      });
      await CSV.writeRecords(users).then(() =>
        res.send(
          "<a href='/DataStore/data.csv' download='data.csv' id='download-link'></a><script>document.getElementById('download-link').click();</script>"
        )
      );
    } catch (err) {
      res.send("Error " + err);
    }
  }

