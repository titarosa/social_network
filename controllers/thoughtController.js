const Thought = require('../models/Thought');
const User = require('../models/User'); 

// Get all thoughts
const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find().sort({ createdAt: -1 });
    res.json(thoughts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving thoughts.' });
  }
};

// Create a new thought
const createThought = async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    
    if (req.body.userId) {
      const updatedUser = await User.findByIdAndUpdate(
        req.body.userId,
        { $addToSet: { thoughts: newThought._id } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'Thought created, but no user found with this ID!' });
      }
    }

    res.status(201).json({ message: 'Thought created successfully!', thought: newThought });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to create thought. Please check your input.' });
  }
};
// Get a single thought by ID
const getThoughtById = async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId)
        .select('-__v'); 
  
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this ID!' });
      }
  
      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while retrieving the thought.' });
    }
  };
// Delete a thought by ID
const deleteThought = async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!deletedThought) return res.status(404).json({ message: 'Thought not found' });

    await User.updateMany(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } }
    );

    res.json({ message: 'Thought deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the thought.' });
  }
};

// Add a reaction to a thought
const addReaction = async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $addToSet: { reactions: req.body } },
      { new: true, runValidators: true }
    );

    if (!updatedThought) return res.status(404).json({ message: 'Thought not found' });
    res.json(updatedThought);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to add reaction. Please check your input.' });
  }
};

// Remove a reaction from a thought
const removeReaction = async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );

    if (!updatedThought) return res.status(404).json({ message: 'Thought not found' });
    res.json(updatedThought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while removing the reaction.' });
  }
};

module.exports = {
  getAllThoughts,
  getThoughtById,
  createThought,
  deleteThought,
  addReaction,
  removeReaction,
};
