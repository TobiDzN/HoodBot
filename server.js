const express = require("express");
const server = express();

server.all("/", (req, res) => {
  res.send(`OK`);
});

function keepAlive() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;

  server.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`Server is Ready @ ${today}!`);
  });
}

module.exports = keepAlive;
