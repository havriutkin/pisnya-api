const express = require("express");
const artistController = require("../controllers/artist.controller");

const router = express.Router();

router.get('/', artistController.getAll);

router.get('/:id', artistController.getById);

router.get('/artistbyname', artistController.getByName);

router.post('/', artistController.create);

module.exports = router;