const albumService =  require("../services/album.service");

const getAll = async (req, res, next) => {
    try {
        res.json(await albumService.getAlbums());
    } catch (err) {
        console.error(`Error while getting albums`, err.message);
        next(err);
    }
}

const getById = async (req, res, next) => {
    try {
        res.json(await albumService.getAlbumById(req.params.id));
    } catch (err) {
        console.error('Error while getting album by id', err.message);
        next(err);
    }
}

const getByTitle = async (req, res, next) => {
    try {
        res.json(await albumService.getAlbumsByTitle(req.query.title));
    } catch (err) {
        console.error('Error while getting album by title', err.message);
        next(err);
    }
}

const getByArtistId = async (req, res, next) => {
    try {
        res.json(await albumService.getAlbumByArtistId(req.query.artist_id));
    } catch (err) {
        console.error('Error while getting album by artist id', err.message);
        next(err);
    }
}

const create = async (req, res, next) => {
    try {
        res.json(await albumService.postAlbum(req.body));
    } catch (err) {
        console.error('Error while creating album', err.message);
        next(err);
    }   
}

module.exports = {
    getAll,
    getById,
    getByTitle,
    getByArtistId,
    create
}