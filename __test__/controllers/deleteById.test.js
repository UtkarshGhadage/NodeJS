const {
  deleteByIdController,
} = require("../../controllers/deleteByIdController");
const Model = require("../../models/model");
const supertest = require("supertest");

// Mocking the Model
jest.mock("../../models/model");

describe("deleteByIdController", () => {
  it("Should handle delete by id succesfully", async () => {
    const req = {
      params: { id: "someUniqueId" },
    };

    const res = {
      send: jest.fn(),
    };

    const data = Model.findByIdAndDelete.mockResolvedValue({
      _id: "someUniqueId",
      name: "Deleted Name",
      age: 30,
    });

    await deleteByIdController(req, res);

    expect(res.send).toHaveBeenCalledWith(
      `Document with Deleted Name has been deleted !!`
    );
  });

  it("should handle a failed delete", async () => {
    const req = {
      params: { id: "someUniqueId" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Model.findByIdAndDelete.mockRejectedValue(new Error("Something Went Wrong" ));


    await deleteByIdController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Something Went Wrong"  });
  });
});
