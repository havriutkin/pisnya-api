import artistService from "../services/artist.service";

const getAll = async (req, res, next) => {
    try {
        res.json(await artistService.getArtists());
    } catch (err) {
        console.error(`Error while getting artists`, err.message);
        next(err);
    }
}

const getById = async (req, res, next) => {
    try {
        res.json(await artistService.getArtistById(req.query.id));
    } catch (err) {
        console.error(`Error while getting artist by id`, err.message);
        next(err);
    }
}

const getByName = async (req, res, next) => {
    try {
        res.json(await artistService.getArtistsByName(req.body.name));
    } catch (err) {
        console.error(`Error while getting artists`, err.message);
        next(err);
    }
}

const create = async (req, res, next) => {
    try {
        res.json(await artistService.postArtist(req.body));
    } catch (err) {
        console.error(`Error while getting artists`, err.message);
        next(err);
    }
}

module.exports = {
    getAll,
    getById,
    getByName,
    create
}