import { destroyCookie, parseCookies, setCookie } from "nookies";
import decodeJWT, { JwtPayload } from "jwt-decode";
import { GetServerSidePropsContext } from "next";

const accessTokenKey = "nextauth.token";
const refreshTokenKey = "nextauth.refreshToken";

export function getAccessToken(ctx?: GetServerSidePropsContext) {
  const cookies = parseCookies(ctx);
  return cookies[accessTokenKey];
}

export function getRefreshToken(ctx?: GetServerSidePropsContext) {
  const cookies = parseCookies(ctx);
  return cookies[refreshTokenKey];
}

export function setAccessToken(token: string, ctx?: GetServerSidePropsContext) {
  setCookie(ctx, accessTokenKey, token, {
    maxAge: 60 * 60 * 24 * 1,
    path: "/",
  });
}

export function setRefreshToken(
  token: string,
  ctx?: GetServerSidePropsContext
) {
  const claims: JwtPayload = decodeJWT(token);
  let maxAge = 60 * 60 * 24 * 1;
  if (claims.exp) {
    const expDate = new Date(claims.exp * 1000);
    maxAge = Math.abs(expDate.getTime() - Date.now()) / 1000;
  }
  setCookie(ctx, refreshTokenKey, token, {
    maxAge,
    path: "/",
  });
}

export function deleteAccessToken(ctx?: GetServerSidePropsContext) {
  destroyCookie(ctx, accessTokenKey);
}

export function deleteRefreshToken(ctx?: GetServerSidePropsContext) {
  destroyCookie(ctx, refreshTokenKey);
}
