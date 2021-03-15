const multer = require('multer');

var storage = multer.memoryStorage()
var upload = multer({ storage: storage, limits: { fieldSize: 25 * 1024 * 1024 } });

module.exports = upload;