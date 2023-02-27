import { z, parseEnv, port } from "znv";

export const Env = parseEnv(process.env, {
  PORT: port().default(8080),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  SESSION_SECRET: z.string(),
});
