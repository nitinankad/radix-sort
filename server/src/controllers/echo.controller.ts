import { Request, Response, NextFunction } from "express";

export const getEchoMessage = async (req: Request, res: Response, next: NextFunction) => {
  let message: String = "radixsort.io";

  return res.status(200).json({
    message: message
  });
};
