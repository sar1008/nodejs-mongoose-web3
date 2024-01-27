import { Wallet } from "ethers";
import  pkg from "crypto-js";

const {AES, enc} = pkg;

const ENCRYPTION_KEY =
  "7esCM91Qiyd20+mlZhadWVaeJcd0IsHUGCtg4t0Iz6x2PYZrdmTsqtba0ScgaC/y";

const generateEthereumWallet = async () => {
  try {
    const wallet = Wallet.createRandom();
    let privateKeyEncrypt = await encryptPrivateKey(wallet.privateKey);
    console.log(wallet.address, privateKeyEncrypt);

    return {
      publicKey: wallet.address,
      privateKey: privateKeyEncrypt,
    };
  } catch (error) {
    throw new Error("error", error);
  }
};

const encryptPrivateKey = async (privateKey) => {
  try {
    const encrypted = AES.encrypt(
      privateKey,
      ENCRYPTION_KEY
    ).toString();
    return encrypted;
  } catch (error) {
    throw new Error("error", error);
  }
};

const decryptPrivateKey = async (encryptedPrivateKey) => {
  
    const decrypted = AES.decrypt(
      encryptedPrivateKey,
      ENCRYPTION_KEY
    ).toString(enc.Utf8);
    console.log("decrypted", decrypted)
    return decrypted;
 
};

export default {
  generateEthereumWallet,
  encryptPrivateKey,
  decryptPrivateKey,
};
