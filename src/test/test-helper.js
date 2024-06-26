import mongoose from 'mongoose';

before(done => {
  mongoose.connect(process.env.DB_URL_TEST, { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      console.warn('Warning', err);
    });
});

beforeEach(done => {
  const { drivers } = mongoose.connection.collections;
  drivers.drop()
    .then(() => done())
    .catch(() => done());
});
