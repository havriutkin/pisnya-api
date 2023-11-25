const express = require("express");
const albumController = require("../controllers/album.controller");

const router = express.Router();

router.get('/', albumController.getAll);

router.get('/:id', albumController.getById);

router.post('/', albumController.create);

router.put('/:id', albumController.update);

router.delete('/:id', albumController.remove);

module.exports = router;