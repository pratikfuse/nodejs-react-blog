import { Request, Response } from "express";
import {
  Authorized,
  Controller,
  Get,
  Redirect,
  Req,
} from "routing-controllers";
import { Service } from "typedi";
import config from "config";

@Service()
@Controller("/auth")
export class AuthController {
  @Get("/logout")
  @Redirect(config.get("webUrl"))
  async handleLogout(@Req() request: Request) {
    request.logout();
    await new Promise((resolve, reject) =>
      request.session.destroy((e) => {
        if (e) reject(e);
        resolve(true);
      })
    );
  }

  @Get("/profile")
  @Authorized()
  getProfile(@Req() request: Request) {
    return request.user;
  }
}
