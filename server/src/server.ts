import http from "http";
import express, { Express, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import echoRoutes from "./routes/echo.route";
import * as dotenv from "dotenv";

dotenv.config();

const router: Express = express();
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 8000;

router.use(morgan("dev")); // Logging
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "origin, X-Requested-With,Content-Type,Accept, Authorization");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
    return res.status(200).json({});
  }

  next();
});

router.use("/echo", echoRoutes);

router.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message
  });
});

httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));

export default router;
