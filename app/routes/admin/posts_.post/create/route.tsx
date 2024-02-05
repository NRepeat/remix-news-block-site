import {redirect} from '@remix-run/node';
import {createPost} from '~/service/post.server';
import {randomId} from '~/utils/randomId';

export async function action() {
  try {
    const createdPost = await createPost('post' + randomId());
    return redirect(`/admin/posts/post/${createdPost.id}/edit`);
  } catch (error) {
    throw new Response('Bad request');
  }
}
