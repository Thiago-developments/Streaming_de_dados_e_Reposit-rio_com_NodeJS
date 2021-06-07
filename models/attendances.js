const axios = require("axios");
const { json } = require("body-parser");
const moment = require("moment");
const connection = require("../infrastructure/database/connection");
const repository = require("../repositories/attendance")
class Attendance {
  constructor(){
    this.validDate = (date, creationDate) => moment(date).isSameOrAfter(creationDate);
    this.validCustomer = (length) => length >= 5
    this.validate = parameters => this.validations.filter(field => {
      const {name} = field
      const parameter = parameters[name]

      return !field.validate(parameter)
    })
    this.validations = [
      {
        name:'date',
        valid: this.validDate ,
        message: 'Date must be equal or bigger than current date'
      },
      {
        name:'customer',
        valid : this.validCustomer,
        message: 'Customer must have at least five characters'
      }
    ]
    
  }
  add(attendance) {
    const creationDate = moment().format('YYYY-MM-DD HH:MM:SS');
    const date = moment(attendance.date, 'DD/MM/YYYY').format(
      'YYYY-MM-DD HH:MM:SS'
    );

    

    const parameters = {
      date: {date, creationDate},
      customer: {length: attendance.customer.length}
    }
    const errors = this.validate(parameters)

    if (errors.length) {
      return new Promise ((resolve, reject)=> reject(errors))
    }else{
      const datedAttendance = { ...attendance, creationDate, date };
    
      return repository.add(datedAttendance)
        .then(results => {
          const id = results.insertId
          return ({...attendance, id})
        }) 
      
    }

    
  }
  
  list(){
    return repository.list()
  }

  searchById(id, res){
    const sql = `SELECT * FROM Attendance WHERE id=${id}`
    connection.query(sql, async (erro, results) =>{
      const attendance = results[0]
      const cpf = attendance.customer
      if (erro) {
        res.status(400).json(erro)
      }else{
        const {data} = await axios.get(`http://localhost:8082/${cpf}`)
        attendance.customer = data;
        res.status(200).json(attendance)
      }
    })
  }

  alter(id, values, res){
    if (values.date) {
      values.date = moment(values.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
    }
    const sql = 'UPDATE Attendance SET ? WHERE id= ?'
    connection.query(sql, [values, id], (erro, results) =>{
      if (erro) {
        res.status(400).json(erro)
      }else{
        res.status(200).json({...values, id})
      }
    })
  }

  delete(id, res){
    const sql = 'DELETE FROM Attendance WHERE id=?'
    connection.query(sql, id, (erro, results) =>{
      if (erro) {
        res.status(400).json(erro)
      }else{
        res.status(200).json({id})
      }
    })
  }
}
module.exports = new Attendance();
