import express, { Application } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

class App {
  private app: Application;
  private http: http.Server;
  private io: Server;
  constructor() {
    this.app = express();
    this.http = http.createServer(this.app);
    this.app.use(cors());
    this.io = new Server(this.http, {
      cors: {
        origin: "http://localhost:3000/",
        methods: ["GET", "POST"],
      },
    });

    this.socketListens();
  }
  boostrap() {
    this.http.listen(8000, () => {
      console.log("Server is running!");
    });
  }

  socketListens() {
    this.io.on("connection", (socket) => {
      socket.on("message", (msg) => {
        this.io.emit("message", msg);
      });
    });
  }
}

const app = new App();

app.boostrap();
