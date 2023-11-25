const albumService =  require("../services/album.service");
const {isEmptyObj} = require("../utils/helper.util");

const getAll = async (req, res, next) => {
    try {
        if (!isEmptyObj(req.query)){
            const filter = {
                title: req.query.title,
                artist_id: req.query.artist_id
            };
            res.json(await albumService.getAlbumsByFilter(filter));
        } else{
            res.json(await albumService.getAlbums());
        }
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

const create = async (req, res, next) => {
    try {
        res.json(await albumService.postAlbum(req.body));
    } catch (err) {
        console.error('Error while creating album', err.message);
        next(err);
    }   
}

const update = async (req, res, next) => {
    try {
        res.json(await albumService.putAlbum({...req.body, id: req.params.id}));
    } catch (err) {
        console.error(`Error while updating album: `, err.message);
        next(err);
    }
}

const remove = async (req, res, next) => {
    try {
        res.json(await genreService.deleteGenre(req.params.id));
    } catch (err) {
        console.error(`Error while removing album: `, err.message);
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