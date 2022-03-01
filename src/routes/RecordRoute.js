const router = require('express').Router();

const recordController = require(__app.__controllers.RecordController);
const recordValidator = require(__app.__middlewares.RecordValidator);


router.post('/getRecords/', recordValidator.validateUserInputs() , recordController.findRecords);


module.exports = router;