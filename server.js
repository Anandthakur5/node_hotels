const express = require("express");
const app = express();
const db = require('./db.js'); 
require('dotenv').config();

const PORT = process.env.PORT || 3000;


// middleware start
const bodyParser = require("body-parser");
app.use(bodyParser.json()); 
// middleware end

app.get("/", (req, res) => {
    res.send("hello Welcome to my hotel");
});


// import Person routes 
const personRoutes = require('./routes/personRoutes.js');
const menuRoutes = require('./routes/menuRoutes.js');

app.use("/person", personRoutes);

app.use("/menu", menuRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
