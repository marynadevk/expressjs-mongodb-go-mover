import assert from 'assert';
import request from 'supertest';
import { app } from '../app.js';
import { Driver } from '../models/driver-model.js';

describe('Drives controller', () => {

  it('POST to /api/drivers creates a new driver', done => {
    Driver.countDocuments().then(count => {
    request(app)
      .post('/api/drivers')
      .send({ email: 'test@test.com' })
      .end(() => {
        Driver.countDocuments().then(newCount => {
          assert((count + 1) === newCount);
        });
        done();
      });
    });
  });

  it('PUT to /api/drivers/id edits an existing driver', done => {
    const driver = new Driver({ email: 't@t.com', driving: false });

    driver.save().then(() => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end(() => {
          Driver.findOne({ email: 't@t.com' })
          .then(driver => {
            assert(driver.driving === true);
          });
          done();
        });
    });
  });

  it('DELETE to /api/drivers/id deletes an existing driver', done => {
    const driver = new Driver({ email: 'test@test.com'});
  
    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end(() => {
          Driver.findOne({ email: 'test@test.com' })
          .then(driver => {
            assert(driver === null);
        });
        done();
      });
    })
  });

  it('GET to /api/drivers finds drivers in a location', done => {
    const kyivDriver = new Driver({
      email: 'kyiv@test.com',
      geometry: { type: 'Point', coordinates: [30.523333, 50.450001] }
    });
    const miamiDriver = new Driver({
      email: 'miami@test.com',
      geometry: { type: 'Point', coordinates: [-80.253, 25.791] }
    });

    Promise.all([kyivDriver.save(), miamiDriver.save()])
      .then(() => {
        request(app)
          .get('/api/drivers?lng=30&lat=50')
          .end((err, response) => {
            assert(response.body.length === 1);
            assert(response.body[0].obj.email === 'kyiv@test.com')
          });
        });
      done();
  });
});
