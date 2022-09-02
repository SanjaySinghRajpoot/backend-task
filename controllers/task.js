import express from "express";
import mongoose from "mongoose";
import User from "../models/user.js";
import twilio from "twilio";
import csvWriter from "csv-writer";
import translate from "translate";

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

//Task Number 4
//A recent client partner wanted us to send an SMS to the customer whose details are collected in the response as soon as the ingestion was complete reliably. The content of the SMS consists of details of the customer, which were a part of the answers in the response. This customer was supposed to use this as a “receipt” for them having participated in the exercise.
export const sendSms = async(req, res) => {
    const { email, name, income, savings, mobile } = req.body;
    var client = new twilio(
      "AC52afef0b9a5fcfcac44e96a32a48fe2b",
      "98c9d76a07349e3d3fab1aae5a99baf0"
    );
    client.messages
      .create({
        to: mobile,
        from: "+19993675309",
        body: `Your Details :\n Email ID :${email}\n Name : ${name}\n Income Per Annum: ${income}\n Savings Per Annum: ${savings}\n Contact : ${mobile}\n Thankyou for your response`,
      })
      .then(res.send("Message success"))
      .catch((err) => res.send(err));
  }