import { StatusCodes } from 'http-status-codes';
import { Driver } from '../models/driver-model.js';

export const MAX_DISTANCE = 200000;

class DriversController {
  index(req, res, next) {
    const { lng, lat } = req.query;

    Driver.geoNear(
      { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
      { spherical: true, maxDistance: MAX_DISTANCE }
    )
      .then(drivers => res.send(drivers))
      .catch(next);
  }

  createDriver(req, res, next) {
    const driverProps = req.body;

    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next);
  }

  editDriver(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;

    Driver.findByIdAndUpdate({ _id: driverId }, driverProps)
      .then(() => Driver.findById({ _id: driverId }))
      .then(driver => res.send(driver))
      .catch(next);
  }

  deleteDriver(req, res, next) {
    const driverId = req.params.id;

    Driver.findByIdAndRemove({ _id: driverId })
      .then(driver => res.status(StatusCodes.NO_CONTENT).send(driver))
      .catch(next);
  }
}

export const driversController = new DriversController();
