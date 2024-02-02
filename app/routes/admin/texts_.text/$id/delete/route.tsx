import type {ActionFunctionArgs} from '@remix-run/node';
import {json} from '@remix-run/node';
import {z} from 'zod';
import {deleteText} from '~/service/text.server';

export async function action({request}: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const textId = formData.get('id');
    await deleteText(z.coerce.number().parse(textId));
    return json({success: true});
  } catch (error) {
    throw new Response('Bad request');
  }
}
