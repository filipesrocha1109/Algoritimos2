function LocaisDAO(connection){
    this._connection = connection
}


LocaisDAO.prototype.getLocais = function( callback ){
    this._connection.query( 'SELECT * FROM locaisatendimento ORDER BY CreatedOnLocal DESC;' , callback ); 
}

LocaisDAO.prototype.getLocal = function(IDLocal, callback ){
    this._connection.query( 'SELECT * FROM locaisatendimento where IDLocal ='+ IDLocal.IDLocal , callback ); 
}

LocaisDAO.prototype.salvarLocal = function(local, callback){
    // mysql transforma o json no insert do banco, mas as colunas devem estar iguais aos parametros passados
    this._connection.query( 'INSERT INTO locaisatendimento set ? ' , local, callback ); 
}

LocaisDAO.prototype.get5UltimosLocais = function(callback){
    this._connection.query('SELECT * FROM locaisatendimento ORDER BY CreatedOnLocal DESC LIMIT 5' ,callback ); 
}


module.exports = function(){

    return LocaisDAO;

}