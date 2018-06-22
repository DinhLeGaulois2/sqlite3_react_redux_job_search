// Main starting point of the application
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

// DB Setup
// Requiring our models for syncing
var db = require("./models");

// App Setup
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

// Import routes and give the server access to them.
require("./routes/api-routes.js")(app);
require("./routes/auth-routes.js")(app);

// Server Setup
const PORT = process.env.PORT || 3090;
app.set('port', PORT);

db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
})