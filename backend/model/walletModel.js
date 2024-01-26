import httpStatus from "http-status";
import mongoose from "mongoose";
import config from "../config/config.js";
import APIError from "..//utils/apiError.js";

const tokenSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    publicKey: {
      type: String,
      required: true,
    },
    privateKey: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

class TokenClass {
  static async saveToken(token, userId, expires, type, blacklisted = false) {
    const tokenDoc = await this.create({
      user: userId,
      token,
      type,
      expiresAt: expires,
      blacklisted,
    });
    return tokenDoc;
  }

  static async revokeToken(token, type) {
    const tokenDoc = await this.findOne({ token, type, blacklisted: false });
    if (!tokenDoc) {
      throw new APIError("token not found", httpStatus.NOT_FOUND);
    }

    await tokenDoc.deleteOne();
  }
}

tokenSchema.loadClass(TokenClass);

const Token = mongoose.model("tokens", tokenSchema);

export default Token;
