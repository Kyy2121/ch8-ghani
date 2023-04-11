const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const swaggerJSON = require('./swagger.json');
const swaggerUI = require('swagger-ui-express');

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// accept request in form or JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./app/routes/player.routes")(app);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON))

db.client.sync({ force: true })
.then(() => {
  console.log('Success to connect database')
})
.catch((err) => {
  console.log(err)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
