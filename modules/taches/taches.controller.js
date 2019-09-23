(function() {
  const Tache = require("./taches.schema").tacheModel;
  const tacheService = require("./taches.service")();
  const uploadFile = require("../../utils/file-upload").uploadFile;
  const multer = require("multer");
  const fs = require("fs");
  module.exports = {
    list: async (req, res) => {
      reponse = await tacheService.find();
      res.json({
        status: "success",
        message: reponse
      });
    },
    create: async (req, res) => {
      upload = multer({ dest: "dist/attachments" }).single("fichier");
      upload(req, res, function(error) {
        if (error || !req.file) {
          return res.status(500).json({
            message: "Erreur lors de l'enregistrement du fichier",
            error: error
          });
        } else {
          oldPath = req.file.path;
          extension = req.file.originalname.split(".");
          nbItems = extension.length;
          extension = extension[nbItems - 1];
          newPath = oldPath + "." + extension;
          fs.rename(oldPath, newPath, async err => {
            req.body.file = req.file.filename + "." + extension;
            let tache = new Tache(req.body);
            response = await tache.save();
            res.json({
              status: "success",
              message: reponse
            });
          });
        }
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
    },
    attacheFile: (req, res) => {
      upload = multer({ dest: "dist/attachments" }).single("fichier");
      upload(req, res, function(error) {
        if (error || !req.file) {
          return res.status(500).json({
            message: "Erreur lors de l'enregistrement du fichier",
            error: error
          });
        } else {
          oldPath = req.file.path;
          extension = req.file.originalname.split(".");
          nbItems = extension.length;
          extension = extension[nbItems - 1];
          newPath = oldPath + "." + extension;
          fs.rename(oldPath, newPath, err => {
            const nameInDir = req.file.filename + "." + extension;
            Tache.findByIdAndUpdate(
              { _id: req.params.taskId },
              { file: nameInDir },
              function(err) {
                return res.json({
                  message: "File uploaded",
                  body: req.file
                });
              }
            );
          });
        }
      });
    }
  };
})();
