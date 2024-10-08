const mongoose = require('mongoose');
const User = require('../models/User'); 

mongoose.connect('mongodb://localhost/socialNetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedUsers = [
  { username: 'joaosilva', name: 'João Silva', email: 'joao@example.com' },
  { username: 'mariaoliveira', name: 'Maria Oliveira', email: 'maria@example.com' },
  { username: 'pedroalves', name: 'Pedro Alves', email: 'pedro@example.com' },
  { username: 'anaferreira', name: 'Ana Ferreira', email: 'ana@example.com' },
  { username: 'luizcarvalho', name: 'Luiz Carvalho', email: 'luiz@example.com' },
];

User.deleteMany({})
  .then(() => User.insertMany(seedUsers))
  .then(() => {
    console.log('Dados inseridos');
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
