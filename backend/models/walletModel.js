import httpStatus from "http-status";
import mongoose from "mongoose";
import config from "../config/config.js";
import APIError from "../utils/apiError.js";

const walletSchema = mongoose.Schema(
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

class WalletClass {
  static async createWallet(userId, publicKey, privateKey) {
    const walletDoc = await this.create({
      user: userId,
      publicKey,
      privateKey,
    });
    return walletDoc;
  }
}

walletSchema.loadClass(WalletClass);

const Wallet = mongoose.model("Wallet", walletSchema);

export default Wallet;
