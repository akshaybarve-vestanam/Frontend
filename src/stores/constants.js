import { readable} from 'svelte/store';

export const base_url = readable("http://localhost:3000/");
export const auth_base_url = readable("http://localhost:3000/a/");
