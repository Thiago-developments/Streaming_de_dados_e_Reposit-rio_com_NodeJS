const Attendance = require("../models/attendances");

module.exports = (app) => {
  app.get("/atendimentos", (req, res) => {
    Attendance.list().then(results => res.status(200).json(results))
      .catch(errors => res.status(400).json(errors))
  });
  
  app.get("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id)

    Attendance.searchById(id, res)
  });

  app.post("/atendimentos", (req, res) => {
    const attendance = req.body
    Attendance.add(attendance)
    .then(registeredAttendance => 
      res.status(201).json(registeredAttendance))
    .catch(errors => res.status(400).json(errors))
  });

  app.patch("/atendimentos/:id", (req,res)=>{
    const id = parseInt(req.params.id)
    const values = req.body

    Attendance.alter(id, values, res)
  });

  app.delete("/atendimentos/:id", (req,res)=>{
    const id = parseInt(req.params.id)
    Attendance.delete(id, res)
  })
};
