const express = require('express');
const userRoute = require('./Routes/userRoutes')
const tasksRoute = require('./Routes/taskRoutes');


const app = express();
app.use(express.json());
const connection = require('./DB/configration');
connection();
app.use(userRoute)
app.use(tasksRoute);


 
app.listen(process.env.hostPort || 3000);