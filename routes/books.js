const express = require('express');
const { books } = require('../data/books.json');
const { users } = require('../data/users.json')

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all the list of users in the system
 * Access: Public
 * Parameters: None
 */
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: books
    })
})

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get a book by their ID
 * Access: Public
 * Parameters: ID
 */
router.get('/:id', (req, res) => {

    const {id} = req.params;
    const book = books.find((each) => each.id === id);
    if(!book) {
        res.status(404).json({
            success: false,
            message: "Book not found!"
        })
        return;
    }

    res.status(200).json({
        success: true,
        data: book
    })
})

/**
 * Route: /books
 * Method: POST
 * Description: Create or Register new book
 * Access: Public
 * Parameters: None
 */
router.post('/', (req, res) => {
    const {id, title, author, genre, price, publisher} = req.body;

    if(!id || !title || !author || !genre || !price || !publisher) {
        return res.status(400).json({
            success: false,
            message: "invalid input!"
        })
    }

    const book = books.find((each) => each.id === id);
    if(book) {
        return res.status(409).json({
            success: false,
            message: "book Already Exists..."
        })
    }
    books.push({id, title, author, genre, price, publisher});
    res.status(200).json({
        success: true,
        message: "book added sucessfully!"
    })
})

/**
 * Route: /books/:id
 * Method: PUT
 * Description: Updating a books by their ID
 * Access: Public
 * Parameters: ID
 */ 
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    const book = books.find((each) => each.id === id);
    if(!book) {
        return res.status(404).json({
            success: false,
            message: "book not found!"
        })
    }

    // Object.assign(user, data);
    // user = {...data};
    const updatedBook = books.map((each) => {
        if(each.id === id) {
            return {...each, ...data}
        }
        return each
    })
    res.status(200).json({
        success: true,
        data: updatedBook,
        message: "updated a book"
    })
})

/**
 * Route: /books/:id
 * Method: DELETE
 * Description: Deleting a book by their ID
 * Access: Public
 * Parameters: ID
 */ 

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    const book = books.find(each => each.id === id);
    if(!book) {
        return res.status(404).json({
            success: false,
            message: "book not found!"
        })
    }

    const updatedBooks = users.filter(book => book.id !== id);

    res.status(200).json({
        success: true,
        data: updatedBooks,
        message: "book has been deleted sucessfully..."
    })
})

/**
 * Route: /books/issued/for-users
 * Method: GET
 * Description: get all issued books
 * Access: Public
 * Parameters: none
 */ 

router.get('/issued/for-users', (req, res) => {
    const userWithIssuedBooks = users.filter(user => {
        if(user.issuedBook) return  user;
    })
    
    const issuedBooks = [];

    userWithIssuedBooks.forEach(user => {
        const book = books.find((book) => book.id === user.issuedBook)

        book.issuedBy = user.name;
        book.issuedDate = user.issuedDate;
        book.returnDate = user.returnDate;

        issuedBooks.push(book);
    });
    
    if(issuedBooks.length <= 0) {
        return res.status(404).json({
            success: false,
            message: "no book is issued"
        })
    }

    res.status(200).json({
        success: true,
        data: issuedBooks
    })
})

module.exports = router;