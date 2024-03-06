const mysql = requiere("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user :  "root",
    password: "1234",
    port : 3306,
    database: "DB_Kindergarten",
})

module.exports = {pool};