const express = require("express");
const genreController = require("../controllers/genre.controller");

const router = express.Router();

router.get('/', genreController.getAll);

router.get('/:id', genreController.getById);

router.post('/', genreController.create);

router.put('/:id', genreController.update);

router.delete('/:id', genreController.remove);

module.exports = router;