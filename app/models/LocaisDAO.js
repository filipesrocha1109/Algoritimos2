function LocaisDAO(connection){
    this._connection = connection
}

LocaisDAO.prototype.getLocais = function( callback ){
    this._connection.query( 'SELECT * FROM locaisatendimento ORDER BY CreatedOnLocal DESC;' , callback ); 
}

LocaisDAO.prototype.getLocal = function(Local, callback ){
    this._connection.query( 'SELECT * FROM locaisatendimento where IDLocal ='+ Local.IDLocal , callback ); 
}

LocaisDAO.prototype.getLocalLeitosDisponiveis = function(Local, callback ){
    //console.log(Local)
    this._connection.query( 'select count(*) as numeroPacientes from pacientes  where hospitalID='+ Local , callback ); 
}

LocaisDAO.prototype.salvarLocal = function(local, callback){
    delete local.IDLocal 
    // mysql transforma o json no insert do banco, mas as colunas devem estar iguais aos parametros passados
    this._connection.query( 'INSERT INTO locaisatendimento set ? ' , local, callback );     
}

LocaisDAO.prototype.editarLocal = function(local, callback){
    // mysql transforma o json no insert do banco, mas as colunas devem estar iguais aos parametros passados
    this._connection.query( 
        "UPDATE locaisatendimento  set "+
            "NomeLocal='"+local.NomeLocal +
            "' , NumeroLeitos='"+local.NumeroLeitos +
            "' , TelefoneLocal='"+local.TelefoneLocal +
            "' , TelefoneLocalOp='"+local.TelefoneLocalOp +
            "' , EmailLocal='"+local.EmailLocal +
            "' , EnderecoLocal='"+local.EnderecoLocal +
            "' , NumeroLocal='"+local.NumeroLocal +
            "' , CepLocal='"+local.CepLocal +
            "' , BairroLocal='"+local.BairroLocal +
            "' , CidadeLocal='"+local.CidadeLocal +
            "' , EstadoLocal='"+local.EstadoLocal +
            "' , PaisLocal='"+local.PaisLocal +
        "' WHERE "+
            "IDLocal='"+local.IDLocal+"'" , callback 
    );  

}

LocaisDAO.prototype.selectLocais = function( callback ){
    this._connection.query( 'SELECT IDlocal, NomeLocal FROM locaisatendimento ;' , callback ); 
}

module.exports = function(){

    return LocaisDAO;

}