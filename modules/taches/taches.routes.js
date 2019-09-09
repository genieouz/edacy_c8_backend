(function() {
  module.exports = function(app) {
    let Ctrl = require("./taches.controller");
    app
      .route("/tache")
      .get(Ctrl.list)
      .post(Ctrl.create);
    app
      .route("/tache/:id")
      .get(Ctrl.read)
      .delete(Ctrl.delete)
      .put(Ctrl.update);
    app.route("/:taskId/attach-file").put(Ctrl.attacheFile);
  };
})();
