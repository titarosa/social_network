const express = require('express');
const router = express.Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// Route to get all thoughts
router.get('/', getAllThoughts);

// Route to create a new thought
router.post('/', createThought);

// Route to handle single thought operations
router.route('/:thoughtId')
  .get(getThoughtById)  
  .delete(deleteThought);

// Route to add a reaction to a thought
router.post('/:thoughtId/reactions', addReaction);

// Route to remove a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

module.exports = router;
