const fs = require("fs");
const path = require("path");

module.exports = (pathh, fileName, createdImageCallBack) => {
  const validTypes = ["jpg", "png", "jpeg"];
  const type = path.extname(pathh);
  const validatedType = validTypes.indexOf(type.substring(1))!== -1 ;

  if (!validatedType) {
    const erro = "Tipo é inválido"
    console.log("Erro tipo inválido");
    createdImageCallBack(erro)
  } else {
    const newPath = `./assets/images/${fileName}${type}`;

    fs.createReadStream(pathh)
      .pipe(fs.createWriteStream(newPath))
      .on("finish", () => createdImageCallBack(false, newPath));
  }
};
