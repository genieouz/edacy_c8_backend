(function() {
  var mongoose = require("mongoose");
  var tacheSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    etat: { type: String, required: true },
    file: { type: String }
  });

  module.exports = {
    tacheModel: mongoose.model("Tache", tacheSchema)
  };
})();
