import { Request, Response } from "express";
import {
  Authorized,
  Controller,
  Get,
  Post,
  Redirect,
  Req,
  Res,
} from "routing-controllers";
import { Service } from "typedi";
import config from "config";
import passport from "passport";

@Service()
@Controller("/auth")
export class AuthController {
  @Post("/logout")
  async handleLogout(@Req() request: Request) {
    request.logout();
    await new Promise((resolve, reject) =>
      request.session.destroy((e) => {
        if (e) reject(e);
        resolve(true);
      })
    );
    return true;
  }

  @Get("/callback")
  handleCallback(@Req() request: Request, @Res() response: Response) {}

  @Get("/profile")
  @Authorized()
  getProfile(@Req() request: Request) {
    return request.user;
  }
}
