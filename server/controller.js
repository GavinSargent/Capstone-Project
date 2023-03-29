const Sequelize = require('sequelize');
require('dotenv').config();

const{ CONNECTION_STRING } = process.env;

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    getMyQuotes: (req, res) => {
        sequelize.query(`
            SELECT quotes.quote_id, users.phone, quotes.date, quotes.time, quotes.service
            FROM quotes
            JOIN users ON users.user_id = quotes.user_id
        `)
    }
}