module.exports = function(application){

    application.get('/addLocal', function(req,res){
        application.app.controllers.admin.formulario_inclusao_local(application, req, res);
    });
    application.post('/Locais/salvar', function(req,res){
        application.app.controllers.admin.Locais_salvar(application, req, res);
    });
    application.get('/editLocal', function(req,res){
        application.app.controllers.admin.edtLocal(application, req, res);     
    });
    application.post('/Locais/editar', function(req,res){
        application.app.controllers.admin.Locais_editar(application, req, res);
    });

    application.get('/addPaciente', function(req,res){
        application.app.controllers.admin.formulario_inclusao_paciente(application, req, res);
    });
    application.post('/Pacientes/salvar', function(req,res){
        application.app.controllers.admin.Pacientes_salvar(application, req, res);
    });
    application.get('/editPaciente', function(req,res){
        application.app.controllers.admin.edtPaciente(application, req, res);      
    });
    application.post('/Pacientes/editar', function(req,res){
        application.app.controllers.admin.Pacientes_editar(application, req, res);
    });
    application.get('/deletePaciente', function(req,res){
        application.app.controllers.admin.deletPaciente(application, req, res);      
    });


    application.get('/admin', function(req,res){
        application.app.controllers.admin.loginAdd(application, req, res);
    });
    application.post('/login/vericar', function(req,res){
        application.app.controllers.admin.login(application, req, res);
    });
    application.get('/logout', function(req,res){
        application.app.controllers.admin.logout(application, req, res);
    });
}