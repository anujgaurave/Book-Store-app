import {
  addBook,
  getBooks,
  updateBook,
  deleteBook,
  getSingleBook,
} from "../Models/book.model.js";
import { Neo4jError } from "neo4j-driver";

export const addBookController = async (req, res, next) => {
  const { name, description, category, price, discount, image, title } =
    req.body;

  const userId = req.user.userId;

  try {
    const book = await addBook(
      name,
      description,
      category,
      price,
      discount,
      image,
      title,
      userId
    );

    res.status(201).json({
      message: "Book added successfully and associated with user",
      book: book,
    });
  } catch (error) {
    console.error("Error adding book:", error);
    if (error instanceof Neo4jError) {
      res
        .status(500)
        .json({
          message: "Error interacting with the database",
          error: error.message,
        });
    } else {
      next(error);
    }
  }
};

export const getBooksController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const books = await getBooks(userId);

    res.status(200).json({ books });
  } catch (error) {
    console.error("Error fetching books:", error);
    if (error instanceof Neo4jError) {
      res
        .status(500)
        .json({
          message: "Error interacting with the database",
          error: error.message,
        });
    } else {
      next(error);
    }
  }
};

export const getSingleBookController = async (req, res, next) => {
  try {
    const book = await getSingleBook(req.query.bookId);
    console.log(book);

    res.status(200).json({ book });
  } catch (error) {
    console.error("Error fetching books:", error);
    if (error instanceof Neo4jError) {
      res
        .status(500)
        .json({
          message: "Error interacting with the database",
          error: error.message,
        });
    } else {
      next(error);
    }
  }
};

export const updateBookController = async (req, res, next) => {
  const { name, description, category, price, discount, image, title, Genre } =
    req.body;
  const { bookId } = req.query;

  try {
    const updatedBook = await updateBook(
      bookId,
      name,
      description,
      category,
      price,
      discount,
      image,
      title,
      Genre
    );

    res.status(200).json({
      message: "Book updated successfully",
      updatedBook,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    if (error instanceof Neo4jError) {
      res
        .status(500)
        .json({
          message: "Error interacting with the database",
          error: error.message,
        });
    } else {
      next(error);
    }
  }
};

export const deleteBookController = async (req, res) => {
  const { bookId } = req.query;
  if (!bookId) {
    return res.status(400).json({ message: "bookId is required" });
  }
  try {
    const result = await deleteBook(bookId);
    if (result) {
      res
        .status(200)
        .json({ message: "Book deleted successfully", data: result });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    console.error("Error deleting book:", error);
    if (error instanceof Neo4jError) {
      res
        .status(500)
        .json({
          message: "Error interacting with the database",
          error: error.message,
        });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
