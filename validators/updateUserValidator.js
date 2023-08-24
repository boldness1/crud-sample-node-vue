const {body} = require("express-validator");


const updateUserValidator = () => {


    return  [
        body('id' )
            .notEmpty()
            .withMessage('userId alanı zorunludur')
            .isNumeric()
            .withMessage('userId geçerli bir id olmalıdır'),
        body('email' )
            .isEmail()
            .withMessage('Geçerli bir e-posta adresi giriniz'),
        body('firstname' )
            .isString()
            .withMessage('Ad alanı string olmalıdır'),
        body('lastname' )
            .isString()
            .withMessage('Soy ad alanı string olmalıdır'),
        body('email' )
            .isEmail()
            .withMessage('Geçerli bir e-posta adresi giriniz'),
        body('password')
            .isLength({min: 6})
            .withMessage('Şifre en az 6 karakterden oluşmalıdır')
    ]


}


module.exports = {updateUserValidator}
