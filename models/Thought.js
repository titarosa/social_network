const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Reaction Schema
const ReactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

// Thought Schema
const ThoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: [true, 'Thought text is required!'],
    minlength: [1, 'Thought text must be at least 1 character long!'],
    maxlength: [280, 'Thought text must be at most 280 characters long!'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [ReactionSchema],
}, {
  toJSON: {
    getters: true,
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
  timestamps: true, 
});

// Virtual property for reaction count
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// Create Thought model
const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;
