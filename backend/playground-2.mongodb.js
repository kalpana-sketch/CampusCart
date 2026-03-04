// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('campusmarket');

// Create a new document in the collection.
db.getCollection('items').insertOne({
  "title": "Calculator",
  "price": 500,
  "category": "Lab Equipment"
});
