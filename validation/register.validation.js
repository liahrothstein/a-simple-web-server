import { check } from "express-validator";

export const registerValidation = [
    check('password', 'Invalid password').isLength({ min: 8 }),
    check('phone', 'Invalid phone').isMobilePhone(['be-BY', 'ru-RU']),
    check('email', 'Invalid email').isEmail()
]