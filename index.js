const express = require('express');
const app = express();
const PORT = 8081;

const {users} = require('./data/users.json');
const {books} = require('./data/books.json');

// importing the routers
const usersRouter = require("./routes/user");
const booksRouter = require("./routes/books");

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "home page :-)"
    })
})

app.use('/users', usersRouter);
app.use('/books', booksRouter);
// app.all("*", (req, res) => {
//     res.status(500).json({
//         message: "NOT BUILT YET"
//     })
// })

app.listen(PORT, () => {
    console.log(`Server is up and running at http://localhost:${PORT}`);
})