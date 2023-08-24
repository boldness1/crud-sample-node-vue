const {body} = require("express-validator");


const registerValidator = () => {


    return  [
        body('firstname' )
            .notEmpty()
            .withMessage('Ad alanı zorunludur'),
        body('lastname' )
            .notEmpty()
            .withMessage('Soy ad alanı zorunludur'),
        body('email' )
            .isEmail()
            .withMessage('Geçerli bir e-posta adresi giriniz')
            .notEmpty()
            .withMessage('E-posta alanı zorunludur'),
        body('password')
            .isLength({min: 6})
            .withMessage('Şifre en az 6 karakterden oluşmalıdır')
            .notEmpty()
            .withMessage('Şifre alanı zorunludur')
    ]


}


module.exports = {registerValidator}
