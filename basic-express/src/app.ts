import express, { NextFunction, Request, Response } from "express";
import { AddressInfo } from "net";

const app = express();
const port = process.env["PORT"] || "8080";

// Encoding middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.head("/", (req: Request, res: Response): void => {
  res.send();
});

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello World!");
});

app.head("/api/hello", (_: Request, res: Response): void => {
  res.send();
});

app.get("/api/hello", (_: Request, res: Response): void => {
  res.send({
    ok: true,
    message: "Hello World!",
  });
});

// Unhandled routes
app.use((req: Request, res: Response, next: NextFunction): void => {
  const error = new Error("Not Found");
  next(error);
});

// Error middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(req.method, req.url, err.message);
  // Rather than leak server details, just always return a 404 to the client.
  res.status(404);
  next();
});

const server = app.listen(port, (): void => {
  let address = server.address() as AddressInfo;
  console.log(`Listening on http://localhost:${address.port}`);
});

function handleSignal(signal: string): void {
  console.log(`Received ${signal}`);
  process.exit(0);
}

process.on("SIGINT", handleSignal);
["SIGTERM", "SIGINT"].forEach((signal): void => {
  process.on(signal, handleSignal);
});
