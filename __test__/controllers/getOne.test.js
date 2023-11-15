const { getOneController } = require("../../controllers/getOneController");
const Model = require("../../models/model");
const supertest = require("supertest");

// Mocking the Model
jest.mock("../../models/model");

describe("getOneController", () => {
  it("should handle a successful getOne request", async () => {
    // Mocking req and res
    const req = {
      params: {
        id: "someUniqueId",
      },
    };

    const res = {
      json: jest.fn(),
    };

    // Mocking the find method of the Model
    Model.findById.mockResolvedValue({
      name: "Utkarsh Ghadage",
      age: 24,
      _id: "someUniqueId",
    });

    await getOneController(req, res);

    expect(res.json).toHaveBeenCalledWith({
      name: "Utkarsh Ghadage",
      age: 24,
      _id: "someUniqueId",
    });
  });

  it("should handle a failed getOne request", async () => {
    const req = {
      body: {
        name: "Utkarsh Ghadage",
        age: 24,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking getOne method 
    Model.findById.mockRejectedValue(new Error("Something went wrong"));

    await getOneController(req, res);

    // Assert that the status is set to 400 and the json method is called with the error message
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Something Went Wrong" });

  });
});
