import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import bookRoute from './Routes/book.route.js';  
import userRoute from './Routes/user.route.js';
import { errorHandler } from './Middleware/errorHandler.js'; 

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/book', bookRoute);
app.use('/user', userRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
