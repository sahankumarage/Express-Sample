require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgon = require('morgan');
const databaseController = require('../Demo/Controller/databaseController');
const database = require('./Routes/dataBaseRoutes');
const userRoutes = require('./Routes/user');
const bodyParser = require('body-parser');


const app = express();

app.use(cors());
app.use(express.json());
// app.use(bodyParser())
app.use(morgon("dev"))

const port = process.env.PORT || 3000;


app.use("/database", database);
app.use("/user",userRoutes);






app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


