const express = require("express");
const app = express();
var dotenv = require("dotenv");
dotenv.config();
var taches = [
  { titre: "tache 1 serveur", etat: "Terminer" },
  { titre: "tache 2 serveur", etat: "En cours" },
  { titre: "tache 3 serveur", etat: "A faire" },
  { titre: "tache 4 serveur", etat: "A faire" }
];
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "token, Content-Type, X-Requested-With"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  if (req.method == "OPTIONS") return res.sendStatus(200);
  next();
});
app.get("/", function(req, res) {
  res.send("Premier projet node ");
});
app.post("/", function(req, res) {
  res.send("Premier projet node via post ");
});

var server = app.listen(process.env.NODE_PORT, function() {
  console.log("server is listening on port ", server.address().port);
});
