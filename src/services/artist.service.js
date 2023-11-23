const {query} = require("./db.service");
const {emptyOrRows} = require("../utils/helper.util");


// ------------ GET QUERIES ------------

// Get all artists (empty array if doesn't exist)
const getArtists = async () => {
    const sql = `
        SELECT * 
        FROM artist;
    `;

    const data = query(sql);
    return data;
};

// Get artist by id (empty array if doesn't exist)
const getArtistById = async (id) => {
    const sql = `
        SELECT * 
        FROM artist
        WHERE artist_id = $1;
    `;

    const data = query(sql, [id]);
    return data;
};

// Get artists by name. Case-insensitive, partial matching (empty array if doesn't exist)
const getArtistsByName = async (artistName) => {
    const sql = `
        SELECT *
        FROM artist
        WHERE name ILIKE $1
        ORDER BY LENGTH(name);
    `;

    const data = query(sql, [`%${artistName}%`])
    return data;
};

// ------------ POST QUERIES ------------

// Add new artist to db. Returns id of added artist if success. Throws error otherwise
const postArtist = async ({name, bio, birth_date, profile_img_url}) => {
    const sql = `
        INSERT INTO artist(name, bio, birth_date, profile_img_url)
        VALUES ($1, $2, $3, $4)
        RETURNING artist_id;
    `;
    console.log(sql);

    params = [name, bio, birth_date, profile_img_url];

    try {
        const result = await query(sql, params);
        return result;
    } catch (error) {
        console.error("Error posting artist:", error);
        throw error;
    }
};

module.exports = {
    getArtists,
    getArtistById,
    getArtistsByName,
    postArtist
}