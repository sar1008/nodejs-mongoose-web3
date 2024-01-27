import User from "../models/userModel.js";
import walletService from "../services/walletService.js";
import { tokenContractABI, tokenContractAddress } from "../utils/contract.js";
import { ethers } from "ethers";
import config from "../config/config.js";

const mint = async (req, res) => {
  const userId = req.user.id;
  const { amount } = req.body;
  try {
    const user = await User.findById(userId).populate("wallets");
    const wallet = user.wallets[0];

    const provider = new ethers.InfuraWebSocketProvider(
      config.NETWORK_ID,
      config.INFURA_ID
    );

    const privateKey = await walletService.decryptPrivateKey(wallet.privateKey);

    const ethWallet = new ethers.Wallet(privateKey, provider);

    const tokenContract = new ethers.Contract(
      tokenContractAddress,
      tokenContractABI,
      ethWallet
    );

    const tx = await tokenContract.mint(wallet.publicKey, amount);

    await tx.wait();

    res.json({
      success: true,
      data: {
        transactionHash: tx.hash,
      },
    });
  } catch (error) {
    console.error("Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const transfer = async (req, res) => {
  const userId = req.user.id;
  const { amount } = req.body;
  try {
    const user = await User.findById(userId).populate("wallets");
    const sender = user.wallets[0];
    const receiver = user.wallets[1];

    const provider = new ethers.InfuraWebSocketProvider(
      11155111,
      "38852c917e5040b9ab5010d8bfc872a2"
    );

    const senderPrivateKey = await walletService.decryptPrivateKey(
      sender.privateKey
    );
    const receiverPrivateKey = await walletService.decryptPrivateKey(
      receiver.privateKey
    );

    const senderWallet = new ethers.Wallet(senderPrivateKey, provider);
    new ethers.Wallet(receiverPrivateKey, provider);

    const tokenContract = new ethers.Contract(
      tokenContractAddress,
      tokenContractABI,
      senderWallet
    );

    const tx = await tokenContract.transfer(receiver.publicKey, amount);

    await tx.wait();

    res.json({
      success: true,
      data: {
        transactionHash: tx.hash,
      },
    });
  } catch (error) {
    console.error("Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default { mint, transfer };
