import moment from "moment";
import config from "../config/config.js";
import APIError from "../utils/apiError.js";
import User from "../models/userModel.js";
import Token from "../models/tokenModel.js";
import httpStatus from "http-status";
import crypto from "crypto";
import jwtService from "./jwtService.js";

export const generateRandomToken = async (tokenType, length = 66) => {
    let randomToken = crypto.randomBytes(length).toString("base64");
    return randomToken;
  
};

export const verifyToken = async (token, type) => {
  const tokenDoc = await Token.findOne({ token, type, blacklisted: false });
  if (!tokenDoc) {
    throw new APIError("Token not found", httpStatus.UNAUTHORIZED);
  }

  if (moment(tokenDoc.expiresAt).format() < moment().format()) {
    throw new APIError("Token has expired", httpStatus.UNAUTHORIZED);
  }
  return tokenDoc;
};

export const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(
    config.JWT_ACCESS_TOKEN_EXPIRATION_MINUTES,
    "minutes"
  );
  const accessToken = await jwtService.sign(
    user.id,
    accessTokenExpires,
    config.JWT_SECRET
  );

  const refreshTokenExpires = moment().add(
    config.REFRESH_TOKEN_EXPIRATION_DAYS,
    "days"
  );

  const refreshToken = await generateRandomToken();
  await Token.saveToken(
    refreshToken,
    user.id,
    refreshTokenExpires.format(),
    config.TOKEN_TYPES.REFRESH
  );


  return {
    accessToken: {
      token: accessToken,
      expires: accessTokenExpires.format(),
    },
    refreshToken: {
      token: refreshToken,
      expires: refreshTokenExpires.format(),
    },
  };
};


export default {
  generateRandomToken,
  generateAuthTokens,
  verifyToken,
};