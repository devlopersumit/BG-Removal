import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

//App Config
const app = express();
const port = process.env.PORT || 4000;

//Middleware
app.use(cors());
app.use(express.json());

//Database Connection
await connectDB();

//API Endpoints
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);


//Server Start
app.listen(port, () => console.log(`Server running on port ${port}`));