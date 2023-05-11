import Joi from 'joi';

const address = Joi.string();
const description = Joi.string();
const name = Joi.string();
const opening = Joi.string();
const closing = Joi.string();
const statusId = Joi.number();

export const register_supermarket = Joi.object({
    address: address.required(),
    description: description.required(),
    name: name.required(),
    opening: opening.required(),
    closing: closing.required(),
    statusId: statusId.required()
});