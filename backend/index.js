import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./models/bookModel.js";

const app = express();

//Middleware for parsing req body
app.use(express.json());


app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('MERN Book Store')
})


//Save a book
app.post('/books', async (request, response) => {
    try{
        if ( !request.body.title || !request.body.author || !request.body.publishedYear ) {
            return response.status(400).send({message: 'Send all fields'})
        }
        const newBook = {
            title : request.body.title,
            author : request.body.author,
            publishedYear : request.body.publishedYear,
        }
        const book = await Book.create(newBook)
        return response.status(201).send(book)

    } catch (error) {
        console.log(error.message)
        response.status(500).send({message: error.message})
    }
})

//Get all books
app.get('/books', async (request, response) => {
    try{
        const books = await Book.find({})
        return response.status(200).json({
            count : books.length,
            data : books
        })

    } catch (error) {
        console.log(error.message)
        response.status(500).send({message: error.message})
    }
})

//Get Selected book
app.get('/books/:id', async (request, response) => {
    try{
        const {id} = request.params;
        const book = await Book.findById(id)
        if ( !book ) {
            return response.status(404).json( { message:'Book does not exist' } )
        }
        return response.status(200).json(book)

    } catch (error) {
        console.log(error.message)
        response.status(500).send({message: error.message})
    }
})

//Update a book
app.put('/books/:id', async (request, response) => {
    try{
        const {id} = request.params;
        const book = await Book.findById(id)
        if ( !book ) {
            return response.status(404).json( { message:'Book does not exist' } )
        }

        if ( !request.body.title ) {
            request.body.title = book.title
        }
        if ( !request.body.author ) {
            request.body.author = book.author
        }
        if ( !request.body.publishedYear ) {
            request.body.publishedYear = book.publishedYear
        }
        const result = await Book.findByIdAndUpdate(id, request.body)

        if ( !result ) {
            return response.status(404).json( { message:'Error while updating the book' } )

        }

        const updatedBook = await Book.findById(id)
        return response.status(200).json({
            message: 'Book Updated Successfully',
            updatedBook: updatedBook
        })

    } catch (error) {
        console.log(error.message)
        response.status(500).send({message: error.message, catch:"catch"})
    }
})

//Delete a book
app.delete('/books/:id', async (request, response) => {
    try{
        const {id} = request.params;
        const deletedBook = await Book.findByIdAndDelete(id)
        if ( !deletedBook ) {
            return response.status(404).json( { message:'Book does not exist' } )
        }
        return response.status(200).json({message:'Book Deleted Successfuly'})

    } catch (error) {
        console.log(error.message)
        response.status(500).send({message: error.message})
    }
})


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