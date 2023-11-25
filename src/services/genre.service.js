const {query} = require("./db.service");

// ------------ GET QUERIES ------------

// Returns all genres (empty array if doesn't exist)
const getGenres = async () => {
    const sql = `
        SELECT * 
        FROM genre;
    `;

    const data = await query(sql);
    return data;
};

// Return genre with given id (empty array if doesn't exist)
const getGenreById = async (id) => {
    const sql = `
        SELECT *
        FROM genre
        WHERE genre_id = $1;
    `;

    const data = await query(sql, [id]);
    return data;
};

// Return genre with given name. Case-insensitive, partial matching. (empty array if doesn't exist)
const getGenresByFilter = async (filter) => {
    const sql = `
        SELECT *
        FROM genre
        WHERE name ILIKE $1
        ORDER BY LENGTH(name);
    `;

    const data = await query(sql, [`%${filter.name}%`]);
    return data;
};

// ------------ POST QUERIES ------------

// Add new genre to db. Returns id of added genre if success. Throws error otherwise
const postGenre = async ({name, description}) => {
    const sql = `
        INSERT INTO genre (name, description)
        VALUES ($1, $2)
        RETURNING genre_id;
    `;  

    params = [name, description];

    try {
        const result = await query(sql, params);
        return result;
    } catch (error) {
        console.error("Error posting song:", error);
        throw error;
    }
};

// ------------ PUT SERVICES ------------
const putGenre = async ({id, name, description}) => {
    const sql = `
        UPDATE genre
        SET name=$1, description=$2
        WHERE id = $3
        RETURNING id;
    `;

    params = [name, description, id];

    try {
        const result = await query(sql, params);
        return result;
    } catch (err) {
        console.error("Error while putting genre", err.message);
        throw(err);
    }
}

// ------------ DELETE SERVICES ------------
const deleteGenre = async (id) => {
    const sql = `
        DELETE FROM genre
        WHERE id = $1;
    `;

    params = [id];

    try {
        await query(sql, params);
        return {genre_id: id};
    } catch (err) {
        console.error("Error while deleting genre", err.message);
        throw(err);
    }
}


module.exports = {
    getGenres,
    getGenreById,
    getGenresByFilter,
    postGenre,
    putGenre,
    deleteGenre
}