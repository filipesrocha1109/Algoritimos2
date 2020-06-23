module.exports.formulario_inclusao_local = function(application, req, res){
    if(req.session.login){
        res.render('admin/form_add_local', { validacao : {}, local : {}, });
    }else{
        res.redirect('/admin');
    }
    
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

    //console.log(erros) 

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

    if(req.session.login){
        LocaisDAO.getLocal(IDLocal, function(error,result){
            res.render("admin/form_edit_local", {validacao : {},local : result})
        });
    }else{
        res.redirect('/admin');
    }
      
}

module.exports.Locais_editar = function(application, req, res){
    var local = req.body;

    var connection = application.config.dbconnection();
    var LocaisModel = new application.app.models.LocaisDAO(connection);

    LocaisModel.editarLocal(local, function(error, result){
        res.redirect('/Locais');
    });
}

module.exports.loginAdd = function(application, req, res){

    if(req.session.login){
        res.redirect('/');
    }else{
        res.render('admin/login');
    }    
}

module.exports.login = function(application, req, res){
    // referencia de conexão com o banco
    var connection = application.config.dbconnection();
    var LoginDAO = new application.app.models.LoginDAO(connection);

    var Usuarios = req.body

    //console.log(Usuarios)
    
   LoginDAO.login(Usuarios, function(error,result){
       //console.log( result)
       if (result[0]){
        //console.log(result[0].ID)
        req.session.login = result[0].ID
        //console.log('manda pra home')
        res.redirect('/');

       }else{
        //console.log('manda pra login')
        res.redirect('/admin?erro');
       }       
   });
  
}

module.exports.logout = function(application, req, res){
    
    req.session.login = null

    res.redirect('/');
}