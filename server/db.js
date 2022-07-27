const { DataStore } = require('notarealdb');

const store = new DataStore('./data');

module.exports = {
  users: store.collection('users'),
  dogs: store.collection('dogs'),
  breeds: store.collection('breeds'),
};
