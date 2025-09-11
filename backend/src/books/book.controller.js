const Book = require("./book.model");

const postABook = async (req, res) => {
    // pass into database instead of just console

    try {
        const newBook = await Book({ ...req.body });
        await newBook.save();
        res.status(200).send({ message: "Book posted successfully", book: newBook })
    } catch (error) {

        console.error("Error creating book", error)
        res.status(500).send({ message: "failed to create a book" })
    }

}


const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }); // -1 means descending order
        res.status(200).send(books)

    } catch (error) {
        console.error("Error fetching books", error);
        res.status(500).send({ message: "Failed to fetch books" })

    }
}


// single book, find by id
const getSingleBook = async (req, res) => {

    try {
        const { id } = req.params;
        const book = await Book.findById(id)

        if (!book) {
            res.status(404).send({ message: "Book not found" }) // 404 means not found
        }
        res.status(200).send(book)
    } catch (error) {
        console.error("Error fetching books", error);
        res.status(500).send({ message: "Failed to fetch books" })
    }
}


// update book data 
// How to update: 
// A.findByIdAndUpdate(id, update, options)  // returns Query
// A.findByIdAndUpdate(id, update)           // returns Query
// A.findByIdAndUpdate()   

const updateBook = async (req, res) => {
    try {

        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBook) {
            res.status(404).send({ message: "Book not found" }) // 404 means not found
        }
        res.status(200).send({
            message: "Book update successfully",
            book: updatedBook
        });


    } catch (error) {
        console.error("Error updating a book", error);
        res.status(500).send({ message: "Failed to update book" })
    }
}


// delete a book by id endpoint
const deleteBook = async (req, res) => {

    try {
        // A.findOneAndDelete(conditions, options)  // return Query
        // A.findOneAndDelete(conditions) // returns Query
        // A.findOneAndDelete() 
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            res.status(404).send({ message: "Book not found" }) // 404 means not found
        }
        res.status(200).send({
            message: "deleted successfully",
            book: deletedBook
        });

    } catch (error) {
        console.error("Error deleting a book", error);
        res.status(500).send({ message: "Failed to delete book" })
    }

}


module.exports = {
    postABook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook
}