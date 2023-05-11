import Joi from 'joi';

const name = Joi.string();

export const login = Joi.object({
    name: name.required()
});