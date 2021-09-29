const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/user");
const guards = require("../guards/index");

router.get("/", [guards.verifyToken, guards.isAdmin], ctrl.getAll);
router.get("/:id", [guards.verifyToken, guards.isAdmin], ctrl.getById);
router.put("/:id", guards.verifyToken, ctrl.updateById);
router.delete("/:id", [guards.verifyToken, guards.isAdmin], ctrl.deleteById);
// router.post("/", ctrl.create);

module.exports = router;
