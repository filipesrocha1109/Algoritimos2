module.exports = function(application){
    application.get('/addNoticia', function(req,res){
        application.app.controllers.admin.formulario_inclusao_noticia(application, req, res);
    });

    application.post('/noticias/salvar', function(req,res){
        application.app.controllers.admin.noticias_salvar(application, req, res);
    });

    application.get('/addLocal', function(req,res){
        application.app.controllers.admin.formulario_inclusao_local(application, req, res);
    });

    application.post('/Locais/salvar', function(req,res){
        application.app.controllers.admin.Locais_salvar(application, req, res);
    });
}