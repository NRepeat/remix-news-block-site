import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {validationError} from 'remix-validated-form';
import {additionalContentValidator} from '~/components/AdditionalNewsWidget/Form/Form';

import {updateElement} from '~/service/widget.server';

export async function action({params, request}: ActionFunctionArgs) {
  try {
    const slug = params.page;
    if (!slug) throw new Error('Not found');
    const formData = await request.formData();
    const validatedFormData =
      await additionalContentValidator.validate(formData);
    if (validatedFormData.error) {
      return validationError({
        fieldErrors: {
          type: 'Not valid data',
        },
      });
    }
    const {quantity, type, id, keyWord} = validatedFormData.data;
    await updateElement({
      content: JSON.stringify({type, quantity, keyWord}),
      id,
      slug,
    });
    return redirect(`/admin/pages/page/${slug}/edit`);
  } catch (error) {
    throw new Response('Bad request');
  }
}
