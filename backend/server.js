require('dotenv').config()

const express = require('express');
const database = require('mongoose');
const workoutRoutes = require('./routes/workouts');

//here the express app will be created...
const app = express();

//middleware

app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//routes
// app.get('/',(req,res) => {
//     res.json({msg:'Welcome to the app...'});
// });

app.use('/api/workouts', workoutRoutes);

//connect database.
database.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for request
        app.listen(process.env.PORT, () => {
            console.log("connect to the db & server is listening on ", process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    })
