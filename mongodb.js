1. // set up MongoDB


// 2. Database and Collection Creation:
use library;
// Inside `library`, create a collection named `books`
db.createCollection("books");

// 3. Insert Data:

//    - Insert at least five book records into the `books` collection.
//    - Each book should contain fields such as `title`, `author`, `publishedYear`, `genre`, and `ISBN`.
db.books.insertMany([
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      publishedYear: 1960,
      genre: "Fiction",
      ISBN: "978-0-06-112008-4",
      rating: 4.8
    },
    {
      title: "1984",
      author: "George Orwell",
      publishedYear: 1949,
      genre: "Dystopian",
      ISBN: "978-0-452-28423-4",
      rating: 4.7
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      publishedYear: 2013,
      genre: "Romance",
      ISBN: "978-1-85326-000-1",
      rating: 4.6
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      publishedYear: 1925,
      genre: "Tragedy",
      ISBN: "978-0-7432-7356-5",
      rating: 4.4
    },
    {
      title: "Moby-Dick",
      author: "Herman Melville",
      publishedYear: 2010,
      genre: "Adventure",
      ISBN: "978-0-14-243724-7",
      rating: 4.2
    }
  ])



//   4. Retrieve Data:
//    - Retrieve all books from the collection.
db.books.find();
//    - Query books based on a specific author.
db.books.findOne({author: "Harper Lee"})
//    - Find books published after the year 2000.
db.books.find({publishedYear: { $gt: 2000} })



// 5. Update Data:
//    - Update the `publishedYear` of a specific book.
db.books.updateOne({title: "The Great Gatsby"}, { $set: {publishedYear: 2020} });
//    - Add a new field called `rating` to all books and set a default value.
db.books.updateMany({}, { $set: {rating: 5.0} })



// 6. Delete Data:
//    - Delete a book by its `ISBN`.
db.books.deleteOne({ISBN: "978-1-85326-000-1"})
//    - Remove all books of a particular genre.
db.deleteMany({genre: "Adventure"})



// 7. Data Modeling Exercise:
//    - Create a data model for an e-commerce platform including collections for `users`, `orders`, and `products`.
db.createCollection("users");
db.createCollection("orders");
db.createCollection("products");

//    - Decide on appropriate fields and relationships (embedding vs. referencing).
//    - Implement the structure using MongoDB.
// users collection
   db.users.insertOne({
name: "John Doe",
email: "johndoe@example.com",
address: {
street: "123 Main St",
city: "New York",
country: "USA"
},
phone: "+1-555-123-4567"
})

    // orders collection
    db.orders.insertOne({
  _id: ObjectId(),  // Automatically generates a valid ObjectId
  userId: ObjectId("65c2b45f1d2e3a001f6e9b8a"), // Replace with a real 24-character ObjectId
  products: [
    {
      productId: ObjectId("65c2b45f1d2e3a001f6e9b8b"), // Replace with a real ObjectId
      quantity: 2,
      priceAtPurchase: 99.99
    }
  ],
  totalAmount: 199.98,
  paymentMethod: "credit card",
  status: "processing"
});


// products collection
db.products.insertOne({
  _id: ObjectId(), // Generates a unique ObjectId for the product
  name: "Wireless Headphones",
  description: "Noise-canceling over-ear headphones with Bluetooth 5.0.",
  price: 99.99,
  category: "Electronics",
  stock: 50,
  images: [
    "image1.jpg",
    "image2.jpg"
  ],
  ratings: [
    {
      userId: ObjectId("65c2b45f1d2e3a001f6e9b8a"), // Replace with a valid ObjectId from your users collection
      rating: 4.5,
      review: "Great sound quality!",
      createdAt: new Date()
    }
  ],
  createdAt: new Date(),
  updatedAt: new Date()
});


// 8. Aggregation Pipeline:
//    - Use aggregation to find the total number of books per genre.
db.books.aggregate([
    { $group: {_id: "$genre", totalBooks: { $sum: 1 } } }
    ]);

//    - Calculate the average published year of all books.
db.books.aggregate([
    { $group: {_id:null, avgPublishedYear: { $avg: "$publishedYear" } } }
    ]);
//    - Identify the top-rated book.
db.books.aggregate([
    { $sort: { rating: -1 } }, { $limit: 1 }
    ]);


// 9. Indexing:
// - Create an index on the `author` field to optimize query performance.
    db.books.createIndex({ author: 1 });

// - Explain the benefits of indexing in MongoDB.
//     1. Faster query performance
//    2. Efficient sorting
//    3. Improves performance for large datasets
//    4. Optimized filtering
 

