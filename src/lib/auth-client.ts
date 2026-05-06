import { createAuthClient } from "better-auth/react";
import { nextCookies } from "better-auth/next-js";
import {emailOTPClient, inferAdditionalFields} from "better-auth/client/plugins"
import { auth } from "./auth";
export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>(),nextCookies(),emailOTPClient()],
  baseURL: process.env.NEXT_PUBLIC_APP_URL,

});
