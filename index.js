/* jshint esnext: true, node: true */
"use strict";

const redis = require("redis");
const express = require("express");

const client = redis.createClient();
const app = express();

client.on("error", err => console.error(err));

app.use("/mathpaste", express.static("mathpaste"));

// TODO: A redis backend.

app.listen(process.env.PORT || 3000);
