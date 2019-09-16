(function() {
  module.exports = function(app) {
    const Ctrl = require("./auth.controller")();
    app.route("/signin").post(Ctrl.signin);

    app.route("/signup").post(Ctrl.signup);
  };
})();
