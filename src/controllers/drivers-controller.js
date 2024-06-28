import { StatusCodes } from 'http-status-codes';
import { driversService } from '../services/drivers-service.js';

class DriversController {

  index(req, res, next) {
    const { lng, lat } = req.query;

    driversService.getNearDrivers(lng, lat)
      .then(drivers => res.send(drivers))
      .catch(err => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
        next();
      });
  }

  createDriver(req, res, next) {
    const driverProps = req.body;

    driversService.createDriver(driverProps)
      .then(driver => res.send(driver))
      .catch(err => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
        next();
      });
  }

  editDriver(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;

    driversService.editDriver(driverId, driverProps)
      .then(driver => res.send(driver))
      .catch(err => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
        next();
      });
  }

  deleteDriver(req, res, next) {
    const driverId = req.params.id;

    driversService.deleteDriver(driverId)
      .then(driver => res.status(StatusCodes.NO_CONTENT).send(driver))
      .catch(err => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
        next();
      });
  }
}

export const driversController = new DriversController();
