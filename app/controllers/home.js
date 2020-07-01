module.exports.index = function(application, req, res){

    var connection = application.config.dbconnection();
    var LocaisDAO = new application.app.models.LocaisDAO(connection);

    LocaisDAO.getLocais( function(error,result){

        var connection = application.config.dbconnection();
        var PacientesDAO = new application.app.models.PacientesDAO(connection);
    
        PacientesDAO.getPacientes( function(error,result1){
            //console.log(result1)
            res.render("home/index", {locais : result, pacientes : result1, login : req.session.login})
        });
        
    });

}