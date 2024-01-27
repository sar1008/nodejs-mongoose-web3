import Joi from "joi";

export const signUp = {
  body: Joi.object().keys({
    firstName: Joi.string().trim().min(2).max(66).required(),
    lastName: Joi.string().trim().min(2).max(66).required(),
    userName: Joi.string().alphanum().min(6).max(66).required(),
    email: Joi.string().email().required(),
    password: Joi.string().trim().min(6).max(666).required(),
  }),
};

export const signIn = {
  body: Joi.object().keys({
    userName: Joi.string().required(),
    password: Joi.string().required(),
  }),
};


export const signOut = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

export default {
  signUp,
  signIn,
  signOut,
};