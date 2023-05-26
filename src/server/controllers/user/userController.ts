import bcrypt from "bcryptjs";
import { type NextFunction, type Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { type UserCredentialsRequest } from "../../types";
import CustomError from "../../../CustomError/CustomError.js";
import User from "../../../database/models/User.js";

const loginUser = async (
  req: UserCredentialsRequest,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || (await bcrypt.compare(password, user.password))) {
      const customError = new CustomError(401, "Wrong credentials");

      throw customError;
    }

    const tokenPayload: JwtPayload = {
      sub: user._id.toString(),
      name: user.username,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export default loginUser;
