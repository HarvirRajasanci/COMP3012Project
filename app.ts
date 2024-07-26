import express from "express";
import session from "express-session";
import passport from "./middleware/passport";
import RedisStore from "connect-redis"
import Redis from "ioredis";
const FileStore = require('session-file-store')(session);

require('dotenv').config();
const PORT = process.env.PORT || 8000;
const REDIS_URL = process.env.REDIS_URL!;
const isDev = process.env.NODE_ENV === "dev";

const app = express();

app.set("trust proxy", 1);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  session({
    store: isDev 
    ? new FileStore({})
    : new RedisStore({ client: new Redis(REDIS_URL) }),
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // HTTPS Required
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

import indexRoute from "./routers/indexRoute";
import authRoute from "./routers/authRoute";
import postsRoute from "./routers/postRouters";
import subsRouters from "./routers/subsRouters";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoute);
app.use("/posts", postsRoute);
app.use("/subs", subsRouters);
app.use("/", indexRoute);

app.listen(PORT, () =>
  console.log(`server should be running at http://localhost:${PORT}/`)
);
