var taches = [
  { titre: "tache 1", etat: "Terminer", id: 1 },
  { titre: "tache 2", etat: "A faire", id: 2 },
  { titre: "tache 3", etat: "En cours", id: 3 }
];
const Tache = require('./taches.schema').tacheModel;
module.exports = function() {
  return {
    find: find,
    read: read
  };
};

async function find() {
  try{
    const tasks = await Tache.find({});
    return tasks;
  }catch(err){
    return err;
  }
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
