module.exports.index = function(application, req, res){

    var connection = application.config.dbconnection();
    var LocaisDAO = new application.app.models.LocaisDAO(connection);

    LocaisDAO.get5UltimosLocais( function(error,result){
        //console.log(result)
        res.render("home/index", {locais: result , login : req.session.login})
    });
}