const mysql = require('mysql');  // mysql 모듈 로드 
const conn = {  // mysql 접속 설정
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'database_development'
};

let connection = mysql.createConnection(conn); // DB 커넥션 생성
connection.connect();

module.exports = connection;