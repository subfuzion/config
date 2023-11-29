import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { Server } from "node:http";

import { start, stop } from "../src/app.js";

const port = process.env["PORT"] || "0";
let server: Server;

beforeAll(async () => {
  server = await start(port);
});

afterAll(async () => {
  if (server) {
    await stop();
  }
});

describe("integration tests", () => {
  test("test", async () => {
    expect(true).toBe(true);
  });
});
