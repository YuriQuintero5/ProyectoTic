const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/auth");

router.post("/", ctrl.login);

// router.post("/", ctrl.create);
// router.put("/:id", ctrl.updateById);
// router.get("/", ctrl.getAll);
// router.get("/:id", ctrl.getById);

module.exports = router;
