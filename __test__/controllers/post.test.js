const { postController } = require('../../controllers/postController');
const Model = require('../../models/model');
const supertest = require('supertest');

// Mocking the Model
jest.mock('../../models/model');

describe('postController', () => {
  it('should handle a successful POST request', async () => {
    // Mocking req and res
    const req = {
      body: {
        name: 'John Doe',
        age: 25,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking the save method of the Model
    Model.prototype.save.mockResolvedValue({
      name: 'John Doe',
      age: 25,
      _id: 'someUniqueId',
    });

    await postController(req, res);

    // Assert that the status is set to 200 and the json method is called with the expected data
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      name: 'John Doe',
      age: 25,
      _id: 'someUniqueId',
    });
  });



  it('should handle a failed POST request', async () => {
    // Mocking req and res
    const req = {
      body: {
        name: 'John Doe',
        age: 25,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking the save method of the Model to simulate a failure
    Model.prototype.save.mockRejectedValue(new Error('Something Went Wrong'));

    await postController(req, res);

    // Assert that the status is set to 400 and the json method is called with the error message
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Something Went Wrong'});
  });

});