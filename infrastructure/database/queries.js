const connection = require("./connection");

const executeQuery = (query, parameters = "") => {
  return new Promise((resolve, reject) => {
    connection.query(query, parameters, (errors, results, fields) => {
      if (errors) {
          reject(errors)
      } else {
          resolve(results)
      }
    });
  });
};
module.exports = executeQuery