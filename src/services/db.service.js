const db = require("../configs/db.config");

/*
    TODO:

    1. Add try-expect block 
*/

// Makes quiery to the db. If data doesn't exist returns empty array
const query = async (sql) => {
    const rows = await db.query(sql);
    const data = emptyOrRows(rows);
    return data;
};

module.exports = {
    query
}