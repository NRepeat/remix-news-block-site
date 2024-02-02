import {redirect} from '@remix-run/node';
import {createText} from '~/service/text.server';

export async function action() {
  try {
    const createdText = await createText({slug: '', title: '', article: ''});
    return redirect(`/admin/texts/text/${createdText.id}/edit`);
  } catch (error) {
    throw new Response('Bad request');
  }
}
