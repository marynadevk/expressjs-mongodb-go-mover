import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const DriverSchema = new Schema({
  email: {type: String, required: true},
  driving: {type: Boolean, default: false},
});

export const Driver = model('Driver', DriverSchema);
