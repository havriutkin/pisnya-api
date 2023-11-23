const express = require("express");
const albumController = require("../controllers/album.controller");

const router = express.Router();

router.get('/', albumController.getAll);

router.get('/bytitle', albumController.getByTitle);

router.get('/byartistid', albumController.getByArtistId);

router.get('/:id', albumController.getById);

router.post('/', albumController.create);

module.exports = router;