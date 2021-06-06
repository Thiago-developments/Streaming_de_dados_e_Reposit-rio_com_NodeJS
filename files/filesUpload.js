const fs = require("fs");

fs.createReadStream("./assets/pastor.jpg")
  .pipe(fs.createWriteStream("./assets/pastor-stream.jpg"))
  .on("finish", () => console.log("imagem foi escrita com sucesso"));
