const { getAllController } = require("../../controllers/getAllController");
const Model = require("../../models/model");
const supertest = require("supertest");

// Mocking the Model
jest.mock("../../models/model");

describe("getAllController", () => {
  it("should handle a successful getAll request", async () => {
    // Mocking req and res
    const req = {};

    const res = {
      json: jest.fn(),
    };

    // Mocking the find method of the Model
    Model.find.mockResolvedValue([
      { name: "Utkarsh Ghadage", age: 24, _id: "someUniqueId1" },
      { name: "John Doe", age: 24, _id: "someUniqueId2" },
    ]);

    await getAllController(req, res);

    expect(res.json).toHaveBeenCalledWith([
      { name: "Utkarsh Ghadage", age: 24, _id: "someUniqueId1" },
      { name: "John Doe", age: 24, _id: "someUniqueId2" },
    ]);


  });

  it("should handle a FAILED getAll request", async () => {
    // Mocking req and res
    const req = {};

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    Model.find.mockRejectedValue(new Error("Something went wrong"));

    await getAllController(req, res);

    // Assert that the status is set to 500 and the json method is called with the error message
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Something Went Wrong" });

    
  });
});
