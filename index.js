const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  acl = require("express-acl"),
  jwt = require("jsonwebtoken");
require("dotenv").config();
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

/**************** CONFIG ACL *****************/
let configObject = {
  filename: "acl.json",
  path: "config"
};

acl.config(configObject);

//definir l'objet dans le quel se trouve le role dans la requete
acl.config({
  decodedObjectName: "user"
});

//cherchera role dans req.user.role
acl.config({
  roleSearchPath: "user.role"
});
/**************** END CONFIG ACL *****************/

/**
 * CONNECTION A LA BASE MONGO
 */
mongoose.connection.openUri(
  process.env.MONGO_URL,
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.log(`MongoDB connection error: ${err}`);
      process.exit(1);
    }

    initApp();
  }
);
//LOAD ROUTES
function initApp() {
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

  /**
   * CHARGEMENT DES ROUTES D'AUTHENTIFICATION
   */
  require("./modules/auth/auth.routes")(app);

  /******
   * VERIFIER LA CONNECTIVITE DU USER
   */
  app.use((req, res, next) => {
    let token = req.headers.token;
    jwt.verify(token, "secret", function(err, decoded) {
      if (err) {
        return res.status(401).json({
          status: "error",
          body: "Vous n'êtes pas connecté"
        });
      } else {
        req.user = decoded.data;
        next();
      }
    });
  });

  /********* VERIFIER SI LE USER EST AUTORISE A
   * ACCEDER A LA ROUTE DEMANDEE
   */
  app.use(acl.authorize);

  /**
   * CHARGEMENT DES AUTRES ROUTES
   */
  require("./modules/taches/taches.routes")(app);

  /********** RETOURE UNE ERREUR 404 SI AUCUNE ROUTE NE
   * CORRESPOND A LA DEMANDE
   */
  app.use(function(req, res) {
    res.status(404).send("OUPS PAGE INTROUVABLE");
  });
  var server = app.listen(process.env.PORT, function() {
    console.log("L'application tourne sur le port ", server.address().port);
  });
}
