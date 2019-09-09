let uploadFile = function(upload, req, res) {
  return new Promise((resolve, reject) => {
    upload(req, res, function(err) {
      if (err) {
        reject(err);
      } else if (!req.file) {
        reject({ error: "File not found" });
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  uploadFile: uploadFile
};
