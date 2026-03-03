const express = require('express');
// const { users } = require('../data/users.json');
const { getAllUsers, getUser, getSubscriptionDetatils, createUser, updateUser, deleteUser } = require('../controllers/user-controller');

// const router = express();
const router = express.Router();
/**
 * Route: /users
 * Method: GET
 * Description: Get all the list of users in the system
 * Access: Public
 * Parameters: None
 */
// router.get('/', (req, res) => {
//     res.status(200).json({
//         success: true,
//         data: users
//     })
// })
router.get('/', getAllUsers);

/**
 * Route: /users/:id
 * Method: GET
 * Description: Get a user by their ID
 * Access: Public
 * Parameters: ID
 */
// router.get('/:id', (req, res) => {

//     const {id} = req.params;
//     const user = users.find((each) => each.id === id);
//     if(!user) {
//         res.status(404).json({
//             success: false,
//             message: "User not found!"
//         })
//         return;
//     }

//     res.status(200).json({
//         success: true,
//         data: user
//     })
// })
router.get('/:id', getUser);

/**
 * Route: /users
 * Method: POST
 * Description: Create or Register new user
 * Access: Public
 * Parameters: None
 */
// router.post('/', (req, res) => {
//     const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body;

//     if(!id || !name || !surname || !email || !subscriptionType || !subscriptionDate) {
//         return res.status(400).json({
//             success: false,
//             message: "invalid input!"
//         })
//     }

//     const user = users.find((each) => each.id === id);
//     if(user) {
//         return res.status(409).json({
//             success: false,
//             message: "User Already Exists..."
//         })
//     }
//     users.push({id, name, surname, subscriptionType, subscriptionDate});
//     res.status(200).json({
//         success: true,
//         message: "user created sucessfully!"
//     })
// })
router.post('/', createUser);

/**
 * Route: /users/:id
 * Method: PUT
 * Description: Updating a user by their ID
 * Access: Public
 * Parameters: ID
 */ 
// router.put('/:id', (req, res) => {
//     const {id} = req.params;
//     const {data} = req.body;
//     const user = users.find((each) => each.id === id);
//     if(!user) {
//         return res.status(404).json({
//             success: false,
//             message: "User not found!"
//         })
//     }

//     // Object.assign(user, data);
//     // user = {...data};
//     const updatedUser = users.map((each) => {
//         if(each.id === id) {
//             return {...each, ...data}
//         }
//         return each
//     })
//     res.status(200).json({
//         success: true,
//         data: updatedUser,
//         message: "updated a user"
//     })
// })
router.put('/:id', updateUser);

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Deleting a user by their ID
 * Access: Public
 * Parameters: ID
 */ 

// router.delete('/:id', (req, res) => {
//     const {id} = req.params;

//     const user = users.find(each => each.id === id);
//     if(!user) {
//         return res.status(404).json({
//             success: false,
//             message: "user not found!"
//         })
//     }

//     const updatedUsers = users.filter(user => user.id !== id);

//     res.status(200).json({
//         success: true,
//         data: updatedUsers,
//         message: "user has been deleted sucessfully..."
//     })
// })
router.delete('/:id', deleteUser) 

// router.get('/subscription-detatils/:id', (req, res) => {
//     const {id} = req.params;
//     const user = users.find(user => user.id === id);

//     if(!user) {
//         return res.status(404).json({
//             success: false,
//             message: "user not found"
//         })
//     }

//     const subscriptionDetails = [user.name, user.subscriptionType, subscriptionDate];

//     res.status(200).json({
//         success: true,
//         message: "here is users subscription detatils: ",
//         data: subscriptionDetails
//     })
// })
router.get('/subscription-detatils/:id', getSubscriptionDetatils);

module.exports = router;