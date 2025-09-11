const express = require('express');
const Book = require('./item.model');
const { postItem, getAllItem, getSingleItem, updateItem, deleteItem } = require('./item.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router();


// frontend => backend server => controller => schema => database => communicate with the server => back to frontend
// post = when you want to submit something from frontend to db
// get = when you get something back from db 
// put/patch = when you edit or update data 
// delete = when you want to delete a data

/* list of errors and their meaning:
  
    200 - OK
    301 - Moved permanently
    404 - not found
    500 - Internal Server Error: An unexpected condition occurred on the server
    503 - 503 Service Unavailable: The server is temporarily unable to handle the request. 
 
*/
// post a book
router.post("/create-item", verifyAdminToken, postItem)

// get all books from the current database
router.get("/", getAllItem)

// single book endpoint
router.get("/:id", getSingleItem)

// update a book endpoint
router.put("/edit/:id", verifyAdminToken, updateItem)

// delete a book endpoint
router.delete("/delete/:id", verifyAdminToken, deleteItem)

module.exports = router;