require("dotenv").config();

const ensureEnv = (...envs: string[]) => {
  if (process.env.NODE_ENV?.toLowerCase() === "production")
    envs.forEach((env) => {
      const eVar = process.env[env];
      if (!eVar) throw new Error(`Environment variable ${env} missing!`);
    });
};
ensureEnv("TOKEN", "CLIENT_ID");

const conf = {
  token: process.env.TOKEN || "sample",
  client_id: process.env.CLIENT_ID || "1234",
};
export default conf;
