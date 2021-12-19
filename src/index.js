const express = require('express');

const tasksRoute = require('./Routes/task');


const app = express();
app.use(express.json());
const connection = require('./DB/configration');
connection();

app.use(tasksRoute);

app.listen(process.env.hostPort || 3000);