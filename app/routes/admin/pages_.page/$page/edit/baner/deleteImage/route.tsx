import {redirect, type ActionFunctionArgs} from '@remix-run/node';
import {validationError} from 'remix-validated-form';
import {banerValidator} from '~/components/BanerWidget/Form/Form';
import {deleteBanerImage} from '~/service/baner.server';
import {updateElement} from '~/service/widget.server';
export async function action({request, params}: ActionFunctionArgs) {
  try {
    const slug = params.page;
    if (!slug) throw new Error('Not found');
    const formData = await request.formData();
    console.log('🚀 ~ action ~ formData:', formData);
    const validatedData = await banerValidator.validate(formData);
    if (validatedData.error) {
      return validationError({
        fieldErrors: {id: 'Not valid data'},
      });
    }
    const {imageId, banerId, id} = validatedData.data;

    if (imageId === 0) {
      await deleteBanerImage({id: parseInt(id), imageId});
      await updateElement({content: JSON.stringify({banerId}), id, slug});
      return redirect(`/admin/pages/page/${slug}/edit/`);
    }

    return redirect(`/admin/pages/page/${slug}/edit/`);
  } catch (error) {
    throw new Response('Bad request');
  }
}
