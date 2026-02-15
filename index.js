const express = require('express');
const app = express();
const PORT = 8081;

const {users} = require('./data/users.json');
const {books} = require('./data/books.json');

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "home page :-)"
    })
})

/**
 * Route: /users
 * Method: GET
 * Description: Get all the list of users in the system
 * Access: Public
 * Parameters: None
 */
app.get('/users', (req, res) => {
    res.status(200).json({
        success: true,
        data: users
    })
})

/**
 * Route: /users/:id
 * Method: GET
 * Description: Get a user by their ID
 * Access: Public
 * Parameters: ID
 */
app.get('/users/:id', (req, res) => {

    const {id} = req.params;
    const user = users.find((each) => each.id === id);
    if(!user) {
        res.status(404).json({
            success: false,
            message: "User not found!"
        })
        return;
    }

    res.status(200).json({
        success: true,
        data: user
    })
})

/**
 * Route: /users
 * Method: POST
 * Description: Create or Register new user
 * Access: Public
 * Parameters: None
 */
app.post('/users', (req, res) => {
    const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body;

    if(!id || !name || !surname || !email || !subscriptionType || !subscriptionDate) {
        return res.status(400).json({
            success: false,
            message: "invalid input!"
        })
    }

    const user = users.find((each) => each.id === id);
    if(user) {
        return res.status(409).json({
            success: false,
            message: "User Already Exists..."
        })
    }
    users.push({id, name, surname, subscriptionType, subscriptionDate});
    res.status(200).json({
        success: true,
        message: "user created sucessfully!"
    })
})

/**
 * Route: /users/:id
 * Method: PUT
 * Description: Updating a user by their ID
 * Access: Public
 * Parameters: ID
 */ 
app.put('/users/:id', (req, res) => {
    const {id} = req.params;
    const {data} = req.body;
    const user = users.find((each) => each.id === id);
    if(!user) {
        return res.status(404).json({
            success: false,
            
            message: "User not found!"
        })
    }

    // Object.assign(user, data);
    // user = {...data};
    const updatedUser = users.map((each) => {
        if(each.id === id) {
            return {...each, ...data}
        }
        return each
    })
    res.status(200).json({
        success: true,
        data: updatedUser,
        message: "updated a user"
    })
})

// app.all("*", (req, res) => {
//     res.status(500).json({
//         message: "NOT BUILT YET"
//     })
// })

app.listen(PORT, () => {
    console.log(`Server is up and running at http://localhost:${PORT}`);
})