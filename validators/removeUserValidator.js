const {body} = require("express-validator");


const removeUserValidator = () => {


    return  [
        body('userId' )
            .notEmpty()
            .withMessage('userId alanı zorunludur')
            .isNumeric()
            .withMessage('userId geçerli bir id olmalıdır')

    ]


}


module.exports = {removeUserValidator}
