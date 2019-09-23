(function() {
  const Users = require("../users/users.model").userModel;
  const bcrypt = require("bcrypt");
  const saltRounds = 10,
    jwt = require("jsonwebtoken");
  module.exports = function() {
    return {
      signin: async (req, res) => {
        let user = await Users.findOne({ username: req.body.username });
        if (!user)
          return res.json({
            status: "error",
            body: "Nom d'utilisateur incorrecte"
          });
        bcrypt
          .compare(req.body.password, user.password)
          .then(function(correct) {
            if (correct) {
              let reponse = {
                _id: user._id,
                prenom: user.prenom,
                nom: user.nom,
                username: user.username,
                role: user.role
              };
              let token = jwt.sign(
                {
                  data: reponse
                },
                "secret",
                { expiresIn: 60 * 60 }
              );
              reponse.token = token;
              return res.json({
                status: "success",
                body: reponse
              });
            } else {
              return res.json({
                status: "error",
                body: "Mot de passe incorrecte"
              });
            }
          });
      },
      signup: (req, res) => {
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
          if (err) {
            console.log(err);
          } else {
            req.body.password = hash;
            req.body.role = "user";
            let user = new Users(req.body);
            user.save((err, user) => {
              if (err)
                return res.json({
                  status: "error",
                  body: err
                });
              return res.json({
                body: user,
                status: "success"
              });
            });
          }
        });
      }
    };
  };
})();
