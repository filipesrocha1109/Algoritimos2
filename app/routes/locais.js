module.exports = function(application){

    application.get('/locais', function(req,res){
        application.app.controllers.locais.locais(application, req, res);
    });

    application.get('/local', function(req,res){
        application.app.controllers.locais.local(application, req, res);
       
    });
};