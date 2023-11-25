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

const getAlbumsByFilter = async (filter) => {
    const sql = `
        SELECT album.album_id, album.title,
            artist.name AS artist_name, album.release_date,
            album.cover_img_url
        FROM album
        JOIN artist ON album.fk_artist_id = artist.artist_id
        WHERE artist.id = $1
            OR album.title ILIKE $2
        ORDER BY LENGTH(album.title);
    `;

    const data = query(sql, [filter.artist_id, filter.title]);
    return data;
}   

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
        console.error("Error posting album:", error);
        throw error;
    }
}

// ------------ PUT SERVICES ------------
const putAlbum = async ({id, title, artist_id, release_date, cover_img_url}) => {
    const sql = `
        UPDATE genre
        SET fk_artist_id=$1, title=$2, release_date=$3, cover_img_url=$4
        WHERE id = $5
        RETURNING id;
    `;

    params = [artist_id, title, release_date, cover_img_url, id];

    try {
        const result = await query(sql, params);
        return result;
    } catch (err) {
        console.error("Error while putting album", err.message);
        throw(err);
    }
}

// ------------ DELETE SERVICES ------------
const deleteAlbum = async (id) => {
    const sql = `
        DELETE FROM album
        WHERE id = $1;
    `;

    params = [id];

    try {
        await query(sql, params);
        return {album_id: id};
    } catch (err) {
        console.error("Error while deleting album", err.message);
        throw(err);
    }
}


module.exports = {
    getAlbums,
    getAlbumById,
    getAlbumsByFilter,
    postAlbum,
    putAlbum,
    deleteAlbum
}