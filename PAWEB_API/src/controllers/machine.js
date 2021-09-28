const model = require("../models/machine");
const person = require("../models/person");
const modelUser = require("../models/user");
const modelRole = require("../models/role");

function senResponse(res, type, data, status = 200) {
  const result = {
    type: type,
    data: data,
  };
  return res.status(status).send(result);
}

async function generateUserName(identityDocument, roleId, personId) {
  const user = await modelUser.findOne({ userName: identityDocument });
  if (!user) {
    const newUser = new modelUser({
      userName: identityDocument,
      password: identityDocument,
      role: roleId,
      person: personId,
    });
    await newUser.save();
    return { userName: identityDocument, password: identityDocument };
  } else {
    return { userName: "", password: "" };
  }
}

exports.create = async (req, res) => {
  try {
    const body = req.body;
    if (body.status) {
      if (body.status != "Almacén" && body.status != "Cuarentena") {
        throw "Los estados permitidos son: Almacén y Cuarentena";
      }
    }
    const found = await model.findOne({ serial: body.serial });
    if (found) {
      throw "Ya existe un equipo asociado al serial " + body.serial;
    }

    const machine = new model(body);
    const result = await machine.save();
    senResponse(res, "ok", result);
  } catch (error) {
    senResponse(res, "error", error, 500);
  }
};

exports.updateById = async (req, res) => {
  try {
    const id = req.params.id;
    if (req.body.status) {
      if (req.body.status != "Almacén" && req.body.status != "Cuarentena") {
        throw "Los estados permitidos son: Almacén y Cuarentena";
      }
    }

    const machine = await model.findByIdAndUpdate(id, req.body, { new: true });
    if (machine == null) {
      throw "Id no encontrado";
    }
    senResponse(res, "ok", machine);
  } catch (error) {
    senResponse(res, "error", error, 500);
  }
};

exports.getAll = async (req, res) => {
  try {
    let filter = req.query;
    Object.entries(filter).forEach((e) => {
      if (
        e[0] == "machineName" ||
        e[0] == "description" ||
        e[0] == "brand" ||
        e[0] == "accessories" ||
        e[0] == "peripherals" ||
        e[0] == "manufacturer"
      ) {
        filter[e[0]] = { $regex: `.*${e[1]}.*` };
      }
    });
    const machine = await model.find(filter);
    senResponse(res, "ok", machine);
  } catch (error) {
    senResponse(res, "error", error, 500);
  }
};

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const machine = await model.findById({ _id: id });
    senResponse(res, "ok", machine);
  } catch (error) {
    senResponse(res, "error", error, 500);
  }
};

exports.deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const machine = await model.findByIdAndRemove(id);
    senResponse(res, "ok", machine);
  } catch (error) {
    senResponse(res, "error", error, 500);
  }
};
