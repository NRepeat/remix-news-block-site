import {json, type ActionFunctionArgs} from '@remix-run/node';
import {validationError} from 'remix-validated-form';
import {imageLinkValidator} from '~/components/ImageCarouselWidget/Wrapper/Wrapper';
import {updateBanerLink} from '~/service/baner.server';
export async function action({request}: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const validatedData = await imageLinkValidator.validate(formData);
    if (validatedData.error) {
      return validationError({
        fieldErrors: {id: 'Not valid data'},
      });
    }
    const {link, banerId} = validatedData.data;
    await updateBanerLink(banerId!, link!);
    return json({success: true});
  } catch (error) {
    throw new Response('Bad request');
  }
}
