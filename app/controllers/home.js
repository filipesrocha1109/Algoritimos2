module.exports.index = function(application, req, res){
    res.render("home/index", { login : req.session.login})
}