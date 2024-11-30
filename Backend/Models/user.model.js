import session from '../neo4j.js';
import bcrypt from 'bcryptjs';


export const createUser = async (fullname, email, password) => {
  try {
    const checkQuery = 'MATCH (u:User {email: $email}) RETURN u';
    const checkResult = await session.run(checkQuery, { email });

    if (checkResult.records.length > 0) {
      throw new Error('User already exists');
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const query = `
      CREATE (u:User {fullname: $fullname, email: $email, password: $hashPassword})
      RETURN u
    `;

    const result = await session.run(query, { fullname, email, hashPassword });
    return result.records[0].get('u').properties;
  } catch (error) {
    console.error('Error creating user:', error.message);
    throw error;
  }
};


export const findUserByEmail = async (email) => {
  try {
    const query = 'MATCH (u:User {email: $email}) RETURN u';
    const result = await session.run(query, { email });

    if (result.records.length > 0) {
      return result.records[0].get('u').properties;
    }
    return null;
  } catch (error) {
    console.error('Error finding user:', error.message);
    throw error;
  }
};
