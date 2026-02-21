const express = require('express');
const dotenv = require('dotenv');

// importing the routers
const usersRouter = require("./routes/user");
const booksRouter = require("./routes/books");
const dbConnection = require('./dotabaseConnection');

dotenv.config();
const app = express();
const PORT = 8081;
dbConnection();

// const {users} = require('./data/users.json');
// const {books} = require('./data/books.json');



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