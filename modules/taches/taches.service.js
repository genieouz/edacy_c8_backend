var taches = [
  { titre: "tache 1", etat: "Terminer", id: 1 },
  { titre: "tache 2", etat: "A faire", id: 2 },
  { titre: "tache 3", etat: "En cours", id: 3 }
];
module.exports = function() {
  return {
    find: find,
    read: read
  };
};

function find() {
  return taches;
}

function read(id) {
  for (let i = 0; i < taches.length; i++) {
    if (taches[i].id == id) return taches[i];
  }
}

function create(tache) {
  tache.id = taches.length + 1;
  taches.push(tache);
  return tache;
}
