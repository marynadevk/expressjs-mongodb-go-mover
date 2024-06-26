import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { driversRouter } from './routes/drivers-router.js';
import { Driver } from './models/driver-model.js';
import { StatusCodes } from 'http-status-codes';

export const app = express();

app.use(bodyParser.json());
app.use('/api', driversRouter)
app.use((err, req, res, next) => {
  res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({ error: err.message });
});

const startServer = () => {
  app.listen(process.env.PORT, async () => {
    if (process.env.NODE_ENV !== 'test') {
      await mongoose.connect(process.env.DB_URL)
      .then(async () => await Driver.init())
      .then(() => console.log('Connected to MongoDB'));

      console.log(`Server started on PORT = ${process.env.PORT}`)
    }
  });
}

startServer();
