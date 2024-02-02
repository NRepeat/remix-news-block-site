import {redirect} from '@remix-run/node';
import {createPost} from '~/service/post.server';

export async function action() {
  try {
    const createdPost = await createPost();
    return redirect(`/admin/posts/post/${createdPost.id}/edit`);
  } catch (error) {
    throw new Response('Bad request');
  }
}
