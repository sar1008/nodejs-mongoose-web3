import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();

const envValidate = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    APP_NAME: Joi.string().default("Custodial Wallet Backend APIs Application"),
    HOST: Joi.string(),
    PORT: Joi.number().required(),

    DATABASE_URI: Joi.string().required(),

    JWT_SECRET: Joi.string().required(),
    JWT_ACCESS_TOKEN_EXPIRATION_MINUTES: Joi.number()
      .allow("")
      .empty("")
      .default(240),

    REFRESH_TOKEN_EXPIRATION_DAYS: Joi.number().allow("").empty("").default(1),
    VERIFY_EMAIL_TOKEN_EXPIRATION_MINUTES: Joi.number()
      .allow("")
      .empty("")
      .default(60),
    RESET_PASSWORD_TOKEN_EXPIRATION_MINUTES: Joi.number()
      .allow("")
      .empty("")
      .default(30),

    FRONTEND_URL: Joi.string()
      .allow("")
      .empty("")
      .default("http://localhost:777"),

    NETWORK_ID: Joi.number().required(),
    INFURA_ID: Joi.string().required(),
  })
  .unknown();

const { value: env, error } = envValidate
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config env error: ${error.message}`);
}

export default {
  NODE_ENV: env.NODE_ENV,
  APP_NAME: env.APP_NAME,
  HOST: env.HOST,
  PORT: env.PORT,

  DATABASE_URI: env.DATABASE_URI,
  DATABASE_OPTIONS: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    w: "majority",
  },

  JWT_SECRET: env.JWT_SECRET,

  JWT_ACCESS_TOKEN_EXPIRATION_MINUTES: env.JWT_ACCESS_TOKEN_EXPIRATION_MINUTES,

  FRONTEND_URL: env.FRONTEND_URL,

  NETWORK_ID: env.NETWORK_ID,
  INFURA_ID: env.INFURA_ID,
};
