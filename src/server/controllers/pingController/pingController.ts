import { type Request, type Response } from "express";

const pingController = (req: Request, res: Response) => {
  res.status(200).json({ message: "pong 🏓" });
};

export default pingController;
