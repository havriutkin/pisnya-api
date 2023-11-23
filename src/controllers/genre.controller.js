const genreService = require("../services/genre.service");

const getAll = async (req, res, next) => {
    try {
        res.json(await genreService.getGenres());
    } catch (err) {
        console.error(`Error while getting genres`, err.message);
        next(err);
    }
}

const getById = async (req, res, next) => {
    try {
        res.json(await genreService.getGenreById(req.params.id));
    } catch (err) {
        console.error(`Error while getting genre by id`, err.message);
        next(err);
    }
}

const getByName = async (req, res, next) => {
    try {
        res.json(await genreService.getGenresByName(req.query.name));
    } catch (err) {
        console.error(`Error while getting genre by name`, err.message);
        next(err);
    }
}

const create = async (req, res, next) => {
    console.log(req);
    try {
        res.json(await genreService.postGenre(req.body));
    } catch (err) {
        console.error(`Error while creating genre: `, err.message);
        next(err);
    }
}

module.exports = {
    getAll,
    getById,
    getByName,
    create
}