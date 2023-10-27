const User = require("./user");
const sequelize = require("../db");

const sync = () => {
    sequelize.sync();
}

module.exports = {
    sync,
    User
}