const sql = require("./db.js");

// constructor
const Library = function (library) {
  this.book_name = library.book_name;
  this.book_category = library.book_category;
  this.book_publication_year = library.book_publication_year;
  this.book_copies_owned = library.book_copies_owned;
  this.book_author_name = library.book_author_name;
  this.status = library.status
};
//Get all
Library.getAll = (book_name, result) => {
  let query = "Select book_id,book_name,book_category,book_publication_year,book_copies_owned,book_author_name,status,createdAt,updatedAt from books where status='active'";
  if (book_name) {
    query += ` WHERE title LIKE '%${book_name}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Book list: ", res);
    result(null, res);
  });
};
//Get with id
Library.findById = (book_id, result) => {
  sql.query(`SELECT book_name,book_category,book_publication_year,book_copies_owned,book_author_name,status,createdAt,updatedAt FROM books WHERE book_id = ${book_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found book: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};
//Create newbook
Library.create = (newBook, result) => {
  sql.query("INSERT INTO books SET ?", newBook, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created books: ", { book_id: res.insertbook_id, ...newBook });
    result(null, { book_id: res.insertbook_id, ...newBook });
  });
};
//update book here
Library.updateById = (book_id, books, result) => {
  sql.query(
    `update books set book_name=?,book_category=?,book_publication_year=?,book_copies_owned=?,book_author_name=?,status = ? where book_id = ${book_id}`,
    [books.book_name, books.book_category, books.book_publication_year, books.book_copies_owned, books.book_author_name,books.status,book_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated books: ", { book_id: book_id, ...books });
      result(null, { book_id: book_id, ...books });
    }
  );
};
//Delete id
Library.remove = (book_id, result) => {
  sql.query("update books set status='inactive' where book_id = ?", book_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted book with book_id: ", book_id);
    result(null, res);
  });
};
module.exports = Library;