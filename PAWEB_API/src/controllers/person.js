const model = require("../models/person");
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
    const role = await modelRole.findOne({ roleName: req.body.roleName });
    body.role = role.id;
    const found = await model.findOne({
      identityDocument: body.identityDocument,
    });

    if (!found) {
      const person = new model(body);
      const result = await person.save();
      // Asignar usuario por defecto
      generateUserName(body.identityDocument, role.id, result.id).then(
        (user) => {
          result._doc.user = user;
          senResponse(res, "ok", result, 201);
        }
      );
    } else {
      senResponse(res, "error", "El tercero ya existe");
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
    if (people == null) {
      throw "Id no encontrado";
    }

    senResponse(res, "ok", people);
  } catch (error) {
    senResponse(res, "error", error, 500);
  }
};

exports.getAll = async (req, res) => {
  try {
    let { identityDocument, firstName, lastName, roleName } = req.query;
    // Filtrar por identificaión, nombre y/o rol
    let filter = {};
    if (identityDocument) {
      filter.identityDocument = { $regex: `.*${identityDocument}.*` };
    }
    if (firstName) {
      filter.firstName = { $regex: `.*${firstName}.*` };
    }
    if (lastName) {
      filter.lastName = { $regex: `.*${lastName}.*` };
    }
    if (roleName) {
      filter.roleName = roleName;
    }
    const people = await model.find(filter).populate("role");
    senResponse(res, "ok", people);
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
