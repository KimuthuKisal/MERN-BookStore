import express from 'express'
import { Book } from "../models/bookModel.js";

const router = express.Router();


//Save a book
router.post('/', async (request, response) => {
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
});

//Get all books
router.get('/', async (request, response) => {
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
});

//Get Selected book
router.get('/:id', async (request, response) => {
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
});

//Update a book
router.put('/:id', async (request, response) => {
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
});

//Delete a book
router.delete('/:id', async (request, response) => {
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
});


export default router;