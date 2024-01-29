import http from "http";
import express, { Express, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import echoRoutes from "./routes/echo.route";
import * as dotenv from "dotenv";
import { Server, Socket } from "socket.io";
import { anonymousAnimals, generateId, getRandomElement } from "./utils/stringHelpers";
import axios from "axios";

dotenv.config();

const router: Express = express();
const httpServer = http.createServer(router);
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});
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

const users: any = {};

io.on("connection", (socket: Socket) => {
  socket.on("joined", () => {
    console.log(`Someone joined: ${socket.id}`);

    const welcomeData = {
      userId: generateId(),
      name: `Anonymous ${getRandomElement(anonymousAnimals)}`,
      code: `class Solution:
    def main():
        pass
`
    };

    const currentUsers: any[] = Object.values(users);
    socket.emit("current users", currentUsers);

    users[socket.id] = welcomeData;

    socket.emit("welcome", welcomeData);

    socket.broadcast.emit("user joined", welcomeData);
  });

  socket.on("disconnect", () => {
    console.log(`Someone left: ${socket.id}`);

    const userData = users[socket.id];

    io.emit("user left", userData);

    delete users[socket.id];
  });

  socket.on("code change", (codeChange) => {
    const user = users[socket.id];
    users[socket.id].code = codeChange;

    io.emit("code update", { userId: user.userId, name: user.name, code: codeChange });
  });

  socket.on("sent chat message", (message) => {
    const user = users[socket.id];

    io.emit("chat message", { user: user.name, message });
  });

  socket.on("compile", async () => {
    const user = users[socket.id];
    const requester = user.name;
    const code = user.code;

    const response = await axios.post("https://godbolt.org/api/compiler/python312/compile", {"source":code,"compiler":"python312","options":{"userArguments":"","executeParameters":{"args":"","stdin":"","runtimeTools":[]},"compilerOptions":{"executorRequest":true,"skipAsm":true,"overrides":[]},"filters":{"execute":true},"tools":[],"libraries":[]},"lang":"python","files":[],"allowStoreCodeDebug":true});
    const data = response.data;

    const output = data.stdout.map((obj: any) => obj.text).join('\n');
    const errorMessage = data.stderr.map((obj: any) => obj.text).join('\n');
    
    io.emit("compile results", `${requester} just compiled.\nStdOut: ${output}\nStdErr: ${errorMessage}`)
  });
});

httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));

export default router;
