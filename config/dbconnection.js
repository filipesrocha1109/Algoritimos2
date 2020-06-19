var mysql = require('mysql');

/// metodo para iniciar apenas uma vez a conexão com o banco
var connMySQL = function(){
    return mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '1234',
        database : 'systemcovid-19'
    });
}

module.exports = function(){
    return connMySQL;
}