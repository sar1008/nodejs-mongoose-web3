import passport from "passport";
import httpStatus from "http-status";
import APIError from "../utils/apiError.js";

function authenticate(...requiredRights) {
  return async (req, res, next) => {
    try {
      await passport.authenticate(
        "jwt",
        { session: false },
        async (err, user, info) => {
          if (err || info || !user) {
            return next(
              new APIError(
                httpStatus[httpStatus.UNAUTHORIZED],
                httpStatus.UNAUTHORIZED
              )
            );
          }

          req.user = user;

          return next();
        }
      )(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

export default authenticate;