const Item = require("./item.model");

const postItem = async (req, res) => {
    // pass into database instead of just console

    try {
        const newItem = await Item({ ...req.body });
        await newItem.save();
        res.status(200).send({ message: "Item posted successfully", item: newItem })
    } catch (error) {

        console.error("Error creating item", error)
        res.status(500).send({ message: "failed to create a item" })
    }

}


const getAllItem = async (req, res) => {
    try {
        const items = await Item.find().sort({ createdAt: -1 }); // -1 means descending order
        res.status(200).send(items)

    } catch (error) {
        console.error("Error fetching items", error);
        res.status(500).send({ message: "Failed to fetch items" })

    }
}


// single book, find by id
const getSingleItem = async (req, res) => {

    try {
        const { id } = req.params;
        const item = await Item.findById(id)

        if (!item) {
            res.status(404).send({ message: "Item not found" }) // 404 means not found
        }
        res.status(200).send(item)
    } catch (error) {
        console.error("Error fetching items", error);
        res.status(500).send({ message: "Failed to fetch items" })
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
        const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedItem) {
            res.status(404).send({ message: "Item not found" }) // 404 means not found
        }
        res.status(200).send({
            message: "Item update successfully",
            item: updatedItem
        });


    } catch (error) {
        console.error("Error updating a item", error);
        res.status(500).send({ message: "Failed to update item" })
    }
}


// delete a item by id endpoint
const deleteItem = async (req, res) => {

    try {
        // A.findOneAndDelete(conditions, options)  // return Query
        // A.findOneAndDelete(conditions) // returns Query
        // A.findOneAndDelete() 
        const { id } = req.params;
        const deletedItem = await Item.findByIdAndDelete(id);
        if (!deletedItem) {
            res.status(404).send({ message: "Item not found" }) // 404 means not found
        }
        res.status(200).send({
            message: "deleted successfully",
            item: deletedItem
        });

    } catch (error) {
        console.error("Error deleting a item", error);
        res.status(500).send({ message: "Failed to delete item" })
    }

}


// search items by query
const searchItems = async (req, res) => {
    try {
        const q = req.query.q?.trim();

        if (!q) {
            return res.status(400).json({ message: "Query is required" });
        }

        console.log(`Searching for items with query: ${q}`);  // Debugging log

        // Querying the 'title' field, using regex search with case insensitivity
        const items = await Item.find({
            title: { $regex: q, $options: "i" }
        });

        res.status(200).json(items);
    } catch (error) {
        console.error("Error searching items", error);
        res.status(500).json({ message: "Failed to search items" });
    }
};


module.exports = {
    postItem,
    getAllItem,
    getSingleItem,
    updateItem,
    deleteItem,
    searchItems
}