import httpStatus from "http-status";
import User from "../models/userModel.js";
import Wallet from "../models/walletModel.js";
import walletService from "../services/walletService.js";

const addWallet = async (req, res) => {
  const user = req.user;
  try {
    const { publicKey, privateKey } =
      await walletService.generateEthereumWallet();
    const wallet = await Wallet.createWallet(user.id, publicKey, privateKey);
    await User.findByIdAndUpdate(req.user._id, {
      $push: { wallets: wallet._id },
    });

    return res.json({
      success: true,
      data: {
        user,
        wallet,
      },
    });
  } catch (error) {
    console.error("error", error.message);

    return res.status(httpStatus[500]).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getWallets = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("wallets");
    let privateKeys = [];
    await user.wallets.map(async (wallet) => {
      let privateKey = await walletService.decryptPrivateKey(wallet.privateKey);
      privateKeys.push(privateKey);
    });
    return res.json({
      success: true,
      data: {
        privateKeys,
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

export default { addWallet, getWallets };
