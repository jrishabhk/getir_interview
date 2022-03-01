const {body, validationResult, withMessage} = require('express-validator');

module.exports = {
    validateUserInputs : () => {
        return [
            body('data.startDate')
            .exists()
            .withMessage('startDate field is not provided')
            .isDate()
            .withMessage('startDate field is not date')
            .trim(),
            

            body('data.endDate')
            .exists()
            .withMessage('startDate field is not provided')
            .isDate()
            .withMessage('startDate field is not date')
            .trim(),


            body('data.minCount')
            .exists()
            .withMessage('Minimum count field was not provided')
            .isNumeric()
            .withMessage('Minimum count does not contain numbers')
            .trim(),


            body('data.maxCount')
            .exists()
            .withMessage('Maxium count field was not provided')
            .isNumeric()
            .withMessage('Maxium count does not contain numbers')
            .trim(),


            function (req, res, next) {
                const errors = validationResult(req);
                
                if (!errors.isEmpty()) {
                    console.log(errors.array());
                    return res.status(422).json({
                        code : -1,
                        message : errors.array(),
                        records : []
                    });
                }
                else{
                    next();
                } 
            }
        ];
    }

};