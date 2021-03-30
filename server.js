"use strict";

var express = require("express");
var mongo = require("mongodb");
var mongoose = require("mongoose");

require("dotenv").config();

var cors = require("cors");

var app = express();

// Basic Configuration
var port = process.env.PORT || 3000;

/** this project needs a db !! **/
// mongoose.connect(process.env.DB_URI);

// process.cwd() prints out the current working directory

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/** this project needs to parse POST bodies **/

app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res, next) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res, next) {
  res.json({ greeting: "hello API" });
});

app.post("/api/shorturl/new", (req, res, next) => {
  console.log(req.body);
  res.json({ "req.body": req.body, Hi: "hi" });
});

app.listen(port, function () {
  console.log(`Node.js listening at port ${port}`);
});
