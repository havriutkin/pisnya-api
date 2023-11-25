const songService = require("../services/song.service");

const getAll = async (req, res, next) => {
    try {
        res.json(await songService.getSongs());
    } catch (err) {
        console.error(`Error while getting songs`, err.message);
        next(err);
    }
}

const getById = async (req, res, next) => {
    try {
        res.json(await songService.getSongById(req.params.id));
    } catch (err) {
        console.error('Error while getting song by id', err.message);
        next(err);
    }
}

const getByGenreName = async (req, res, next) => {
    try {
        res.json(await songService.getSongsByGenreName(req.query.genre_name));
    } catch (err) {
        console.error('Error while getting song by a genre name', err.message);
        next(err);
    }
}

const getByArtistName = async (req, res, next) => {
    try {
        res.json(await songService.getSongsByArtistName(req.query.artist_name));
    } catch (err) {
        console.error('Error while getting song by an artist name', err.message);
        next(err);
    }
}

const getByTitle = async (req, res, next) => {
    try {
        res.json(await songService.getSongsByTitle(req.query.title));
    } catch (err) {
        console.error('Error while getting song by title', err.message);
        next(err);
    }
}

const getByFilter = async (req, res, next) => {
    try {
        res.json(await songService.getSongsByFilter({
            genreName: req.query.genre_name,
            artistName: req.query.artist_name,
            title: req.query.title
        }));
    } catch (err) {
        console.error('Error while getting song by filter', err.message);
        next(err);
    }
}

const create = async (req, res, next) => {
    try {
        res.json(await songService.postSong(req.body));
    } catch (err) {
        console.error('Error while creating song', err.message);
        next(err);
    }
}