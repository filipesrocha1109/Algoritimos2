function PacientesDAO(connection){
    this._connection = connection
}


PacientesDAO.prototype.getPacientes = function( callback ){
    this._connection.query( 'SELECT * FROM Pacientes ORDER BY CreatedOnPaciente DESC;' , callback ); 
}

PacientesDAO.prototype.getPaciente = function(Paciente, callback ){
    this._connection.query( 'SELECT * FROM Pacientes where IDPaciente ='+ Paciente , callback ); 
}

PacientesDAO.prototype.salvarPaciente = function(Paciente, callback){
    delete Paciente.IDPaciente
    this._connection.query( 'INSERT INTO Pacientes set ? ' , Paciente, callback );     
}

PacientesDAO.prototype.editarPaciente = function(Paciente, callback){
    this._connection.query( 
        "UPDATE Pacientes set "+
            "NomePaciente='"+Paciente.NomePaciente +
            "' , StatusPaciente='"+Paciente.StatusPaciente +
            "' , CPFPaciente='"+Paciente.CPFPaciente +
            "' , RGPaciente='"+Paciente.RGPaciente +
            "' ,TelefonePaciente='"+Paciente.TelefonePaciente +
            "' , EnderecoPaciente='"+Paciente.EnderecoPaciente +
            "' , BairroPaciente='"+Paciente.BairroPaciente +
            "' , CidadePaciente='"+Paciente.CidadePaciente +
            "' , EstadoPaciente='"+Paciente.EstadoPaciente +
            "' , PaisPaciente='"+Paciente.PaisPaciente +
        "' WHERE "+
            "IDPaciente='"+Paciente.IDPaciente+"'" , callback 
    );  
}

PacientesDAO.prototype.deletePaciente = function(Paciente, callback){
    this._connection.query( "DELETE FROM Pacientes WHERE IDPaciente = '"+Paciente+"'" , callback );  
}

module.exports = function(){

    return PacientesDAO;

}