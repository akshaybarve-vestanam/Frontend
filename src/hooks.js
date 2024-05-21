import { redirect } from "@sveltejs/kit";

// @ts-ignore
export async function handle({ event, resolve }) {
    const token = event.cookies.get('authToken')
  
    if (!token && !event.url.pathname.startsWith('/login')) {
        throw redirect(307, '/login');
    }
    if (event.url.pathname.startsWith('/login') && token) {
        throw redirect(307, '/dashboard/registration/individual');
    }
    return await resolve(event);
}