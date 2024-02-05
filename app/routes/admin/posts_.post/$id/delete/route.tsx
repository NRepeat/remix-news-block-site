import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {deletePost} from '~/service/post.server';

export async function action({params}: ActionFunctionArgs) {
  try {
    const id = params.id;
    if (!id) throw new Error('Not found');
    await deletePost(parseInt(id));
    return redirect('/admin/posts');
  } catch (error) {
    console.log('🚀 ~ action ~ error:', error);
    throw new Response('Bad request');
  }
}
