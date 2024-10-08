const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// Route to get all users
router.get('/', getAllUsers);

// Route to handle single user operations
router.route('/:userId')
  .get(getUserById)  
  .put(updateUser)   
  .delete(deleteUser); 

// Route to create a new user
router.post('/', createUser);

// Route to manage friends for a user
router.route('/:userId/friends/:friendId')
  .post(addFriend)   
  .delete(removeFriend); 

module.exports = router;

