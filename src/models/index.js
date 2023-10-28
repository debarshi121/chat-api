const User = require("./userModel");
const sequelize = require("../db");

const sync = () => {
    sequelize.sync();
}

module.exports = {
    sync,
    User
}