(function() {
  var mongoose = require("mongoose");
  var Schema = mongoose.Schema;
  mongoose.set("useCreateIndex", true);
  var userSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    dateNaissance: { type: Date, required: false },
    role: { type: String, required: true, default: "user" }
  });

  module.exports = {
    userModel: mongoose.model("Users", userSchema)
  };
})();
