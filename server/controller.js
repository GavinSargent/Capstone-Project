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
        const {quotePhone} = req.params
        console.log("THIS IS THE PHONE ", quotePhone)
        sequelize.query(`
            SELECT quotes.quote_id, users.phone, quotes.date, quotes.time, quotes.service
            FROM quotes
            JOIN users ON users.user_id = quotes.user_id
            WHERE users.phone = '${quotePhone}' 
        `).then(dbRes => {res.status(200).send(dbRes[0])
        console.log(dbRes[0])})
        .catch(err => console.log("something went wrong with the database", err))
    },

}