module.exports.formulario_inclusao_local = function(application, req, res){
    res.render('admin/form_add_local', { validacao : {}, local : {} });
}


module.exports.Locais_salvar = function(application, req, res){
    var local = req.body;

    req.assert('NomeLocal', 'NOME Inválido').notEmpty();
    req.assert('NumeroLeitos', 'NÚMERO DE LEITOS Inválido').notEmpty();
    req.assert('NumeroLeitosDisponiveis', 'NÚMERO DE LEITOS dISPONÍVEIS Inválido').notEmpty();
    req.assert('TelefoneLocal', 'TELEFONE Inválido').len(14, 15);
    req.assert('EmailLocal', 'E-MAIL Inválido').notEmpty();
    req.assert('EnderecoLocal', 'ENDEREÇO Inválido').notEmpty();
    req.assert('NumeroLocal', 'NÚMERO Inválido').notEmpty();
    req.assert('BairroLocal', 'BAIRRO Inválido').notEmpty();
    req.assert('CidadeLocal', 'CIDADE Inválido').notEmpty();
    req.assert('EstadoLocal', 'ESTADO Inválido').len(2);
    req.assert('PaisLocal', 'PAIS Inválido').len(2);

    var erros = req.validationErrors();

    if(erros){
       res.render('admin/form_add_local', {validacao: erros,  local: local});
       return;
    }

    var connection = application.config.dbconnection();
    var LocaisModel = new application.app.models.LocaisDAO(connection);

    LocaisModel.salvarLocal(local, function(error, result){
        res.redirect('/Locais');
    });
}


module.exports.edtLocal = function(application, req, res){
    // referencia de conexão com o banco
    var connection = application.config.dbconnection();
    var LocaisDAO = new application.app.models.LocaisDAO(connection);

    var IDLocal = req.query

   // console.log(req.query)
    
    LocaisDAO.getLocal(IDLocal, function(error,result){

        //console.log(result)

        res.render("admin/form_edit_local", {validacao : {},local : result})
    });
}

module.exports.Locais_editar = function(application, req, res){
    var local = req.body;

    // console.log(local.IDLocal)

    var erros

    if (!local.IDLocal){ erros = erros + 'ID Inválido' }
    if (!local.NomeLocal){ erros = erros + 'NOME Inválido' }
    if (!local.NumeroLeitos){ erros = erros + 'NÚMERO DE LEITOS Inválido' }
    if (!Number.isInteger(!local.NumeroLeitos)){ erros = erros + 'NÚMERO DE LEITOS DEVEM SER INTEIROS' }
    if (!local.NumeroLeitosDisponiveis){ erros = erros + 'NÚMERO DE LEITOS DISPONÍVEIS Inválido' }
    if (!Number.isInteger(!local.NumeroLeitosDisponiveis)){ erros = erros + 'NÚMERO DE LEITOS DISPONÍVEIS DEVEM SER INTEIROS' }


    //req.assert('TelefoneLocal', 'TELEFONE Inválido').len(14, 15);
    //req.assert('EmailLocal', 'E-MAIL Inválido').notEmpty();
    //req.assert('EnderecoLocal', 'ENDEREÇO Inválido').notEmpty();
    //req.assert('NumeroLocal', 'NÚMERO Inválido').notEmpty();
    //req.assert('BairroLocal', 'BAIRRO Inválido').notEmpty();
    //req.assert('CidadeLocal', 'CIDADE Inválido').notEmpty();
    //req.assert('EstadoLocal', 'ESTADO Inválido').len(2);
    //req.assert('PaisLocal', 'PAIS Inválido').len(2);
//
    //var erros = req.validationErrors();
//
    //if(erros){
    //   res.render('admin/form_edit_local', {validacao: erros,  local: local});
    //  return;
    //}
//
    var connection = application.config.dbconnection();
    var LocaisModel = new application.app.models.LocaisDAO(connection);

    LocaisModel.editarLocal(local, function(error, result){
        res.redirect('/Locais');
    });
}
