import {ActionFunctionArgs, json} from '@remix-run/node';
import {createImage} from '~/service/image.server';

export type MediaType = 'postThumbnail' | 'postImage' | 'url';

export async function action({request}: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const formDataType = formData.get('type') as MediaType;
    if (formDataType === 'url') {
      const url = formData.get('url') as string;
      await createImage(url);
    }
    return json({success: true});
  } catch (error) {
    throw new Response('Bad request');
  }
}
