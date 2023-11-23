const db = require("../configs/db.config");
const {emptyOrRows} = require("../utils/helper.util");

/*
    TODO:

*/

// Makes quiery to the db. If data doesn't exist returns empty array
const query = async (sql, params = []) => {
    const data = await db.query(sql, params);
    const rows = emptyOrRows(data['rows']);
    return rows;
};

module.exports = {
    query
}