import express, { NextFunction, Request, Response } from "express";
import { Server } from "node:http";
import { AddressInfo } from "node:net";
import process from "node:process";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const app = express();

// Request middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.head("/", (req: Request, res: Response): void => {
  res.send();
});

app.get("/", (req: Request, res: Response): void => {
  res.send("ok");
});

app.get("/hello", (req: Request, res: Response): void => {
  res.send("Hello!");
});

app.head("/api", (_: Request, res: Response): void => {
  res.send();
});

app.get("/api/hello", (_: Request, res: Response): void => {
  res.send({
    ok: true,
    message: "Hello World!",
  });
});

// Error middleware
app.use((req: Request, res: Response, next: NextFunction): void => {
  res.statusCode = 404;
  throw new Error("Not found");
});

app.use((error: any, req: Request, res: Response, next: NextFunction): void => {
  if (res.headersSent) {
    console.log("headers already sent");
    return next(error);
  }
  const status = error.status || error.statusCode || 404;
  const errorMsg = error.message || String(error);
  console.error("error:", req.method, req.url, error.message || String(error));
  let result = errorMsg;
  if (req.url.startsWith("/api")) {
    res.contentType("application/json");
    result = JSON.stringify({
      ok: false,
      error: errorMsg,
    });
  }
  res.status(status).send(result);
});

let server: Server;
export async function start(port: number | string): Promise<Server> {
  return new Promise((resolve) => {
    server = app
      .listen(port, () => {
        let address = server.address() as AddressInfo;
        console.log(`Listening on http://localhost:${address.port}`);
        ["SIGTERM", "SIGINT"].forEach((signal): void => {
          process.on(signal, stop);
        });
        resolve(server);
      })
      .on("close", () => {
        console.log("Server connection closed");
      })
      .on("error", async (error) => {
        await stop(error);
      });
  });
}
export async function stop(signal?: string | Error): Promise<void> {
  if (signal instanceof Error) {
    process.exitCode = 1;
    console.error(`error: ${signal.message}`);
    console.log("stop (error)");
  } else {
    if (signal) {
      console.log(`stop (${signal})`);
    } else {
      console.log("stop");
    }
  }
  if (server) {
    try {
      await new Promise<void>((resolve, reject) => {
        server.close((err) => {
          err ? reject(err) : resolve();
        });
      });
    } catch (error: any) {
      process.exitCode = 1;
      console.error(error.message);
    }
  }
  console.log("Server stopped");
}
