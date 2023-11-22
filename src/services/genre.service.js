const {query} = require("./db.service");
const {emptyOrRows} = require("../utils/helper.util");


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

// Return genre with given name (empty array if doesn't exist)
const getGenreByName = async (genreName) => {
    const sql = `
        SELECT *
        FROM genre
        WHERE name = $1;
    `;

    const data = await query(sql, [genreName]);
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

module.exports = {
    getGenres,
    getGenreById,
    getGenreByName,
    postGenre
}