import {useSubmit} from '@remix-run/react';
import {withZod} from '@remix-validated-form/with-zod';
import {FC, useEffect, useState} from 'react';
import {ValidatedForm} from 'remix-validated-form';
import {z} from 'zod';
import {zfd} from 'zod-form-data';
import {SubmitButton} from '~/components/UI/SubmitButton/SubmitButton';
import FormInput from '~/components/UI/ValidatedFormInput/ValidatedFormInput';
import FormTextArea from '~/components/UI/ValidatedTextArea/ValidatedTextArea';
import WidgetFormWrapper from '~/components/WidgetFormWrapper/WidgetFormWrapper';
import {WidgetDataType, WidgetInstance} from '~/types/types';
import styles from './styles.module.css';

type TextFormType = {
  widget: WidgetInstance;
};
export const textValidator = withZod(
  z.object({
    title: zfd.text(z.string().min(5).max(15)),
    text: zfd.text(z.string().min(10).max(500)),
    id: z.coerce.string(),
    type: z.string(),
  })
);
const Form: FC<TextFormType> = ({widget}) => {
  const [value, setValue] = useState<WidgetDataType>({
    title: '',
    text: '',
  });

  const sub = useSubmit();

  useEffect(() => {
    if (widget.additionalData) {
      const content = widget.additionalData?.content as string;
      if (content !== '') {
        const value = JSON.parse(content);
        setValue(value);
      }
    }
  }, [widget]);

  const defaultValues = {
    title: value?.title || '',
    text: value?.text || '',
  };

  const deleteWidget = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    sub(
      {containerId: widget.containerId, widgetId: widget.id, type: 'delete'},
      {method: 'delete'}
    );
  };

  const handleTitleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(prevValue => ({...prevValue, title: e.target.value}));
  };

  const handleTextValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(prevValue => ({...prevValue, text: e.target.value}));
  };

  return (
    <WidgetFormWrapper widget={widget}>
      <ValidatedForm
        className={styles.form}
        navigate={false}
        defaultValues={defaultValues}
        validator={textValidator}
        method="post"
      >
        <FormInput
          name="title"
          value={value?.title}
          placeholder="Title"
          onChange={handleTitleValueChange}
          label="Title"
          type="text"
        />
        <FormTextArea
          name="text"
          value={value?.text}
          placeholder="text"
          onChange={handleTextValueChange}
          type="text"
        />
        <FormInput type="hidden" name="type" value={'textWidget'} />
        <FormInput type="hidden" name="id" value={widget.id} />
        <div className="flex justify-between rounded-sm">
          <SubmitButton classNames="border-2 w-1/3 border-green-600 rounded-sm hover:bg-green-200 pr-2 pl-2 hover:border-black">
            Save
          </SubmitButton>
          <button
            className={styles.deleteButton}
            onClick={e => deleteWidget(e)}
          >
            Delete
          </button>
        </div>
      </ValidatedForm>
    </WidgetFormWrapper>
  );
};

export default Form;
