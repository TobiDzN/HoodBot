
const express = require("express");
const server = express();

server.get("/", (req, res) => {
  res.send("OK");
});

function keepAlive() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;
  
  const publicUrl = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;

  server.listen(3000, "0.0.0.0", () => {
    console.log(`Server is Ready @ ${today}!`);
    console.log(`Public URL for UptimeRobot: ${publicUrl}`);
  });
}

module.exports = keepAlive;
