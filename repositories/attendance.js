const query = require('../infrastructure/database/queries')

class Attendance{
    add(attendance){
        const sql = 'INSERT INTO Attendance SET ? '
        return query(sql, attendance)
    }
    list(){
        const sql = 'SELECT * FROM Attendance'
        return query(sql)
    }
}
module.exports = new Attendance()