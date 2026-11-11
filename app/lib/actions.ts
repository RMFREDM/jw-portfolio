"use server";

import postgres from "postgres";
import { z } from "zod";

// define  a constant for sql queries
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

/* Accounts Section */

// define an AccountState type for account form errors
export type AccountState = {
	errors?: {
		userame?: string[] | null;
		email?: string[] | null;
		password?: string[] | null;
	} | null;
	message?: string | null;
};

// define a account form schematic for account forms
const AccountFormSchema = z.object({
	id: z.string(),
	userame: z.string().trim().min(1, { error: "Userame cannot be empty." }),
	email: z.string().trim().min(1, { error: "Email cannot be empty." }),
	password: z
		.string()
		.trim()
		.min(8, { error: "Password must be at least 8 characters" }),
});

// define a server action that creates an account
const CreateAccountSchema = AccountFormSchema.omit({ id: true });
export async function createAccount(
	prevState: AccountState,
	formData: FormData,
) {
	// validate the form data
	const validatedAccount = CreateAccountSchema.safeParse({
		username: formData.get("name"),
		email: formData.get("name"),
		password: formData.get("name"),
	});

	// return early if validation fails
	if (!validatedAccount.success) {
		return {
			errors: validatedAccount.error.flatten().fieldErrors,
			message: "Failed to create the account: field errors",
		};
	}

	// get the form data
	const { userame, email, password } = validatedAccount.data;
}
