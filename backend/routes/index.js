import { Router } from "express";
import authRoute from "./authRoute.js";
import walletRoute from "./walletRoute.js";
import erc20Route from "./erc20Route.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/wallet", walletRoute);
router.use("/erc20", erc20Route);

export default router;
