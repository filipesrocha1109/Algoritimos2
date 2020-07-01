module.exports.locais = function(application, req, res){
    // referencia de conexão com o banco
    var connection = application.config.dbconnection();
    var LocaisDAO = new application.app.models.LocaisDAO(connection);

    LocaisDAO.getLocais( function(error,result){

        var connection = application.config.dbconnection();
        var PacientesDAO = new application.app.models.PacientesDAO(connection);
    
        PacientesDAO.getPacientes( function(error,result1){
            //console.log(result1)
            res.render("Locais/Locais", {locais : result, pacientes : result1, login : req.session.login})
        });
        
    });
}

module.exports.local = function(application, req, res){
    // referencia de conexão com o banco
    var connection = application.config.dbconnection();
    var LocaisDAO = new application.app.models.LocaisDAO(connection);

    var IDLocal = req.query

    // console.log(req.query)
    
    LocaisDAO.getLocal(IDLocal, function(error,result){

        var connection = application.config.dbconnection();
        var PacientesDAO = new application.app.models.PacientesDAO(connection);
    
        PacientesDAO.getPacientes( function(error,result1){
            //console.log(result1)
            res.render("Locais/Local", {local : result, pacientes : result1, login : req.session.login })
        });
       
    });
}