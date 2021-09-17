const model = require("../models/user");

function senResponse(res, type, data, status = 200) {
  const result = {
    type: type,
    data: data,
  };
  res.status(status).send(result);
}

exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    let user = await model
      .findOne({ userName, active: true })
      .populate(["role", "person"])
      .exec();
    if (user) {
      const result = user.comparePassword(password);
      if (result) {
        const payload = {
          id: user._id,
          userName: user.userName,
          role: user.role,
          person: user.person,
        };
        const token = user.generateToken(payload);
        payload.token = token;
        senResponse(res, "ok", payload);
      } else {
        senResponse(res, "error", "Contraseña inválida");
      }
    } else {
      senResponse(res, "error", error, 401);
    }
  } catch (error) {
    senResponse(res, "error", error, 500);
  }
};

// exports.create = async (req, res) => {
//   try {
//     const body = req.body;
//     const role = await modelRole.findOne({ roleName: req.body.roleName });
//     body.role = role.id;
//     const found = await model.findOne({
//       identityDocument: body.identityDocument,
//     });

//     if (!found) {
//       const user = new model(body);
//       const result = await user.save();
//       senResponse(res, "ok", result, 201);
//     } else {
//       const result = await model.findByIdAndUpdate(found.id, body, {
//         new: true,
//       });
//       senResponse(res, "ok", result);
//     }
//   } catch (error) {
//     senResponse(res, "error", error, 400);
//   }
// };

// exports.updateById = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const people = await model
//       .findByIdAndUpdate(id, req.body, { new: true })
//       .populate("role");
//     senResponse(res, "ok", people);
//   } catch (error) {
//     senResponse(res, "error", error);
//   }
// };

// exports.getAll = async (req, res) => {
//   try {
//     const { roleName } = req.query;
//     if (!roleName) {
//       const people = await model.find().populate("role");
//       senResponse(res, "ok", people);
//     } else {
//       // const role = await modelRole.findOne({ roleName });
//       // var ObjectId = require("mongoose").Types.ObjectId;
//       const people = await model.find({ roleName }).populate("role");
//       senResponse(res, "ok", people);
//     }
//   } catch (error) {
//     senResponse(res, "error", error);
//   }
// };

// exports.getById = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const people = await model.findById({ _id: id }).populate("role");
//     senResponse(res, "ok", people);
//   } catch (error) {
//     senResponse(res, "error", error);
//   }
// };
