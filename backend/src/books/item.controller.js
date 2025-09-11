const Book = require("./item.model");

const postItem = async (req, res) => {
    // pass into database instead of just console

    try {
        const newItem = await Book({ ...req.body });
        await newItem.save();
        res.status(200).send({ message: "Book posted successfully", book: newItem })
    } catch (error) {

        console.error("Error creating book", error)
        res.status(500).send({ message: "failed to create a book" })
    }

}


const getAllItem = async (req, res) => {
    try {
        const items = await Book.find().sort({ createdAt: -1 }); // -1 means descending order
        res.status(200).send(items)

    } catch (error) {
        console.error("Error fetching books", error);
        res.status(500).send({ message: "Failed to fetch books" })

    }
}


// single book, find by id
const getSingleItem = async (req, res) => {

    try {
        const { id } = req.params;
        const item = await Book.findById(id)

        if (!item) {
            res.status(404).send({ message: "Book not found" }) // 404 means not found
        }
        res.status(200).send(item)
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

const updateItem = async (req, res) => {
    try {

        const { id } = req.params;
        const updatedItem = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedItem) {
            res.status(404).send({ message: "Book not found" }) // 404 means not found
        }
        res.status(200).send({
            message: "Book update successfully",
            book: updatedItem
        });


    } catch (error) {
        console.error("Error updating a book", error);
        res.status(500).send({ message: "Failed to update book" })
    }
}


// delete a book by id endpoint
const deleteItem = async (req, res) => {

    try {
        // A.findOneAndDelete(conditions, options)  // return Query
        // A.findOneAndDelete(conditions) // returns Query
        // A.findOneAndDelete() 
        const { id } = req.params;
        const deletedItem = await Book.findByIdAndDelete(id);
        if (!deletedItem) {
            res.status(404).send({ message: "Book not found" }) // 404 means not found
        }
        res.status(200).send({
            message: "deleted successfully",
            book: deletedItem
        });

    } catch (error) {
        console.error("Error deleting a book", error);
        res.status(500).send({ message: "Failed to delete book" })
    }

}


module.exports = {
    postItem,
    getAllItem,
    getSingleItem,
    updateItem,
    deleteItem
}