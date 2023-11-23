const express = require("express");
const genreController = require("../controllers/genre.controller");

const router = express.Router();

router.get('/', genreController.getAll);

router.get('/:id', genreController.getById);

router.get('/byname', genreController.getByName);

router.post('/', genreController.create);

module.exports = router;