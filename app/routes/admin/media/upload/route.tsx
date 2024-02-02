import {
  ActionFunctionArgs,
  json,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from '@remix-run/node';
import {createImage} from '~/service/image.server';

export type MediaType = 'postThumbnail' | 'postImage' | 'url';
export async function action({request}: ActionFunctionArgs) {
  try {
    const uploadHandler = unstable_composeUploadHandlers(
      unstable_createFileUploadHandler({
        directory: 'public/uploads',
        maxPartSize: 50000000,
        file: ({filename}) => filename,
      }),
      unstable_createMemoryUploadHandler()
    );
    const formData = await unstable_parseMultipartFormData(
      request,
      uploadHandler
    );
    const formDataType = formData.get('type') as MediaType;
    if (formDataType === 'url') {
      const url = formData.get('url') as string;
      await createImage(url);
    }
    if (formDataType === 'postThumbnail') {
      const {name} = formData.get('file') as File;
      await createImage(name);
      return json({success: true});
    }
    if (formDataType === 'postImage') {
      const {name} = formData.get('file') as File;
      await createImage(name);
      return json({success: true});
    }
    return json({success: true});
  } catch (error) {
    throw new Response('Bad request');
  }
}
