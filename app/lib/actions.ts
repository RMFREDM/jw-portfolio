"use server";

import postgres from "postgres";
import { z } from "zod";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { getAccountIdByEmail } from "./data";

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

export async function authenticate(
	prevState: string | undefined,
	formData: FormData,
) {
	try {
		await signIn("credentials", formData);
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return "Invalid credentials.";
				default:
					return "Something went wrong.";
			}
		}
		throw error;
	}
}

/* Articles Section */

/* Comments Section */

// define an CommentState type for comment form errors
export type CommentState = {
	errors?: {
		content?: string[] | null;
	} | null;
	message?: string | null;
};

// define a account form schematic for account forms
const CommentFormSchema = z.object({
	id: z.string(),
	content: z.string().trim().min(1, { error: "Comment cannot be empty." }),
	articleId: z.string().min(1, { error: "Comment must have an article" }),
	accountId: z.string().min(1, { error: "Comment must have an account" }),
});

// define a server action that creates a comment
const CreateCommentSchema = CommentFormSchema.omit({
	id: true,
	articleId: true,
	accountId: true,
});
export async function createComment(
	articleId: string,
	prevState: CommentState,
	formData: FormData,
) {
	// get the account id and prevent submission if it doesn't exist
	const accountEmail = (await auth())?.user?.email;
	if (!accountEmail) {
		return {
			message: "An account must be associated with this comment",
		};
	}
	const accountId = (await getAccountIdByEmail(accountEmail))?.id;

	// validate the form data
	const validatedComment = CreateCommentSchema.safeParse({
		content: formData.get("content"),
	});

	// return early if validation fails
	if (!validatedComment.success) {
		return {
			errors: validatedComment.error.flatten().fieldErrors,
			message: "Failed to create the comment: field errors",
		};
	}

	// get the form data
	const { content } = validatedComment.data;

	// try to create the comment
	try {
		await sql`INSERT INTO comments (content, articleId, accountId)
		VALUES (${content}, ${articleId}, ${accountId!})`;
		console.log(`Created comment: ${content}`);
	} catch (error) {
		// log and return the error
		console.error(error);
		return {
			message:
				"An internal error ocurred and we failed to create the comment: " +
				error,
		};
	}

	// redirect the user to the article comment section
	revalidatePath(`/articles/${articleId}#comments-section`);
	redirect(`/articles/${articleId}#comments-section`);
}

// define a server action that edits a comment
const EditCommentSchema = CommentFormSchema.omit({
	id: true,
	articleId: true,
	accountId: true,
});
export async function editComment(
	id: string,
	commentAccountId: string,
	articleId: string,
	prevState: CommentState,
	formData: FormData,
) {
	// get the account id and prevent submission if it doesn't exist
	const accountEmail = (await auth())?.user?.email;
	if (!accountEmail) {
		return {
			message: "An account must be associated with this comment",
		};
	}
	const accountId = (await getAccountIdByEmail(accountEmail))?.id;
	if (accountId != commentAccountId) {
		return {
			message: "Only the creator of a comment can edit it",
		};
	}

	// validate the form data
	const validatedComment = EditCommentSchema.safeParse({
		content: formData.get("content"),
	});

	// return early if validation fails
	if (!validatedComment.success) {
		return {
			errors: validatedComment.error.flatten().fieldErrors,
			message: "Failed to edit the comment: field errors",
		};
	}

	// get the form data
	const { content } = validatedComment.data;

	// try to create the comment
	try {
		await sql`Update comments
		Set content=${content}
		Where id=${id}`;
	} catch (error) {
		// log and return the error
		console.error(error);
		return {
			message:
				"An internal error ocurred and we failed to edit the comment: " +
				error,
		};
	}

	// redirect the user to the comment
	revalidatePath(`/articles/${articleId}#${id}`);
	redirect(`/articles/${articleId}#${id}`);
}

// define a server action that deletes a comment
export async function deleteComment(commentId: string, articleId: string) {
	// get the account id and prevent submission if it doesn't exist
	const accountEmail = (await auth())?.user?.email;
	if (!accountEmail) {
		return {
			message: "An account must be associated with this comment",
		};
	}
	const accountId = (await getAccountIdByEmail(accountEmail))?.id;
	console.log(accountId);

	// try to delete the comment
	try {
		await sql`DELETE FROM comments
		WHERE id=${commentId}`;
	} catch (error) {
		// log and return the error
		console.error(error);
		return {
			message:
				"An internal error ocurred and we failed to delete the comment: " +
				error,
		};
	}

	// redirect the user to the article comment section
	revalidatePath(`/articles/${articleId}#comments-section`);
	redirect(`/articles/${articleId}#comments-section`);
}

/* Message Section */

// define an MessageState type for message form errors
export type MessageState = {
	errors?: {
		message?: string[] | null;
	} | null;
	message?: string | null;
};

// define a message form schematic for message forms
const MessageFormSchema = z.object({
	id: z.string(),
	message: z.string().trim().min(1, { error: "Message cannot be empty." }),
	accountId: z.string().min(1, { error: "Message must have an account" }),
});

// define a server action that creates a contactMessage
const CreateMessageSchema = MessageFormSchema.omit({
	id: true,
	accountId: true,
});
export async function createMessage(
	prevState: MessageState,
	formData: FormData,
) {
	// get the account id and prevent submission if it doesn't exist
	const accountEmail = (await auth())?.user?.email;
	if (!accountEmail) {
		return {
			message: "An account must be associated with this message",
		};
	}
	const accountId = (await getAccountIdByEmail(accountEmail))?.id;

	// validate the form data
	const validatedComment = CreateMessageSchema.safeParse({
		message: formData.get("message"),
	});

	// return early if validation fails
	if (!validatedComment.success) {
		console.log("Form Validation Failed");
		return {
			errors: validatedComment.error.flatten().fieldErrors,
			message: "Failed to create the message: field errors",
		};
	}

	// get the form data
	const { message } = validatedComment.data;

	// try to create the comment
	try {
		await sql`INSERT INTO messages (message, accountId)
		VALUES (${message}, ${accountId!})`;
	} catch (error) {
		// log and return the error
		console.error(error);
		return {
			message:
				"An internal error ocurred and we failed to create the message: " +
				error,
		};
	}

	// redirect the user to the homepage
	revalidatePath(`/`);
	redirect(`/`);
}
