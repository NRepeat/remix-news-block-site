import {Image, Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import {withZod} from '@remix-validated-form/with-zod';
import {FC, useEffect, useState} from 'react';
import {ValidatedForm} from 'remix-validated-form';
import {z} from 'zod';
import {SubmitButton} from '~/components/UI/SubmitButton/SubmitButton';
import FormInput from '~/components/UI/ValidatedFormInput/ValidatedFormInput';
import WidgetFormWrapper from '~/components/WidgetFormWrapper/WidgetFormWrapper';
import {WidgetInstance} from '~/types/types';

type AdditionalContentFormType = {
  widget: WidgetInstance;
  images?: SerializeFrom<Image[]>;
  page?: SerializeFrom<Page>;
};

export const additionalContentValidator = withZod(
  z.object({
    type: z.coerce.string(),
    quantity: z.coerce.number(),
    id: z.coerce.string(),
    keyWord: z.coerce.string().optional(),
  })
);

type WidgetType = {type: string; quantity: number; keyWord: string};
const Form: FC<AdditionalContentFormType> = ({widget, page}) => {
  const [quantity, setQuantity] = useState<number>(10);
  const [option, setOption] = useState<string>('auto');
  const [keyWord, setKeyWord] = useState<string>('');
  useEffect(() => {
    try {
      if (widget.additionalData?.content) {
        const content: WidgetType = JSON.parse(
          widget.additionalData.content as string
        );
        if (content.type) {
          setOption(content.type);
        }
        if (content.quantity) {
          setQuantity(content.quantity);
        }
        if (content.keyWord) {
          setKeyWord(content.keyWord);
        }
      }
    } catch (error) {
      console.error('Error parsing widget additionalData.content:', error);
    }
  }, [widget.additionalData]);

  const handleOptionChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: string
  ) => {
    event.preventDefault();
    setOption(value);
  };

  return (
    <WidgetFormWrapper widget={widget}>
      <div className="flex w-full cursor-default justify-between gap-2 p-4">
        <button
          className={`border-2 w-full rounded-sm pr-2 pl-2 ${
            option === 'keyWord' ? 'bg-gray-400' : 'bg-white'
          } `}
          onClick={e => handleOptionChange(e, 'keyWord')}
        >
          Key word
        </button>
        <button
          className={`border-2 w-full rounded-sm pr-2 pl-2 ${
            option === 'auto' ? 'bg-gray-400' : 'bg-white'
          } `}
          onClick={e => handleOptionChange(e, 'auto')}
        >
          Auto
        </button>
      </div>
      <ValidatedForm
        defaultValues={{
          keyWord,
        }}
        className="flex flex-col gap-4"
        validator={additionalContentValidator}
        method="post"
        preventScrollReset
        action={`/admin/pages/page/${page?.slug}/edit/search/content`}
        navigate={false}
      >
        <FormInput
          type="text"
          name="quantity"
          placeholder="Default 10 posts"
          label="Additional content quantity"
          value={quantity.toString()}
          onChange={e => setQuantity(Number(e.target.value))}
        />
        <FormInput type="hidden" name="id" value={widget.id} />
        {option === 'keyWord' && (
          <FormInput
            label="Key word"
            placeholder="key word"
            type="text"
            name="keyWord"
          />
        )}
        <div className="hidden">
          <FormInput type="hidden" name="type" value={option} />
        </div>
        <div className="inline-flex w-full">
          <SubmitButton classNames="border-2 w-1/3 border-green-600 rounded-sm hover:bg-green-200 pr-2 pl-2 hover:border-black">
            Save
          </SubmitButton>
        </div>
      </ValidatedForm>
    </WidgetFormWrapper>
  );
};

export default Form;
