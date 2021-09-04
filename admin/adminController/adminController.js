const autoIncrement = require("mongodb-autoincrement");
const properties = require('../../configs/properties');
const dbClientAdmin = require('../../configs/database');

module.exports = {
    addCategory: addCategory
}


function addCategory(req, res) {
    console.log("success");
}