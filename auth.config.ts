import type { NextAuthConfig } from "next-auth";

export const authConfig = {
	pages: {
		signIn: "/login",
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isOnAccount =
				nextUrl.pathname.startsWith("/login") ||
				nextUrl.pathname.startsWith("/create-account");
			if (isLoggedIn && isOnAccount) {
				return Response.redirect(new URL("/", nextUrl));
			}
			return true;
		},
	},
	providers: [],
} satisfies NextAuthConfig;
