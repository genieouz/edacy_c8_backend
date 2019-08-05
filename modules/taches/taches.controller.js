(function() {
  const Tache = require("./taches.schema").tacheModel;
  const tacheService = require("./taches.service")();
  module.exports = {
    list: (req, res) => {
      console.log("hell  o");
      reponse = tacheService.find();
      res.json({
        status: "success",
        message: reponse
      });
    },
    create: (req, res) => {
      let tache = new Tache(req.body);
      tache.save((err, reponse) => {
        if (err) {
          res.status(500).json({
            status: "error",
            message: err
          });
        }
        res.json({
          status: "success",
          message: reponse
        });
      });
    },
    read: (req, res) => {
      let reponse = tacheService.read(req.params.id);
      res.json({
        status: "succes",
        message: reponse
      });
    },
    delete: (req, res) => {
      Tache.remove({ _id: req.params.id }, function(err, reponse) {
        res.json({
          status: "succes",
          message: reponse
        });
      });
    },
    update: (req, res) => {
      Tache.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true },
        function(err, reponse) {
          res.json({
            status: "succes",
            message: reponse
          });
        }
      );
    }
  };
})();
