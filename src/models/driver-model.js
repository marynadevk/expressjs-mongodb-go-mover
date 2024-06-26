import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const PointSchema = new Schema({
  type: { type: String, default: 'Point' },
  coordinates: { type: [Number], index: '2dsphere' }
}); 

const DriverSchema = new Schema({
  email: { type: String, required: true },
  driving: { type: Boolean, default: false },
  geometry: {
    type: PointSchema,
  }
});

export const Driver = model('Driver', DriverSchema);
