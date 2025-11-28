import express from "express";
import passport from "passport";
import "../../config/passportGoogle";
import AuthController from "../../controllers/v1/authController";
import { validatorHandler } from "../../middleware/validatorHamdler";
import {
  emailValidateur,
  loginValidateur,
  registerValidateur,
  resetValidateur,
  tokenValidateur,
} from "../../validator/authValidator";
const authRoutes = express.Router();

authRoutes.get("/", (_, res: express.Response) => {
  res.success("Le service d'authentification est en ligne.");
});

authRoutes.post(
  "/register",
  registerValidateur,
  validatorHandler,
  AuthController.register
);

authRoutes.post(
  "/login",
  loginValidateur,
  validatorHandler,
  AuthController.login
);

authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email", "openid"],
    accessType: "offline",
    prompt: "consent",
  })
);

authRoutes.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user, info) => {
    if (err) {
      console.error("Google OAuth Error:", err);
      return res.error("Erreur d'authentification Google", 401, {
        code: err.code,
        message: err.message,
      });
    }
    if (!user) {
      console.error("Authentication failed:", info);
      return res.error("Authentification échouée", 401, info);
    }
    req.user = user;
    return AuthController.loginWithOAuth(req, res);
  })(req, res, next);
});

authRoutes.post(
  "/validate",
  tokenValidateur,
  validatorHandler,
  AuthController.validate
);

authRoutes.post(
  "/message/validate",
  emailValidateur,
  validatorHandler,
  AuthController.validateMessage
);

authRoutes.post(
  "/reset",
  resetValidateur,
  validatorHandler,
  AuthController.reset
);

authRoutes.post(
  "/message/reset",
  emailValidateur,
  validatorHandler,
  AuthController.resetMessage
);

export default authRoutes;
