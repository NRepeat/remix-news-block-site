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
  })
);
type WidgetType = {type: string; quantity: number};
const Form: FC<AdditionalContentFormType> = ({widget, page}) => {
  const [quantity, setQuantity] = useState<number>(10);

  const [options, setOptions] = useState<string[]>(['Posts']);
  useEffect(() => {
    try {
      if (widget.additionalData && widget.additionalData.content) {
        const content: WidgetType = JSON.parse(
          widget.additionalData.content as string
        );
        if (content.type) {
          setOptions(content.type.split(','));
        }
        if (content.quantity) {
          setQuantity(content.quantity);
        }
      }
    } catch (error) {
      console.error('Error parsing widget additionalData.content:', error);
    }
  }, [widget.additionalData]);
  const toggleOptionChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: string
  ) => {
    event.preventDefault();

    setOptions(prevOptions => {
      if (prevOptions.includes(value)) {
        return prevOptions.filter(option => option !== value);
      } else {
        return [...prevOptions, value];
      }
    });
  };

  return (
    <WidgetFormWrapper widget={widget}>
      <div className={`flex w-full cursor-default justify-between gap-2 p-4}`}>
        <button
          className={`border-2 w-full rounded-sm pr-2 pl-2 ${
            options.includes('Posts') ? 'bg-gray-500' : 'bg-white'
          } `}
          onClick={e => toggleOptionChange(e, 'Posts')}
        >
          Posts
        </button>
        <button
          className={`border-2 w-full rounded-sm pr-2 pl-2 ${
            options.includes('Image') ? 'bg-gray-500' : 'bg-white'
          } `}
          onClick={e => toggleOptionChange(e, 'Image')}
        >
          Image
        </button>
        <button
          className={`border-2 w-full rounded-sm pr-2 pl-2 ${
            options.includes('Text') ? 'bg-gray-500' : 'bg-white'
          } `}
          onClick={e => toggleOptionChange(e, 'Text')}
        >
          Text
        </button>
      </div>
      <ValidatedForm
        className="flex flex-col gap-4"
        validator={additionalContentValidator}
        method="post"
        preventScrollReset
        action={`/admin/pages/page/${page?.slug}/edit/tag/content`}
        navigate={false}
      >
        <FormInput
          type="text"
          name="quantity"
          placeholder="Default 10 posts"
          label="Additional content quantity"
          value={quantity.toString()} // Use the state variable as the value
          onChange={e => setQuantity(Number(e.target.value))}
        />
        <FormInput type="hidden" name="id" value={widget.id} />
        <div className="hidden">
          {options.map(option => (
            <FormInput key={option} type="hidden" name="type" value={option} />
          ))}
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
