const {query} = require("./db.service");
const {emptyOrRows} = require("../utils/helper.util");


// ------------ GET QUERIES ------------

// Get all albums (empty array if doesn't exist)
const getAlbums = async () => {
    const sql = `
        SELECT album.album_id, album.title,
            artist.name AS artist_name, album.release_date,
            album.cover_img_url
        FROM album
        JOIN artist ON album.fk_artist_id = artist.artist_id;
    `;

    const data = query(sql);
    return data;
};

// Get album by id (empty array if doesn't exist)
const getAlbumById = async (id) => {
    const sql = `
        SELECT album.album_id, album.title,
            artist.name AS artist_name, album.release_date,
            album.cover_img_url
        FROM album
        JOIN artist ON album.fk_artist_id = artist.artist_id
        WHERE album.album_id = $1;
    `;

    const data = query(sql, [id]);
    return data;
};

// Get albums by title. Case-insensitive, partial matching (empty array if doesn't exist)
const getAlbumsByTitle = async (title) => {
    const sql = `
        SELECT album.album_id, album.title,
            artist.name AS artist_name, album.release_date,
            album.cover_img_url
        FROM album
        JOIN artist ON album.fk_artist_id = artist.artist_id
        WHERE album.title ILIKE $1
        ORDER BY LENGTH(album.title);
    `;

    const data = query(sql, [`%${title}%`]);
    return data;
};


// Get album by given artist id (empty array if doesn't exist)
const getAlbumByArtistId = async (artistId) => {
    const sql = `
        SELECT album.album_id, album.title,
            artist.name AS artist_name, album.release_date,
            album.cover_img_url
        FROM album
        JOIN artist ON album.fk_artist_id = artist.artist_id
        WHERE artist.id = $1;
    `;

    const data = query(sql, [artistId]);
    return data;
};

// ------------ POST QUERIES ------------

// Add new album to db. Returns id of added album if success. Throws error otherwise
const postAlbum = async ({title, artist_id, release_date, cover_img_url}) => {
    const sql = `
        INSERT INTO album(fk_artist_id, title, release_date, cover_img_url)
        VALUES ($1, $2, $3, $4)
        RETURNING album_id;
    `;

    const params = [artist_id, title, release_date, cover_img_url];

    try {
        const result = await query(sql, params);
        return result;
    } catch (error) {
        console.error("Error posting song:", error);
        throw error;
    }
}

module.exports = {
    getAlbums,
    getAlbumById,
    getAlbumsByTitle,
    getAlbumByArtistId,
    postAlbum
}