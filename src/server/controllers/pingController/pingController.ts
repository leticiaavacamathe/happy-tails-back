import { type NextFunction, type Request, type Response } from "express";

const pingController = (req: Request, res: Response, _next: NextFunction) => {
  res.status(200).json({ message: "pong 🏓" });
};

export default pingController;
