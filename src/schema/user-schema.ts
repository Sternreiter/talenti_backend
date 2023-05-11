import Joi from 'joi';

const email = Joi.string().email({ tlds: { allow: false } });
const password = Joi.string().alphanum().min(8).max(16).required();
const name = Joi.string();

export const login = Joi.object({
    email: email.required(),
    password: password.required()
});

export const register = Joi.object({
    email: email.required(),
    password: password.required(),
    name: name.required()
});