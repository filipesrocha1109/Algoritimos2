module.exports.pacientes = function(application, req, res){
    // referencia de conexão com o banco
    var connection = application.config.dbconnection();
    var PacientesDAO = new application.app.models.PacientesDAO(connection);


    if(req.session.login){
        PacientesDAO.getPacientes( function(error,result){
            res.render("Pacientes/Pacientes", {pacientes : result, login : req.session.login})
        });
    }else{
        res.redirect('/admin');
    }    
}

module.exports.paciente = function(application, req, res){
    // referencia de conexão com o banco
    var connection = application.config.dbconnection();
    var PacientesDAO = new application.app.models.PacientesDAO(connection);

    var Paciente = req.query

    var connection = application.config.dbconnection();
    var LocaisDAO = new application.app.models.LocaisDAO(connection);
    
        LocaisDAO.selectLocais( function(error,result){
            var selects = result
            //console.log(selects)
            
            if(req.session.login){
                PacientesDAO.getPaciente(Paciente.IDPaciente, function(error,result){

                    //console.log(result)
                    res.render("Pacientes/Paciente", {paciente : result, login : req.session.login, selects: selects })
                });
            }else{
                res.redirect('/admin');
            }

            
        });
}


