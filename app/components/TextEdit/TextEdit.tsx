import {Text} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import {withZod} from '@remix-validated-form/with-zod';
import {FC} from 'react';
import {ValidatedForm} from 'remix-validated-form';
import {z} from 'zod';
import {zfd} from 'zod-form-data';
import {SubmitButton} from '~/components/UI/SubmitButton/SubmitButton';
import FormInput from '~/components/UI/ValidatedFormInput/ValidatedFormInput';
import FormTextArea from '~/components/UI/ValidatedTextArea/ValidatedTextArea';

type TextFormType = {
  text: SerializeFrom<Text>;
};
export const textEditFormValidator = withZod(
  z.object({
    title: zfd.text(z.string().min(5).max(15)),
    article: zfd.text(z.string().min(10).max(500)),
  })
);
const TextEditForm: FC<TextFormType> = ({text}) => {
  const defaultValues = {
    title: text.title || '',
    article: text.article || '',
  };

  return (
    <ValidatedForm
      className="flex flex-col  gap-4 w-fill pt-4 items-center "
      navigate={false}
      defaultValues={defaultValues}
      validator={textEditFormValidator}
      method="post"
    >
      <div className="flex border-2 rounded-sm  border-gray-300 p-4 bg-slate-200 flex-col gap-4  w-1/2">
        <h3 className="text-xl">Edit text form </h3>
        <FormInput type="hidden" name="type" value={'textWidget'} />
        <FormInput name="title" placeholder="Title" label="Title" type="text" />
        <FormTextArea
          classNames="min-h-[250px]"
          name="article"
          label="Article"
          placeholder="Text"
          type="text"
        />
        <SubmitButton classNames="w-full pt-2  pb-2 border-2 bg-green-200 border-green-400 hover:border-black hover:bg-green-200 ">
          Save
        </SubmitButton>
      </div>
    </ValidatedForm>
  );
};

export default TextEditForm;
