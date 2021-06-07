class Tables {
  init(connection) {
    this.connection = connection;

    this.createAttendance()
    this.createPets()
  }

  createAttendance() {
    const sql = 'CREATE TABLE IF NOT EXISTS Attendance (id int NOT NULL AUTO_INCREMENT, customer varchar(50) NOT NULL, pet varchar(20), services varchar(20) NOT NULL, date datetime NOT NULL, creationDate datetime NOT NULL, notes text, PRIMARY KEY(id) )'
    
    this.connection.query(sql, (erro) => {
        if (erro) {
            console.log(erro);
        }else{
            console.log('Tabela atendimentos criada com sucesso');
        }
    });
  }

  createPets(){
    const query = 'CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT, name varchar(50), image varchar(200), PRIMARY KEY (id) ) '

    this.connection.query(query, erro => {
      if(erro){
        console.log(erro);
      }else{
        console.log('Tabela Pets foi criada com sucesso');
      }
    })
  }
}
module.exports = new Tables();
