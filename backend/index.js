import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./models/bookModel.js";
import bookRoutes from './routes/bookRoutes.js'

const app = express();

//Middleware for parsing req body
app.use(express.json());


app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('MERN Book Store')
})

app.use('/books', bookRoutes)


mongoose
    .connect(mongoDBURL)
    .then( ()=>{
        console.log('App connected to database');
        app.listen( PORT, () => {
            console.log(`App is listening to post : ${PORT}`);
        });
    })
    .catch( (error)=>{
        console.log(error)
    })