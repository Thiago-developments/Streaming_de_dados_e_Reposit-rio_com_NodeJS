const connection = require("../infrastructure/connection");
const filesUpload = require("../files/filesUpload");

class Pet {
  add(pet, res) {
    const query = "INSERT INTO Pets SET ?";

    filesUpload(pet.image, pet.name, (erro, newPath) => {
      if (erro) {
        res.status(400).json({ erro });
      } else {
        const newPet = {
          name: pet.name,
          image: newPath,
        };
        connection.query(query, newPet, (erro) => {
          if (erro) {
            console.log(erro);
            res.status(400).json(erro);
          } else {
            res.status(200).json(newPet);
          }
        });
      }
    });
  }
}

module.exports = new Pet();
