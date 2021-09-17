const model = require("../models/person");
const modelRole = require("../models/role");

function senResponse(res, type, data, status = 200) {
  const result = {
    type: type,
    data: data,
  };
  return res.status(status).send(result);
}

exports.create = async (req, res) => {
  try {
    const body = req.body;
    const role = await modelRole.findOne({ roleName: req.body.roleName });
    body.role = role.id;
    const found = await model.findOne({
      identityDocument: body.identityDocument,
    });

    if (!found) {
      const user = new model(body);
      const result = await user.save();
      senResponse(res, "ok", result, 201);
    } else {
      const result = await model.findByIdAndUpdate(found.id, body, {
        new: true,
      });
      senResponse(res, "ok", result);
    }
  } catch (error) {
    senResponse(res, "error", error, 500);
  }
};

exports.updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const people = await model
      .findByIdAndUpdate(id, req.body, { new: true })
      .populate("role");
    senResponse(res, "ok", people);
  } catch (error) {
    senResponse(res, "error", error, 500);
  }
};

exports.getAll = async (req, res) => {
  try {
    const { roleName } = req.query;
    if (!roleName) {
      const people = await model.find().populate("role");
      senResponse(res, "ok", people);
    } else {
      // const role = await modelRole.findOne({ roleName });
      // var ObjectId = require("mongoose").Types.ObjectId;
      const people = await model.find({ roleName }).populate("role");
      senResponse(res, "ok", people);
    }
  } catch (error) {
    senResponse(res, "error", error, 500);
  }
};

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const people = await model.findById({ _id: id }).populate("role");
    senResponse(res, "ok", people);
  } catch (error) {
    senResponse(res, "error", error, 500);
  }
};
