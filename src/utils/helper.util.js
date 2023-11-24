const emptyOrRows = (rows) => {
    if (!rows) return [];
    return rows;
}

const isEmptyObj = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

module.exports = {
    emptyOrRows,
    isEmptyObj
}