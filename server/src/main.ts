import "reflect-metadata";
import express, { Application } from "express";
import { Action, useContainer, useExpressServer } from "routing-controllers";
import Container from "typedi";
import { ArticleController } from "./controllers/article.controller";
import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";
import session from "express-session";
import config from "config";
import { AuthController } from "./controllers/auth.controller";
import cors from "cors";
import { CacheService } from "./cache/cache";
import connectRedis from "connect-redis";
import "reflect-metadata";

useContainer(Container);

const RedisStore = connectRedis(session);

function setupMiddlewares(app: Application) {
  app.use(
    session({
      secret: config.get("auth.secret"),
      resave: true,
      saveUninitialized: false,
      // store session in redis store
      store: new RedisStore({ client: CacheService.getInstance().client }),
      cookie: {
        secure: false,
        httpOnly: true,
      },
      unset: "destroy",
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
}

function setupPassportAuth(app: Application) {
  passport.use(
    new GithubStrategy(
      {
        callbackURL: config.get("auth.github.callbackURL"),
        clientID: config.get("auth.github.clientID"),
        clientSecret: config.get("auth.github.clientSecret"),
      },
      function (
        accessToken: string,
        refreshToken: string,
        profile: string,
        done: Function
      ) {
        process.nextTick(function () {
          // To keep the example simple, the user's GitHub profile is returned to
          // represent the logged-in user.  In a typical application, you would want
          // to associate the GitHub account with a user record in your database,
          // and return that user instead.
          return done(null, profile);
        });
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: any, done) => {
    done(null, user.id);
  });
}

function setupPassportAuthRoutes(app: Application) {
  app.get(
    "/authenticate",
    passport.authenticate("github", {
      failureRedirect: "/auth/login",
    })
  );

  app.get(
    "/redirect",
    passport.authenticate("github", {
      successRedirect: config.get("webUrl") as string,
      failureRedirect: config.get("webUrl") + "/auth/login",
      failureFlash: true,
      failureMessage: "Not Authenticated",
    })
  );
}

async function setupCache() {
  await CacheService.getInstance().connect();
  console.log("connected to redis cache");
}

async function main() {
  const app = express();
  await setupCache();
  app.use(
    cors({
      origin: "http://localhost:3000",
      allowedHeaders: "",
      credentials: true,
    })
  );
  setupMiddlewares(app);
  setupPassportAuth(app);
  setupPassportAuthRoutes(app);
  useExpressServer(app, {
    authorizationChecker: async (action: Action, roles: string[]) => {
      const isAuthenticated = action.request.isAuthenticated();
      return isAuthenticated;
    },
    controllers: [ArticleController, AuthController],
  });
  app.listen(3001, () => {
    console.log("Server started");
  });
}

main();
