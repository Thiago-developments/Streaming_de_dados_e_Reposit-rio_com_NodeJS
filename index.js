const customExpress = require("./config/customExpress");
const connection = require("./infrastructure/database/connection");
const Tables = require("./infrastructure/database/tables");

connection.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log("conectado com sucesso");

    Tables.init(connection)
    const app = customExpress();

    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
  }
});
