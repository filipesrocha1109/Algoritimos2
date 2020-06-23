function LoginDAO(connection){
    this._connection = connection
}

LoginDAO.prototype.login = function(Usuarios, callback ){
    //console.log("SELECT ID FROM Usuarios where Usuario ='"+ Usuarios.usuario + "' AND Senha = '"+Usuarios.senha+"'")
    this._connection.query( "SELECT ID FROM Usuarios where Usuario ='"+ Usuarios.usuario + "' AND Senha = '"+Usuarios.senha+"'" , callback ); 
}

module.exports = function(){

    return LoginDAO;

}