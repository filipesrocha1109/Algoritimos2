module.exports = function(application){

    application.get('/pacientes', function(req,res){
        application.app.controllers.pacientes.pacientes(application, req, res);
    });

    application.get('/paciente', function(req,res){
        application.app.controllers.pacientes.paciente(application, req, res);
       
    });
};