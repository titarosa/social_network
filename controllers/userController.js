const User = require('../models/User');
const Thought = require('../models/Thought'); 

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-__v') 
      .populate('thoughts')
      .populate('friends');
    
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving users.' });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('-__v')
      .populate('thoughts')
      .populate('friends');
    
    if (!user) {
      return res.status(404).json({ message: 'No user found with this ID!' });
    }
    
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving the user.' });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ message: 'User created successfully!', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to create user. Please check your input.' });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'No user found with this ID!' });
    }

    res.json({ message: 'User updated successfully!', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to update user. Please check your input.' });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    
    if (!deletedUser) {
      return res.status(404).json({ message: 'No user found with this ID!' });
    }

    // Delete associated thoughts
    await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
    res.json({ message: 'User and associated thoughts deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the user.' });
  }
};

// Add a friend to the friend list
const addFriend = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'No user found with this ID!' });
    }

    res.json({ message: 'Friend added successfully!', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while adding the friend.' });
  }
};

// Remove a friend from the friend list
const removeFriend = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'No user found with this ID!' });
    }

    res.json({ message: 'Friend removed successfully!', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while removing the friend.' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
};
