/// admin Local
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
    

    if(erros){
       res.render('admin/form_add_local', {validacao: erros,  local: local, selects : selects });
       return;
    }

    var connection = application.config.dbconnection();
    var LocaisModel = new application.app.models.LocaisDAO(connection);

    if(local.IDLocal){
        LocaisModel.editarLocal(local, function(error, result){
            res.redirect('/Locais');
        });

    }else{
        LocaisModel.salvarLocal(local, function(error, result){
            res.redirect('/Locais');
        });

    }
    
}

module.exports.edtLocal = function(application, req, res){
    // referencia de conexão com o banco
    var connection = application.config.dbconnection();
    var LocaisDAO = new application.app.models.LocaisDAO(connection);

    var IDLocal = req.query

    if(req.session.login){
        LocaisDAO.getLocal(IDLocal, function(error,result){
            res.render("admin/form_add_local", {validacao : {},local  : result[0]})

        });
    }else{
        res.redirect('/admin');
    }
      
}

/// admin Paciente
module.exports.formulario_inclusao_paciente = function(application, req, res){
    if(req.session.login){

        var connection = application.config.dbconnection();
        var LocaisDAO = new application.app.models.LocaisDAO(connection);
    
        LocaisDAO.selectLocais( function(error,result){
            var selects = result

            res.render('admin/form_add_paciente', { validacao : {}, paciente : {}, selects : selects });
            
        });

        
    }else{
        res.redirect('/admin');
    }
    
}

module.exports.Pacientes_salvar = function(application, req, res){
    var paciente = req.body;

    req.assert('NomePaciente', 'NOME Inválido').notEmpty();
    req.assert('StatusPaciente', 'STATUS Inválido').notEmpty();
    req.assert('CPFPaciente', 'CPF dISPONÍVEIS Inválido').notEmpty();
    req.assert('RGPaciente', 'RG Inválido').notEmpty();
    req.assert('TelefonePaciente', 'TELEFONE Inválido').len(14, 15);
    req.assert('EnderecoPaciente', 'ENDEREÇO Inválido').notEmpty();
    req.assert('BairroPaciente', 'BAIRRO Inválido').notEmpty();
    req.assert('CidadePaciente', 'CIDADE Inválido').notEmpty();
    req.assert('EstadoPaciente', 'ESTADO Inválido').len(2);
    req.assert('PaisPaciente', 'PAIS Inválido').len(2);

    var erros = req.validationErrors();

    console.log(paciente) 

    if(erros){ 

        var connection = application.config.dbconnection();
        var LocaisDAO = new application.app.models.LocaisDAO(connection);
    
        LocaisDAO.selectLocais( function(error,result){
            var selects = result

            res.render('admin/form_add_paciente', { validacao: erros,  paciente: paciente, selects : selects });
            
        });

    }else{

        var connection = application.config.dbconnection();
        var PacientesModel = new application.app.models.PacientesDAO(connection);


        if(paciente.IDPaciente){
            PacientesModel.editarPaciente(paciente, function(error, result){
                res.redirect('/Pacientes');
            });

        }else{
            PacientesModel.salvarPaciente(paciente, function(error, result){
                res.redirect('/Pacientes');
            });
        }
    }
}


module.exports.edtPaciente = function(application, req, res){
    // referencia de conexão com o banco
    var connection = application.config.dbconnection();
    var PacientesDAO = new application.app.models.PacientesDAO(connection);

    var Paciente = req.query

    if(req.session.login){

        var connection = application.config.dbconnection();
        var LocaisDAO = new application.app.models.LocaisDAO(connection);
    
        LocaisDAO.selectLocais( function(error,result){
            var selects = result

            //console.log("entrou aqui")
           // console.log(selects)

            PacientesDAO.getPaciente(Paciente.IDPaciente, function(error,result){

                res.render("admin/form_add_paciente", {validacao : {},paciente : result[0], selects: selects });
                
            });
            
        });

    }else{
        res.redirect('/admin');
    }
      
}


module.exports.deletPaciente = function(application, req, res){
    // referencia de conexão com o banco
    var connection = application.config.dbconnection();
    var PacientesDAO = new application.app.models.PacientesDAO(connection);

    var Paciente = req.query

    console.log(Paciente)

    if(req.session.login){
        PacientesDAO.deletePaciente(Paciente.IDPaciente, function(error,result){
            res.redirect('/pacientes');
        });
    }else{
        res.redirect('/admin');
    }
      
}

/// admin login

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