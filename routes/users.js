var express = require('express');
const {getAllUsers, removeUser, updateUser} = require("../services/User");
const {removeUserValidator} = require("../validators/removeUserValidator");
const {updateUserValidator} = require("../validators/updateUserValidator");
const roleMiddleware = require("../middleware/roleMiddleware");

var router = express.Router();


router.get('/', function(req, res, next) {
  res.send({error:true, message:"not authorized..."});
});

router.get('/all',async function(req, res, next) {

  return res.send(await getAllUsers(req.user) )

});

router.patch('/update',
    updateUserValidator(),
    roleMiddleware,
    async function(req, res, next) {

  return res.send(await updateUser(req.body) )

});

router.post('/remove',
    removeUserValidator(),
    roleMiddleware,
    async function(req, res, next) {

  return res.send(await removeUser(req.body) )

});



module.exports = router;
