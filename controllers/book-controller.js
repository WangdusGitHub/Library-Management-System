const {BookModel, UserModel} = require('../models');
const IssuedBooks = require('../dtos/book-dto');

exports.getAllBooks = async(req, res) => {
    const books = await BookModel.find();

    if(books.length === 0) {
        return res.status(404).json({
            success: false,
            message: "no books in the system"
        })
    }
    res.status(200).json({
        success: true,
        data: books
    })
}

exports.getBook = async(req, res) => {
    const {id} = req.params;
    const book = await BookModel.findById(id);

    if(!book) {
        return res.status(404).json({
            success: false,
            message: `book not found for the id: ${id}`
        })
    }

    res.status(200).json({
        success: true,
        data: book
    })
}

exports.getAllIssuedBooks = async(req, res) => {
     const users = await UserModel.find({
        issuedBook: {$exists: true}
     }).populate('issuedBook')

     const issuedBooks = users.map((user) => {
        return new IssuedBook(user);
     });

     if(issuedBooks.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No Books Issued Yet"
        })
     }

     res.status(200).json({
        success: true,
        data: issuedBooks
     })

}
// router.get('/issued/for-users', (req, res) => {
//     const userWithIssuedBooks = users.filter(user => {
//         if(user.issuedBook) return  user;
//     })
    
//     const issuedBooks = [];

//     userWithIssuedBooks.forEach(user => {
//         const book = books.find((book) => book.id === user.issuedBook)

//         book.issuedBy = user.name;
//         book.issuedDate = user.issuedDate;
//         book.returnDate = user.returnDate;

//         issuedBooks.push(book);
//     });
    
//     if(issuedBooks.length <= 0) {
//         return res.status(404).json({
//             success: false,
//             message: "no book is issued"
//         })
//     }

//     res.status(200).json({
//         success: true,
//         data: issuedBooks
//     })
// })

// const getAllBooks = () => {}
// const getSingleBookById = (id) => {}
// module.exports = {
//     getAllBooks,
//     getSingleBookById
// }

// router.get('/:id', (req, res) => {

//     const {id} = req.params;
//     const book = books.find((each) => each.id === id);
//     if(!book) {
//         res.status(404).json({
//             success: false,
//             message: "Book not found!"
//         })
//         return;
//     }

//     res.status(200).json({
//         success: true,
//         data: book
//     })
// })

exports.addNewBook = async(req, res) => {
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0) {
        return res.status(400).json({
            success: false,
            message: "Please provide the data to add a new book"
        })
    }

    await BookModel.create(data);
    res.status(201).json({
        success: true,
        message: "book has been added successfuly!",
        data: data
    })
}
/**
 * Route: /books
 * Method: POST
 * Description: Create or Register new book
 * Access: Public
 * Parameters: None
 */
// router.post('/', (req, res) => {
//     const {id, title, author, genre, price, publisher} = req.body;

//     if(!id || !title || !author || !genre || !price || !publisher) {
//         return res.status(400).json({
//             success: false,
//             message: "invalid input!"
//         })
//     }

//     const book = books.find((each) => each.id === id);
//     if(book) {
//         return res.status(409).json({
//             success: false,
//             message: "book Already Exists..."
//         })
//     }
//     books.push({id, title, author, genre, price, publisher});
//     res.status(200).json({
//         success: true,
//         message: "book added sucessfully!"
//     })
// })

exports.updateBook = async(req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0) {
        return res.status(404).json({
            success: false,
            message: "no data to be updated!"
        })
    }
    const previousBook = await BookModel.findById(id);
    const updatedBook = await BookModel.findOneAndUpdate(
        {_id: id},
        data,
        {new: true}
    );

    if(!updatedBook) {
        return res.status(404).json({
            success: false,
            message: `no book of id: ${id}`
        })
    }

    res.status(200).json({
        success: true,
        message: "updated successfuly!",
        previousData: previousBook,
        updatedBook: updatedBook 
    })
}
/**
 * Route: /books/:id
 * Method: PUT
 * Description: Updating a books by their ID
 * Access: Public
 * Parameters: ID
 */ 
// router.put('/:id', (req, res) => {
//     const {id} = req.params;
//     const {data} = req.body;

//     const book = books.find((each) => each.id === id);
//     if(!book) {
//         return res.status(404).json({
//             success: false,
//             message: "book not found!"
//         })
//     }

//     // Object.assign(user, data);
//     // user = {...data};
//     const updatedBook = books.map((each) => {
//         if(each.id === id) {
//             return {...each, ...data}
//         }
//         return each
//     })
//     res.status(200).json({
//         success: true,
//         data: updatedBook,
//         message: "updated a book"
//     })
// })

exports.deleteBook = async(req, res) => {
    const {id} = req.params;

    const book = await BookModel.findById(id);
    if(!book) {
        return res.status(404).json({
            success: false,
            message: "book not found!"
        })
    }

    await BookModel.findOneAndDelete(id);
    res.status(200).json({
        success: true,
        message: "book deleted sucessfully!"
    })
}