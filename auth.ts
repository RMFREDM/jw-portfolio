import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { getAccountByUsername } from "./app/lib/data";

export const { auth, signIn, signOut } = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			async authorize(credentials) {
				const parsedCredentials = z
					.object({
						username: z.string().min(1),
						password: z.string().min(6),
					})
					.safeParse(credentials);

				if (parsedCredentials.success) {
					const { username, password } = parsedCredentials.data;
					const account = await getAccountByUsername(username);
					if (!account) return null;
					const passwordsMatch = await bcrypt.compare(
						password,
						account.password,
					);

					if (passwordsMatch) return account;
				}

				console.log("invalid credentials");
				return null;
			},
		}),
	],
});
