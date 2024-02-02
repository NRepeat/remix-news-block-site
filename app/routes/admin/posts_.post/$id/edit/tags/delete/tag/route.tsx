import {redirect, type ActionFunctionArgs} from '@remix-run/node';
import {disconnectTagsToPost} from '~/service/tags.server';

export async function action({params, request}: ActionFunctionArgs) {
  try {
    const id = params.id;
    if (!id) {
      throw new Error('Not found');
    }

    const formData = await request.formData();

    const tagToRemove = formData.get('tagIdToRemove') as string;
    if (tagToRemove) {
      await disconnectTagsToPost({id: parseInt(tagToRemove)});
      return redirect(`/admin/posts/post/${id}/edit`);
    }

    return redirect(`/admin/posts/post/${id}/edit`);
  } catch (error) {
    throw new Response('Bad request');
  }
}
