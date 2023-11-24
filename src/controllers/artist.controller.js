const artistService =  require("../services/artist.service");
const {isEmptyObj} = require("../utils/helper.util");

const getAll = async (req, res, next) => {
    try {
        if (!isEmptyObj(req.query)){
            const filter = {
                name: req.query.name
            };
            res.json(await artistService.getArtistsByFilter(filter));
        } else{
            res.json(await artistService.getArtists());
        }
    } catch (err) {
        console.error(`Error while getting artists`, err.message);
        next(err);
    }
}

const getById = async (req, res, next) => {
    try {
        res.json(await artistService.getArtistById(req.params.id));
    } catch (err) {
        console.error(`Error while getting artist by id`, err.message);
        next(err);
    }
}

const create = async (req, res, next) => {
    try {
        res.json(await artistService.postArtist(req.body));
    } catch (err) {
        console.error(`Error while creating artist: `, err.message);
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        res.json(await artistService.putArtist({...req.body, id: req.params.id}));
    } catch (err) {
        console.error(`Error while updating artist: `, err.message);
        next(err);
    }
}

const remove = async (req, res, next) => {
    try {
        res.json(await artistService.deleteArtist(req.params.id));
    } catch (err) {
        console.error(`Error while removing artist: `, err.message);
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