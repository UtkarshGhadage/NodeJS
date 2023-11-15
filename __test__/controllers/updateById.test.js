const {
  updateByIdController,
} = require("../../controllers/updateByIdController");
const Model = require("../../models/model");
const supertest = require("supertest");

// Mocking the Model
jest.mock("../../models/model");

describe("updateByIdController", () => {
  it("should handle a successful update", async () => {
    // Mocking req and res with a parameterized id in req.params
    const req = {
      params: { id: "someUniqueId" },
      body: { name: "Updated Name", age: 30 },
    };

    const res = {
      send: jest.fn(),
    };

    Model.findByIdAndUpdate.mockResolvedValue({
      _id: "someUniqueId",
      name: "Updated Name",
      age: 30,
    });

    await updateByIdController(req, res);

    // Asserting that the send method of the res object is called with the expected data
    expect(res.send).toHaveBeenCalledWith({
      _id: "someUniqueId",
      name: "Updated Name",
      age: 30,
    });
  });

  it("should handle a failed update request", async () => {
    const req = {
      params: { id: "someUniqueId" },
      body: { name: "Updated Name", age: 30 },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking update method
    Model.findByIdAndUpdate.mockRejectedValue(
      new Error("Something Went Wrong")
    );

    await updateByIdController(req, res);

    // Assert that the status is set to 400 and the json method is called with the error message
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Something Went Wrong" });
  });
});
