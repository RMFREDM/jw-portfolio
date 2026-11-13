"use server";

import postgres from "postgres";
import { Account } from "./definitions";

// define  a constant for sql queries
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

/* Account Section */

export async function getAccountByUsername(
	username: string,
): Promise<Account | undefined> {
	try {
		const account = await sql<
			Account[]
		>`SELECT * FROM accounts WHERE username=${username}`;
		return account[0];
	} catch (error) {
		console.error("Failed to fetch account:", error);
		throw new Error("Failed to fetch account.");
	}
}

export async function getUsernameBEmail(
	email: string,
): Promise<Account | undefined> {
	try {
		const account = await sql<
			Account[]
		>`SELECT username FROM accounts WHERE email=${email}`;
		return account[0];
	} catch (error) {
		console.error("Failed to fetch username:", error);
		throw new Error("Failed to fetch username.");
	}
}
