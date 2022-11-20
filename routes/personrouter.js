const express = require("express");
var router = express.Router();
var personcontroller = require("../controllers/personcontroller");
router.post("/create",personcontroller.create)
router.put("/update/:Id",personcontroller.update)
router.delete("/delete/:Id",personcontroller.delete)
router.get("/users",personcontroller.users)
// router.post("/login",personcontroller.login)
router.post('/login',personcontroller.login)

module.exports = router;
 