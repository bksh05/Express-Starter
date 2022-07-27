import { Request, Response, Router } from "express";
import { createUser, getLoginCredentialByEmailId } from "../../database";
import { constants } from "../../utils/constant";
import {
  generatePassword,
  getServerResponse,
  issueJWT,
  sendMail,
  validatePassword,
} from "../../utils/helpers";
import passport from "passport";
import crypto from "crypto";
import {
  changePassword,
  isExistingUser,
  saveOTP,
  validateOTP,
} from "../../database/user/user.database";
import { logger } from "../../utils/logger";

/**
 * @param request
 * @param response
 * A function to register a user.
 */
async function registerUser(request: Request, response: Response) {
  try {
    if (!request.body.email || !request.body.name || !request.body.password) {
      // Check if every input required is available
      const serverResponse = getServerResponse(false, {}, constants.BAD_REQUEST);

      logger.info(serverResponse);
      return response.status(constants.BAD_REQUEST.code).send(serverResponse);
    }

    const saltHash = generatePassword(request.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    const user = await getLoginCredentialByEmailId(request.body.email);

    if (user) {
      // New user with same email cannot be created
      const serverResponse = getServerResponse(false, {}, constants.USER_ALREADY_EXIST);

      logger.info(serverResponse);

      return response.status(constants.USER_ALREADY_EXIST.code).send(serverResponse);
    }

    const userId = await createUser({
      email: request.body.email,
      name: request.body.name,
      salt: salt,
      hash: hash,
      image: request.body.image ?? "image.png",
    });
    const token = issueJWT(userId);
    const serverResponse = getServerResponse(true, {
      token: token.token,
      expires: token.expires,
    });

    logger.info(serverResponse);

    return response.send(serverResponse);
  } catch (error) {
    logger.error(error);
    const serverResponse = getServerResponse(false, {}, constants.INTERNAL_SERVER_ERROR);
    return response.status(constants.INTERNAL_SERVER_ERROR.code).send(serverResponse);
  }
}

/**
 * @param request
 * @param response
 * User Login API
 */
async function login(request: Request, response: Response) {
  const username = request.body.username;
  const password = request.body.password;

  try {
    if (!username || !password) {
      const serverResponse = getServerResponse(false, {}, constants.BAD_REQUEST);

      logger.info(serverResponse);

      return response.status(constants.BAD_REQUEST.code).send(serverResponse);
    }

    const user = await getLoginCredentialByEmailId(username);

    if (!user || !validatePassword(password, user.hash, user.salt)) {
      const serverResponse = getServerResponse(false, {}, constants.INVALID_CREDENTIALS);

      logger.info(serverResponse);

      return response.status(constants.INVALID_CREDENTIALS.code).send(serverResponse);
    }

    const token = issueJWT(user._id);
    const serverResponse = getServerResponse(true, {
      token: token.token,
      expires: token.expires,
    });

    logger.info(serverResponse);

    return response.send(serverResponse);
  } catch (error) {
    logger.error(error);
    const serverResponse = getServerResponse(false, {}, constants.INTERNAL_SERVER_ERROR);
    return response.status(constants.INTERNAL_SERVER_ERROR.code).send(serverResponse);
  }
}

async function sendOTP(request: Request, response: Response) {
  try {
    let otp = "";
    let email = request.body.email;

    if (!email || !(await isExistingUser(email))) {
      const serverResponse = getServerResponse(false, {}, constants.UNREGISTERED_USER);

      logger.info(serverResponse);

      return response.status(constants.UNREGISTERED_USER.code).send(serverResponse);
    }

    for (let i = 0; i < constants.OTP_LENGTH; i++) {
      otp += crypto.randomInt(10);
    }

    const isOtpSaved = await saveOTP(email, otp);

    if (!isOtpSaved) {
      const serverResponse = getServerResponse(true, {
        message: "OTP already sent. Try after 1 minute",
      });
      logger.info(serverResponse);
      return response.send(serverResponse);
    }

    const isMailSent = await sendMail(
      email,
      "Otp for reset password",
      `Your otp for reset password is : ${otp}`
    );

    if (!isMailSent) {
      throw new Error("Email not sent");
    }

    console.log(otp);

    const serverResponse = getServerResponse(true, {
      message: "OTP sent to your email.",
    });

    logger.info(serverResponse);
    return response.send(serverResponse);
  } catch (error) {
    logger.error(error);
    const serverResponse = getServerResponse(false, {}, constants.INTERNAL_SERVER_ERROR);
    return response.status(constants.INTERNAL_SERVER_ERROR.code).send(serverResponse);
  }
}

async function resetPassword(request: Request, response: Response) {
  const email = request.body.email;
  const otp = request.body.otp;
  const newPassword = request.body.password;

  if (!email || !otp || !newPassword) {
    const serverResponse = getServerResponse(false, {}, constants.BAD_REQUEST);
    logger.info(serverResponse);
    return response.status(constants.BAD_REQUEST.code).send(serverResponse);
  }

  try {
    if (!(await isExistingUser(email))) {
      const serverResponse = getServerResponse(false, {}, constants.UNREGISTERED_USER);
      logger.info(serverResponse);
      return response.status(constants.UNREGISTERED_USER.code).send(serverResponse);
    }

    if (!(await validateOTP(email, otp))) {
      const serverResponse = getServerResponse(true, {
        message: "Incorrect otp",
      });
      logger.info(serverResponse);
      return response.send(serverResponse);
    }

    const saltHash = generatePassword(newPassword);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    if (!(await changePassword(email, salt, hash))) {
      const serverResponse = getServerResponse(false, {}, constants.PASSWORD_CHANGE_FAILED);
      logger.info(serverResponse);
      return response.status(constants.PASSWORD_CHANGE_FAILED.code).send(serverResponse);
    }

    const serverResponse = getServerResponse(true, {
      message: "Password changed successfully",
    });
    logger.info(serverResponse);
    return response.send(serverResponse);
  } catch (error) {
    logger.error(error);
    const serverResponse = getServerResponse(false, {}, constants.INTERNAL_SERVER_ERROR);
    return response.status(constants.INTERNAL_SERVER_ERROR.code).send(serverResponse);
  }
}

async function updatePassword(request: Request, response: Response) {
  const loggedInUser: any = request.user;

  if (!loggedInUser) {
    const serverResponse = getServerResponse(false, {}, constants.UNAUTHORIZED);
    logger.info(serverResponse);
    return response.status(constants.UNAUTHORIZED.code).send(serverResponse);
  }

  const oldPassword = request.body.oldPassword;

  if (!oldPassword || !validatePassword(oldPassword, loggedInUser.hash, loggedInUser.salt)) {
    const serverResponse = getServerResponse(false, {}, constants.INVALID_CREDENTIALS);
    logger.info(serverResponse);
    return response.status(constants.INVALID_CREDENTIALS.code).send(serverResponse);
  }

  const newPassword = request.body.password;

  if (!newPassword) {
    const serverResponse = getServerResponse(false, {}, constants.BAD_REQUEST);
    logger.info(serverResponse);
    return response.status(constants.BAD_REQUEST.code).send(serverResponse);
  }

  try {
    const saltHash = generatePassword(newPassword);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    if (!(await changePassword(loggedInUser.email, salt, hash))) {
      const serverResponse = getServerResponse(false, {}, constants.PASSWORD_CHANGE_FAILED);
      logger.info(serverResponse);
      return response.status(constants.PASSWORD_CHANGE_FAILED.code).send(serverResponse);
    }

    const serverResponse = getServerResponse(true, {
      message: "Password updated successfully",
    });
    logger.info(serverResponse);
    return response.send(serverResponse);
  } catch (error) {
    logger.error(error);
    const serverResponse = getServerResponse(false, {}, constants.INTERNAL_SERVER_ERROR);
    return response.status(constants.INTERNAL_SERVER_ERROR.code).send(serverResponse);
  }
}

export function initRoutes(router: Router): any {
  router.route("/login").post(login);
  router.route("/register").post(registerUser);
  router.route("/generate-otp").post(sendOTP);
  router.route("/reset-password").post(resetPassword);

  // Authenticated route
  router
    .route("/update-password")
    .post(passport.authenticate("jwt", { session: false }), updatePassword);
  return router;
}
