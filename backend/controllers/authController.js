import APIError from "../utils/apiError.js";
import httpStatus from "http-status";
import config from "../config/config.js";
import User from "../models/userModel.js";
import Token from "../models/tokenModel.js";
import Wallet from "../models/walletModel.js";
import tokenService from "../services/tokenService.js";
import walletService from "../services/walletService.js";

const signUp = async (req, res) => {
  try {
    const user = await User.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    const { publicKey, privateKey } =
      await walletService.generateEthereumWallet();
    const wallet = await Wallet.createWallet(user.id, publicKey, privateKey);
    await User.findByIdAndUpdate(user._id, { $push: { wallets: wallet._id } });

    return res.json({
      success: true,
      data: {
        user,
        tokens,
        wallet,
      },
    });
  } catch (error) {
    console.error("error", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const signIn = async (req, res) => {
  try {
    const user = await User.getUserByUserName(req.body.userName);
    if (!user || !(await user.isPasswordMatch(req.body.password))) {
      throw new APIError(
        "Incorrect username or password",
        httpStatus.BAD_REQUEST
      );
    }

    const tokens = await tokenService.generateAuthTokens(user);

    return res.json({
      success: true,
      data: { user, tokens },
    });
  } catch (error) {
    console.error("error", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const signOut = async (req, res) => {
  try {
    await Token.revokeToken(req.body.refreshToken, config.TOKEN_TYPES.REFRESH);

    return res.json({
      success: true,
      data: "Signout success",
    });
  } catch (error) {
    console.error("error", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default {
  signUp,
  signIn,
  signOut,
};
