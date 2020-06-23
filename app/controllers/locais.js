module.exports.locais = function(application, req, res){
    // referencia de conexão com o banco
    var connection = application.config.dbconnection();
    var LocaisDAO = new application.app.models.LocaisDAO(connection);

    LocaisDAO.getLocais( function(error,result){
        res.render("Locais/Locais", {locais : result, login : req.session.login})
    });
}

module.exports.local = function(application, req, res){
    // referencia de conexão com o banco
    var connection = application.config.dbconnection();
    var LocaisDAO = new application.app.models.LocaisDAO(connection);

    var IDLocal = req.query

    console.log(req.query)
    
    LocaisDAO.getLocal(IDLocal, function(error,result){
        res.render("Locais/Local", {local : result, login : req.session.login })
    });
}