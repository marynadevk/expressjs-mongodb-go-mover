import { StatusCodes } from 'http-status-codes';
import { Driver } from '../models/driver-model.js';

class DriversController {
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
