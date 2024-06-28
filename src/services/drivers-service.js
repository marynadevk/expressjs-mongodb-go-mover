import { Driver } from '../models/driver-model.js';

export const MAX_DISTANCE = 200000;

class DriversService {

  async getNearDrivers(lng, lat) {
    return await Driver.geoNear(
      { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
      { spherical: true, maxDistance: MAX_DISTANCE }
    )
  }

  async createDriver(driverProps) {
    return await Driver.create(driverProps);
  }

  async editDriver(driverId, driverProps) {
    return await Driver.findByIdAndUpdate({ _id: driverId }, driverProps);
  }

  async deleteDriver(driverId) {
    return await Driver.findByIdAndRemove({ _id: driverId });
  }
}

export const driversService = new DriversService();