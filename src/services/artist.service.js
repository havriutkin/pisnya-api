const {query} = require("./db.service");

// ------------ GET SERVICES ------------

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

/* Filter: {
        name (Case-insensitive, partial matching (empty array if doesn't exist))
    }
*/
const getArtistsByFilter = async (filter) => {
    const sql = `
        SELECT *
        FROM artist
        WHERE name ILIKE $1
        ORDER BY LENGTH(name);
    `;

    const data = query(sql, [`%${filter.name}%`])
    return data;
}

// ------------ POST SERVICES ------------

// Add new artist to db. Returns id of added artist if success. Throws error otherwise
const postArtist = async ({name, bio, birth_date, profile_img_url}) => {
    const sql = `
        INSERT INTO artist(name, bio, birth_date, profile_img_url)
        VALUES ($1, $2, $3, $4)
        RETURNING artist_id;
    `;

    params = [name, bio, birth_date, profile_img_url];

    try {
        const result = await query(sql, params);
        return result;
    } catch (error) {
        console.error("Error posting artist:", error);
        throw error;
    }
};

// ------------ PUT SERVICES ------------
const putArtist = async ({id, name, bio, birth_date, profile_img_url}) => {
    const sql = `
        UPDATE artist
        SET name=$1, bio=$2, birth_date=$3, profile_img_url=$4
        WHERE id = $5
        RETURNING id;
    `;

    params = [name, bio, birth_date, profile_img_url, id];

    try {
        const result = await query(sql, params);
        return result;
    } catch (err) {
        console.error("Error while putting artist", err.message);
        throw(err);
    }
}

// ------------ DELETE SERVICES ------------
const deleteArtist = async (id) => {
    const sql = `
        DELETE FROM artist
        WHERE id = $1;
    `;

    params = [id];

    try {
        const result = await query(sql, params);
        return {artist_id: id};
    } catch (err) {
        console.error("Error while deleting artist", err.message);
        throw(err);
    }
}

module.exports = {
    getArtists,
    getArtistById,
    getArtistsByFilter,
    postArtist,
    putArtist,
    deleteArtist
}