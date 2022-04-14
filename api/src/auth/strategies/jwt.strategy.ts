import config from "config";
import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { AuthJwtPayload, AuthUser } from "../types";

const accessTokenSecret: string = config.get("jwt.accessTokenSecret");

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: accessTokenSecret,
    });
  }

  async validate(payload: AuthJwtPayload): Promise<AuthUser> {
    return { id: payload.id };
  }
}
