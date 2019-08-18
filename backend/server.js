const express = require('express');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');

let config = require('./config.json');
config = config.dbConfig;
let userInsertQuery = require('./userInsertQuery.json');
let friendInsertQuery = require('./friendshipInsertQuery.json')
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
const app = express();

const db = mysql.createConnection({
    insecureAuth: config.insecureAuth,
    host: config.host,
    user: config.user,
    password: config.password,
    // database: config.database,
    port: config.port,
    multipleStatements: config.multipleStatements
});

db.connect(err => {
    if (err)
        console.log(err);
    else
        console.log('mysql connected');
});
global.db = db;

app.use(express.static(
    path.join(__dirname, '../', 'dist', 'socialMedia')
))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

//api endpoints

app.get('/restservice/users/getallusers', (req, res) => {
    db.changeUser({ database: config.database }, (err) => {
        if (!err) {
            let query = `SELECT * FROM USERS
            WHERE USERS.ID BETWEEN ${ ((Number(req.query.page) - 1) * req.query.record) + 1} AND ${Number(req.query.page) * req.query.record};
            SELECT COUNT(*) FROM USERS`;

            db.query(query, (err, result) => {
                if (err)
                    res.status(400).json({ error: 'Error message '});
                else
                    res.status(200).json(result);
            });
        } else {
            res.status(400).json({ error: 'Error message '});
        }

    })
})

app.get('/restservice/users/getuserfriends', (req, res) => {
    db.changeUser({ database: config.database }, (err) => {
        if (!err) {
            let query = `SELECT * FROM USERS
                WHERE USERS.ID = ANY (
                SELECT FRIENDS.USERTWOID FROM FRIENDS
                WHERE FRIENDS.USERONEID = ${ req.query.userId} );`

            db.query(query, (err, result) => {

                if (err)
                    res.status(400).json({ error: 'Error message '});
                else
                    res.status(200).json(result);
            });
        } else {
            res.status(400).json({ error: 'Error message ' });
        }

    })
})

app.get('*', (req, res) => {

    fs.createReadStream(
        path.join(__dirname, '../', 'dist', 'socialMedia', 'index.html')
    ).pipe(res);

})



app.listen(4400, () => {
    console.log('listening at port 4400');
    console.log(" initiating initial db processing --------------------- ");
    createDatabase();
    createTable();
    insertUsers();
    insertFriendship();
    console.log(" initial db processing completed --------------------- ");
})




function createDatabase() {

    let query = `CREATE DATABASE IF NOT EXISTS ${config.database};`
    db.query(query, (err, result) => {
        if (err)
            console.log("Database creation failed-------------------------", err);
        else
            console.log(`Database ${config.database} created successfully----------------------`);
    });

}

function createTable() {

    db.changeUser({ database: config.database }, (err) => {
        if (!err) {
            let query = `CREATE TABLE IF NOT EXISTS USERS(
                id INT(6) AUTO_INCREMENT PRIMARY KEY,
                firstName VARCHAR(30) NOT NULL,
                lastName VARCHAR(30) NOT NULL,
                avatar VARCHAR(100) NOT NULL
            );
            CREATE TABLE IF NOT EXISTS FRIENDS (
                id INT(6) AUTO_INCREMENT PRIMARY KEY,
                USERONEID VARCHAR(30) NOT NULL,
                USERTWOID VARCHAR(30) NOT NULL
            );`
            // let query = `CREATE TABLE USERS IF NOT EXISTS(ID INT(6) AUTO_INCREMENT PRIMARY KEY,FIRSTNAME VARCHAR(30) NOT NULL);`
            db.query(query, (err, result) => {
                if (err)
                    console.log("Table creation failed---------------------------", err);
                else
                    console.log(`Table created successfully---------------------------`, result);
            });
        } else {
            console.log('Cant switch to database------------------', err);
        }
    })


}

function insertUsers() {
    db.changeUser({ database: config.database }, (err) => {
        if (!err) {
            let query = `INSERT INTO USERS( firstName, lastName, avatar ) VALUES ?;`
            let values = [];
            userInsertQuery.map(user => {
                values.push(Object.values(user));
            });
            console.log(values);
            db.query(query, [values], (err, result) => {
                if (err)
                    console.log("Insert process failed-------------------------", err);
                else
                    console.log(`Insert completed successfully-------------------------`);
            });
        } else {
            console.log('Cant switch to database---------------------', err);
        }

    })
}

function insertFriendship() {
    db.changeUser({ database: config.database }, (err) => {
        if (!err) {
            let query = `INSERT INTO FRIENDS( USERONEID, USERTWOID ) VALUES ?;`
            let values = [];
            friendInsertQuery.map(relation => {
                values.push(Object.values(relation));
            });

            db.query(query, [values], (err, result) => {
                if (err)
                    console.log("Database creation failed------------------", err);
                else
                    console.log(`Database ${config.database} created successfully--------------------`);
            });
        } else {
            console.log('Cant switch to database-------------------', err);
        }
    })
}