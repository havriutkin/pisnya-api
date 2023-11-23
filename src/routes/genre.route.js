const express = require("express");
const genreController = require("../controllers/genre.controller");

const router = express.Router();


router.get('/', genreController.getAll);

router.get('/byname', genreController.getByName);

router.get('/:id', genreController.getById);

router.post('/', genreController.create);

module.exports = router;