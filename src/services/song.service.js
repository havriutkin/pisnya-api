const {query} = require("./db.service");
const {emptyOrRows} = require("../utils/helper.util");

/*
    TODO:
    7. Check what returns postSong
*/

/*
    In SQL queries searches are case-insensitive and allow partial-matching.
    Returns result ordered by length of searched field (assume that this is the best match).
*/

// ------------ GET QUERIES ------------

// Returns all songs
const getSongs = async () => {
    const sql = `
        SELECT song.song_id, song.title, artist.name AS artist_name, 
            genre.name AS genre_name, album.name AS album_name, 
            song.release_date, song.duration, song.play_count, 
            song.file_url, song.img_url
        FROM song
        JOIN artist ON song.fk_artist_id = artist.id
        LEFT JOIN genre ON song.fk_genre_id = genre.id
        LEFT JOIN album ON song.fk_album_id = album.id;
    `;
    const data = await query(sql);
    return data;
};

// Returns song with given id if it exists. Empry array otherwise
const getSongById = async (id) => {
    const sql = `
        SELECT song.song_id, song.title, artist.name AS artist_name, 
            genre.name AS genre_name, album.name AS album_name, 
            song.release_date, song.duration, song.play_count, 
            song.file_url, song.img_url
        FROM song
        JOIN artist ON song.fk_artist_id = artist.id
        LEFT JOIN genre ON song.fk_genre_id = genre.id
        LEFT JOIN album ON song.fk_album_id = album.id
        WHERE song.song_id = $1;
    `;
    const data = await query(sql, [id]);
    return data;
};

// Returns all songs by given genre.
const getSongByGenreName = async (genreName) => {
    const sql = `
        SELECT song.song_id, song.title, artist.name AS artist_name, 
            genre.name AS genre_name, album.name AS album_name, 
            song.release_date, song.duration, song.play_count, 
            song.file_url, song.img_url
        FROM song
        JOIN artist ON song.fk_artist_id = artist.id
        LEFT JOIN genre ON song.fk_genre_id = genre.id
        LEFT JOIN album ON song.fk_album_id = album.id
        WHERE genre.name ILIKE $1
        ORDER BY LENGTH(genre.name);
    `;
    const data = await query(sql, [`%${genreName}%`]);
    return data;
};

// Returns all songs by given artist
const getSongsByArtistName = async (artistName) => {
    const sql = `
        SELECT song.song_id, song.title, artist.name AS artist_name, 
            genre.name AS genre_name, album.name AS album_name, 
            song.release_date, song.duration, song.play_count, 
            song.file_url, song.img_url
        FROM song
        JOIN artist ON song.fk_artist_id = artist.id
        LEFT JOIN genre ON song.fk_genre_id = genre.id
        LEFT JOIN album ON song.fk_album_id = album.id
        WHERE artist.name ILIKE $1;
        ORDER BY LENGTH(artist.name);
    `;
    const data = await query(sql, [`%${artistName}%`]);
    return data;
};

// Returns all songs by given title
const getSongsByTitle = async (title) => {
    const sql = `
        SELECT song.song_id, song.title, artist.name AS artist_name, 
            genre.name AS genre_name, album.name AS album_name, 
            song.release_date, song.duration, song.play_count, 
            song.file_url, song.img_url
        FROM song
        JOIN artist ON song.fk_artist_id = artist.id
        LEFT JOIN genre ON song.fk_genre_id = genre.id
        LEFT JOIN album ON song.fk_album_id = album.id
        WHERE song.title ILIKE $1
        ORDER BY LENGTH(song.title);
    `;
    const data = await query(sql, [`%${title}%`]);
    return data;
};

// Returns all songs by given filter object
// filter: {genreName: , artistName: , title: }
const getSongsByFilter = async ({genreName, artistName, title}) => {
    let sql = `
        SELECT song.song_id, song.title, artist.name AS artist_name, 
               genre.name AS genre_name, album.name AS album_name, 
               song.release_date, song.duration, song.play_count, 
               song.file_url, song.img_url
        FROM song
        LEFT JOIN artist ON song.fk_artist_id = artist.id
        LEFT JOIN genre ON song.fk_genre_id = genre.id
        LEFT JOIN album ON song.fk_album_id = album.id
    `;

    // Array to hold SQL parameters
    let params = [];
    let conditions = [];

    // Add conditions based on filters
    // ILIKE - for case insensitive, % - for partial mathching 
    if (genreName) {
        conditions.push(`genre.name ILIKE $${params.length + 1}`);
        params.push(`%${genreName}%`);
    }
    if (artistName) {
        conditions.push(`artist.name ILIKE $${params.length + 1}`);
        params.push(`%${artistName}%`);
    }
    if (title) {
        conditions.push(`song.title ILIKE $${params.length + 1}`);
        params.push(`%${title}%`);
    }

    // If there are any conditions, append them to the SQL query
    if (conditions.length) {
        sql += ` WHERE ` + conditions.join(' AND ');
    }

    // Execute the query
    const data = await query(sql, params);
    return data;
};

// ------------ POST QUERIES ------------

// Add new song to db. Returns id of added song if success. Throws error otherwise
const postSong = async ({title, artistId, albumId, genreId, releaseDate, duration, fileUrl, imgUrl}) => {
    const sql = `
        INSERT INTO song (title, fk_artist_id, fk_album_id, fk_genre_id, release_date, duration, file_url, img_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING song_id;
    `;

    params = [title, artistId, albumId, genreId, releaseDate, duration, fileUrl, imgUrl];

    try {
        const result = await query(sql, params);
        return result;
    } catch (error) {
        console.error("Error posting song:", error);
        throw error;
    }
}

module.exports = {
    getSongs,
    getSongById,
    getSongByGenreName,
    getSongsByArtistName,
    getSongsByTitle,
    getSongsByFilter,
    postSong
};