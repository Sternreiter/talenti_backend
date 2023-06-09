import Joi from 'joi';

const name = Joi.string();
const description = Joi.string();
const quantity = Joi.number();
const amount = Joi.number();
const expired_at = Joi.string();
const statusId = Joi.number();
const supermarketid = Joi.number();

export const register_product = Joi.object({
    supermarketid: supermarketid.required(),
    name: name.required(),
    description: description.required(),
    quantity: quantity.required(),
    amount: amount.required(),
    expired_at: expired_at.required(),
    statusId: statusId.required()
});