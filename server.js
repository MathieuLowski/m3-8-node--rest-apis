"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const {
  handleClientList,
  handleClientId,
  handleAddClient,
  hadleDeleteClient,
} = require("./handlers/clientHandlers");

const {
  handleWord,
  handleWordId,
  handleGuess,
} = require("./handlers/hangmanHandlers");

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints
  .get("/", handleClientList)
  .get("/clientlist", handleClientList)
  .get("/client/:id", handleClientId)
  .post("/clients", handleAddClient)
  .delete("/client/:id", hadleDeleteClient)
  .listen(8000, () => console.log(`Listening on port 8000`));
/////HANGMAN
app.get("/hangman/word", handleWord);
app.get("/hangman/word/:id", handleWordId);
app.get("/hangman/guess/:id/:letter", handleGuess);
