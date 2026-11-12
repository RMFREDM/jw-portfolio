"use server";

import postgres from "postgres";
import { z } from "zod";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// define  a constant for sql queries
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

/* Accounts Section */

// define an AccountState type for account form errors
export type AccountState = {
	errors?: {
		username?: string[] | null;
		email?: string[] | null;
		password?: string[] | null;
	} | null;
	message?: string | null;
};

// define a account form schematic for account forms
const AccountFormSchema = z.object({
	id: z.string(),
	username: z.string().trim().min(1, { error: "Username cannot be empty." }),
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
		username: formData.get("username"),
		email: formData.get("email"),
		password: formData.get("password"),
	});

	// return early if validation fails
	if (!validatedAccount.success) {
		return {
			errors: validatedAccount.error.flatten().fieldErrors,
			message: "Failed to create the account: field errors",
		};
	}

	// get the form data and hash the password
	const { username, email, password } = validatedAccount.data;
	const hashedPassword = await bcrypt.hash(password, 10);

	// try to create the user
	try {
		await sql`INSERT INTO accounts (username, email, password)
		VALUES (${username}, ${email}, ${hashedPassword})`;
		console.log(`Created account: ${username}`);
	} catch (error) {
		// log and return the error
		console.error(error);
		return {
			message:
				"An internal error ocurred and we failed to create the account: " +
				error,
		};
	}

	// redirect the user to the login page
	revalidatePath("/login");
	redirect("/login");
}
