const Sequelize = require("sequelize")
require("dotenv").config()

const {CONNECTION_STRING} = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS quotes;

        CREATE TABLE users(
            user_id SERIAL PRIMARY KEY,
            first_name VARCHAR (30) NOT NULL,
            last_name VARCHAR (30) NOT NULL,
            phone VARCHAR(15) NOT NULL,
            email VARCHAR(30)          
        );

        CREATE TABLE quotes(
            quote_id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(user_id) NOT NULL,
            service VARCHAR(30) NOT NULL,
            address VARCHAR (100) NOT NULL,
            city VARCHAR (30) NOT NULL,
            state VARCHAR (2) NOT NULL,
            notes VARCHAR (100)
        );

        INSERT INTO users (first_name, last_name, phone, email)
        VALUES ('Tony', 'Stark', '111-123-1234', 'tstark@stark.com');

        INSERT INTO quotes (user_id, service, address, city, state, notes)
        VALUES (1, 'Sprinklers', '1234 S 4321 W', 'Los Angeles', 'CA', null);

        `).then(()=> {
            console.log('Database seeded')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding database'))
    }
}