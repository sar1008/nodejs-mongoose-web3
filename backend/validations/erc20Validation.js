import Joi from "joi";

export const amount = {
  body: Joi.object().keys({
    amount: Joi.number().required(),
  }),
};

export const transfer = {
  body: Joi.object().keys({
    amount: Joi.number().required()
  }),
};

export default {
  transfer,
  amount
};
