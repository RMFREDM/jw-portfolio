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

export async function getUsernameByEmail(
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

export async function getUsernameById(
	id: string,
): Promise<Account | undefined> {
	try {
		const account = await sql<
			Account[]
		>`SELECT username FROM accounts WHERE id=${id}`;
		return account[0];
	} catch (error) {
		console.error("Failed to fetch username:", error);
		throw new Error("Failed to fetch username.");
	}
}

export async function getAccountIdByEmail(
	email: string,
): Promise<Account | undefined> {
	try {
		const account = await sql<
			Account[]
		>`SELECT id FROM accounts WHERE email=${email}`;
		return account[0];
	} catch (error) {
		console.error("Failed to fetch id:", error);
		throw new Error("Failed to fetch id.");
	}
}

/* Articles Section */

// create a function that gets all articles from the database
export async function getArticles() {
	// define a variable to hold articles and attempt to fetch them
	let articles;
	try {
		articles = await sql`SELECT * FROM articles`;

		// return the articles
		return articles;
	} catch (error) {
		// log and throw the error that occurred
		console.log(error);
		throw new Error("Failed to fetch articles: " + error);
	}
}

// create a function that gets one article from the database based on its id
export async function getArticleById(id: string) {
	// define a variable to hold articles and attempt to fetch them
	let article;
	try {
		article = await sql`SELECT * FROM articles where id=${id}`;

		// return the recipe
		return article[0];
	} catch (error) {
		// log and throw the error that occurred
		console.log(error);
		throw new Error("Failed to fetch the article: " + error);
	}
}

/* Comments Section */

// create a function that gets all comments for a specific article
export async function getCommentsByArticleId(articleId: string) {
	// define a variable to hold articles and attempt to fetch them
	let comments;
	try {
		comments =
			await sql`SELECT * FROM comments where articleId=${articleId}`;

		// return the recipe
		return comments;
	} catch (error) {
		// log and throw the error that occurred
		console.log(error);
		throw new Error("Failed to fetch the comments: " + error);
	}
}
