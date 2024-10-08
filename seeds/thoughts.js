const mongoose = require('mongoose');
const Thought = require('../models/Thought'); 
mongoose.connect('mongodb://localhost/socialNetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedThoughts = [
  { thoughtText: 'A vida é bela.', username: 'Ana' },
  { thoughtText: 'Nada como um dia após o outro.', username: 'Carlos' },
  { thoughtText: 'A felicidade é uma escolha.', username: 'Fernanda' },
  { thoughtText: 'Sonhar é o primeiro passo para realizar.', username: 'Lucas' },
  { thoughtText: 'Viva o momento.', username: 'Juliana' },
];

Thought.deleteMany({})
  .then(() => Thought.insertMany(seedThoughts))
  .then(() => {
    console.log('Dados de pensamentos inseridos');
    mongoose.connection.close();
  })
  .catch(err => console.error(err));

