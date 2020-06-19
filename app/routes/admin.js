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

}