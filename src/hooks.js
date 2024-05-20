// import { redirect } from "@sveltejs/kit";

// // src/hooks.js
// export async function handle({ event, resolve }) {
// 	const { locals } = event;
// 	const userIsAuthorized = checkUserAuthorization(event);
// 	console.log(userIsAuthorized)

// 	// Check user authorization

// 	if (!userIsAuthorized) {
// 		// Redirect to a login page or an unauthorized page
// 		throw redirect(307, '/login');

// 	}

// 	// Proceed with the request
// 	return await resolve(event);
// }

// function checkUserAuthorization(event) {
// 	console.log("_____________________",event.cookies.getAll())
// 	console.log("^^^^^^^^",event.locals)
// 	// Implement your authorization logic here
// 	// For example, check if user is logged in
// 	const user = event.locals.user; // Assuming user data is stored in locals
// 	return true;
// }
