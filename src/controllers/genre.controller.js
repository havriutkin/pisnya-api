const genreService = require("../services/genre.service");
const {isEmptyObj} = require("../utils/helper.util");

const getAll = async (req, res, next) => {
    try {
        if (!isEmptyObj(req.query)){
            const filter = {
                name: req.query.name
            };
            res.json(await genreService.getGenresByFilter(filter));
        } else{
            res.json(await genreService.getGenres());
        }
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

const create = async (req, res, next) => {
    console.log(req);
    try {
        res.json(await genreService.postGenre(req.body));
    } catch (err) {
        console.error(`Error while creating genre: `, err.message);
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        res.json(await genreService.putGenre({...req.body, id: req.params.id}));
    } catch (err) {
        console.error(`Error while updating genre: `, err.message);
        next(err);
    }
}

const remove = async (req, res, next) => {
    try {
        res.json(await genreService.deleteGenre(req.params.id));
    } catch (err) {
        console.error(`Error while removing genre: `, err.message);
        next(err);
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}