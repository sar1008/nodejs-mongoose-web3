import { Router } from "express";
import authController from "../controllers/authController.js";
import authValidation from "../validations/authValidation.js";
import catchAsync from "../utils/catchAsync.js";
import validate from "../middlewares/validate.js";
const router = Router();

router.post(
  "/signup",
  validate(authValidation.signUp),
  catchAsync(authController.signUp)
);

router.post(
  "/signin",
  validate(authValidation.signIn),
  catchAsync(authController.signIn)
);

router.post(
  "/signout",
  validate(authValidation.signOut),
  catchAsync(authController.signOut)
);

// router.get("/current", authenticate(), catchAsync(authController.current));

// router.get("/me", authenticate(), catchAsync(authController.getMe));

// router.put(
//   "/me",
//   authenticate(),
//   validate(authValidation.updateMe),
//   catchAsync(authController.updateMe)
// );


export default router;