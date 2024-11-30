import { v4 as uuidv4 } from "uuid"; 
import session from "../neo4j.js"; 


export const addBook = async (
  name,
  description,
  category,
  price,
  discount,
  image,
  title,
  userId
) => {
  try {
    const checkQuery = "MATCH (b:Book {name: $name}) RETURN b";
    const checkResult = await session.run(checkQuery, { name });

    if (checkResult.records.length > 0) {
      throw new Error("Book already exists");
    }

    const bookId = uuidv4(); 
    const query = `
            MATCH (u:User {email: $userId})  
            CREATE (b:Book {bookId: $bookId, name: $name, description: $description, category: $category, price: $price, discount: $discount, image: $image, title: $title})
            CREATE (u)-[:BOOK_OF]->(b)  
            RETURN b
        `;

    const result = await session.run(query, {
      bookId,
      name,
      description,
      category,
      price,
      discount,
      image,
      title,
      userId,
    });

    return result.records[0].get("b").properties; 
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};


export const updateBook = async (
  bookId,
  name,
  description,
  category,
  price,
  discount,
  image,
  title,
  Genre
) => {
  try {
    const checkQuery = "MATCH (b:Book {bookId: $bookId}) RETURN b";
    const checkResult = await session.run(checkQuery, { bookId });

    if (checkResult.records.length === 0) {
      throw new Error("Book not found");
    }

    const query = `
      MATCH (b:Book {bookId: $bookId})
      SET b.name = $name, b.description = $description, b.category = $category, b.price = $price, 
          b.discount = $discount, b.image = $image, b.title = $title, b.Genre = $Genre
      RETURN b
    `;

    const result = await session.run(query, {
      bookId,
      name,
      description,
      category,
      price,
      discount,
      image,
      title,
      Genre 
    });

    return result.records[0].get("b").properties;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};



export const getBooks = async (email) => {

  try {
    const query = "MATCH (u:User{email:$email})-[:BOOK_OF]->(b:Book) RETURN b";
    const result = await session.run(query,{email});

    return result.records.map((record) => ({
      id: record.get("b").properties.bookId, //uuid as bookid
      ...record.get("b").properties,
    }));
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const getSingleBook = async (bookId) => {
  try {
  const query =
      "MATCH (b:Book {bookId: $bookId}) RETURN properties(b) as bookData  ";

    const result = await session.run(query, { bookId });
    if (result.records.length > 0) {
      return result.records[0].get("bookData");
    }

    return {};
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};


export const deleteBook = async (bookId) => {
  try {
    const query = `
            MATCH (b:Book {bookId: $bookId})
            DETACH 
            DELETE b
            Return true
        `;
    const result = await session.run(query, { bookId });
    return result 
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};
