import { Router } from "express";
import erc20Controller from "../controllers/erc20Controller.js";
import erc20Validation from "../validations/erc20Validation.js";
import catchAsync from "../utils/catchAsync.js";
import validate from "../middlewares/validate.js";
import authenticate from "../middlewares/authenticate.js";

const router = Router();

router.post(
  "/mint",
  authenticate(),
  validate(erc20Validation.amount),
  catchAsync(erc20Controller.mint)
);

router.post(
  "/transfer",
  authenticate(),
  validate(erc20Validation.transfer),
  catchAsync(erc20Controller.transfer)
);

export default router;
