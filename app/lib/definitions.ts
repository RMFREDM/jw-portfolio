// define a type for account objects
export type Account = {
	id: string;
	username: string;
	email: string;
	password: string;
	isAdmin: boolean;
};

// define a type for article objects
export type Article = {
	id: string;
	title: string;
	contents: string;
};

// define a type for comment objects
export type Comment = {
	id: string;
	content: string;
	articleid: string;
	accountid: string;
};
