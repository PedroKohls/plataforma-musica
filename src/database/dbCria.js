const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

var sql = "CREATE DATABASE IF NOT EXISTS projeto_node";
con.connect((err) => {
    if (err) throw err;
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
});
