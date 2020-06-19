module.exports.formulario_inclusao_local = function(application, req, res){
    res.render('admin/form_add_local', { validacao : {}, local : {} });
}

module.exports.Locais_salvar = function(application, req, res){
    var locias = req.body;

    //req.assert('titulo', 'Título é obrigatório').notEmpty();
    //req.assert('resumo', 'Resumo é obrigatório').notEmpty();
    //req.assert('resumo', 'Resumo deve conter entre 10 e 100 caracteres').len(10, 100);
    //req.assert('autor', 'Autor é obrigatório').notEmpty();
    //req.assert('data_noticia', 'Data é obrigatório').notEmpty().isDate({format: 'YYYY-MM-DD'});
    //req.assert('noticia', 'Notícia é obrigatório').notEmpty();
//
    var erros = "" //req.validationErrors();
//
    if(erros){
       res.render('admin/form_add_locias', {validacao: erros,  noticia: noticia});
       return;
    }

    var connection = application.config.dbconnection();
    var LocaisModel = new application.app.models.LocaisDAO(connection);

    LocaisModel.salvarLocal(locias, function(error, result){
        res.redirect('/Locais');
    });
}