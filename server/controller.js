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
        sequelize.query(`
            SELECT quotes.quote_id, users.phone, quotes.date, quotes.time, quotes.service
            FROM quotes
            JOIN users ON users.user_id = quotes.user_id
            WHERE users.phone = '${quotePhone}' 
        `)
        .then(dbRes => {res.status(200).send(dbRes[0])})
        .catch(err => console.log("something went wrong with the database", err))
    },

    scheduleQuote: (req, res) => {
        let {firstName, lastName, phone, 
            email, service, date, time, 
            address, city, state, notes} = req.body

        console.log(req.body)
        if(checkPhone() === true)
        sequelize.query(`
            WITH newuser AS (INSERT INTO users (first_name, last_name, phone, email)
            VALUES (:first_name, :last_name, :phone, :email)
            RETURNING user_id)

            INSERT INTO quotes ( service, date, time, address, city, state, notes, user_id)
            SELECT  :service, :date, :time, :address, :city, :state, :notes, user_id FROM newuser; 
        `,
            {
                replacements: {
                    first_name: firstName,
                    last_name: lastName,
                    phone: phone,
                    email: email,
                    service: service,
                    date: date,
                    time: time,
                    address: address,
                    city: city,
                    state: state,
                    notes: notes
                }
            }
        )
        .then((dbRes) => {
            res.status(200).send(dbRes)
        })
        .catch(err => console.log("something went wrong with the DB", err))
    },

    deleteQuote: (req,res) => {
        const {quoteId} = req.params

        sequelize.query(`
            DELETE FROM quotes
            WHERE quote_id = :quoteId
        `,
            {
                replacements: {
                    quoteId: quoteId
                }
            }
        
        )
        .then(()=> res.sendStatus(200))
        .catch(err => console.log("something went wrong with the DB", err))

    }

}