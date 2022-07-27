const db = require('./db');

const Query = {
  dogs: () => db.dogs.list(),
  users: () => db.users.list(),
  breeds: () => db.breeds.list(),
};

const Dog = {
  breed: (dog) => db.breeds.get(dog.breedId),
};

module.exports = { Query, Dog };
