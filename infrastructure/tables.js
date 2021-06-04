class Tables {
  init(connection) {
    this.connection = connection;

    this.createAttendance()
  }

  createAttendance() {
    const sql = 'CREATE TABLE IF NOT EXISTS Attendance (id int NOT NULL AUTO_INCREMENT, customer varchar(50) NOT NULL, pet varchar(20), services varchar(20) NOT NULL, date datetime NOT NULL, creationDate datetime NOT NULL, status varchar(20) NOT NULL, notes text, PRIMARY KEY(id) )'
    
    this.connection.query(sql, (erro) => {
        if (erro) {
            console.log(erro);
        }else{
            console.log('Tabela atendimentos criada com sucesso');
        }
    });
  }
}
module.exports = new Tables();
