import {json, type ActionFunctionArgs} from '@remix-run/node';
import {z} from 'zod';
import {disconnectImagePost, getPostById} from '~/service/post.server';

export async function action({request, params}: ActionFunctionArgs) {
  try {
    const id = params.id;
    if (!id) throw new Error('Not found');
    const formData = await request.formData();
    const imageId = z.coerce.number().parse(formData.get('imageId'));
    const post = await getPostById(parseInt(id));
    if (!post) throw new Error('Not found');
    await disconnectImagePost(post.id, imageId);
    return json({success: true});
  } catch (error) {
    throw new Response('Bad request');
  }
}
