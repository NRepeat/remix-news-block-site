import {LoaderFunctionArgs, json} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';
import {z} from 'zod';
import TextEditForm, {
  textEditFormValidator,
} from '~/components/TextEdit/TextEdit';
import {getTextById, updateText} from '~/service/text.server';

import type {ActionFunctionArgs} from '@remix-run/node';
import {validationError} from 'remix-validated-form';
export async function action({request, params}: ActionFunctionArgs) {
  try {
    const id = params.id;
    if (!id) throw new Error('Not found');
    const formData = await request.formData();
    const validatedFormData = await textEditFormValidator.validate(formData);
    if (validatedFormData.error) {
      return validationError({
        fieldErrors: {title: 'Data not valid'},
      });
    }
    const {article, title} = validatedFormData.data;
    await updateText(z.coerce.number().parse(id), {article, title});
    return json({success: true});
  } catch (error) {
    throw new Response('Bad request');
  }
}

export async function loader({params}: LoaderFunctionArgs) {
  try {
    const id = params.id;
    if (!id) throw new Error('Not found');
    const text = await getTextById(z.coerce.number().parse(id));
    return json({text});
  } catch (error) {
    throw new Response('Bad request');
  }
}

export default function Content() {
  const data = useLoaderData<typeof loader>();
  return (
    <div style={{gridArea: 'main'}} className="p-4    ">
      <div className="inline-flex gap-4 items-center pb-4 border-b-2 w-full">
        <p className="text-2xl text-pretty">Edit text {data.text.title}</p>
      </div>
      <TextEditForm text={data.text} />
    </div>
  );
}
