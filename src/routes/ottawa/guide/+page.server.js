import { redirect } from '@sveltejs/kit';

export async function load() {
    throw redirect(302, 'https://docs.google.com/document/d/1b0VbQoMMQYbqNJot5h5W-pVa0mxhCyhQr56wf_jyytc/edit?usp=sharing');
}