const {body} = require("express-validator");


 const loginValidator = () => {


     return  [
         body('email' ).
             isEmail()
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


 module.exports = {loginValidator}
