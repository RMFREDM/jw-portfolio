import { auth } from "@/auth";
import { getAccountIdByEmail } from "./data";

export default async function isAssociatedWithCurrentAccount(
	itemAccountId: string,
) {
	// get the current user's email
	const currentEmail = (await auth())?.user?.email;

	// return false if the email doesn't exist
	if (!currentEmail) {
		return false;
	}

	// get and compare the user's id
	const currentId = (await getAccountIdByEmail(currentEmail))?.id;
	return currentId == itemAccountId;
}
