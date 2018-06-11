/* jshint esnext: true, node: true */
"use strict";

const redis = require("redis");
const express = require("express");
const crypto = require("crypto");
const bodyParser = require("body-parser");

const client = redis.createClient();
const app = express();

const ONE_WEEK = 7 * 24 * 60 * 60;

client.on("error", err => console.error(`Error: ${err}`));

app.use(bodyParser.text({ "type": "*/*" }));
app.use("/mathpaste", express.static("mathpaste"));

app.get("/mathpaste/api/:pasteId", (req, res) => {
  console.log("GET");
  const pasteId = req.params.pasteId;

  client.get(`mathpaste:${pasteId}`, (err, reply) => {
    if (err !== null) {
      res.status(400);
      res.send({"ok": false, "error": err});
      return;
    }

    if (reply === null) {
      res.status(404);
      res.send({"ok": false, "error": "No such key."});
    } else {
      res.send({"ok": true, "contents": reply});
    }
  });
});

app.post("/mathpaste/api", (req, res) => {
  if (JSON.stringify(req.body) === JSON.stringify({})) {
    res.status(400);
    res.send({"ok": false, "error": "Invalid request body or content type."});
    return;
  }

  const pasteId = crypto.createHash("sha256").update(req.body).digest("hex");

  client.setex(`mathpaste:${pasteId}`, ONE_WEEK, req.body, (err, reply) => {
    if (err !== null) {
      res.status(400);
      res.send({"ok": false, "error": err});
      return;
    }

    res.send({"ok": true, "id": pasteId});
  });
});

app.listen(process.env.PORT || 8080);
