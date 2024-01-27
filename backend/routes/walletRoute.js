import { Router } from "express";
import walletController from "../controllers/walletController.js";
import catchAsync from "../utils/catchAsync.js";
import authenticate from "../middlewares/authenticate.js";

const router = Router();

router.get(
    "/get-wallets",
    authenticate(),
    catchAsync(walletController.getWallets)
  );

router.post(
  "/add-wallet",
  authenticate(),
  catchAsync(walletController.addWallet)
);

export default router;