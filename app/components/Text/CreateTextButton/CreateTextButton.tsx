import {useSubmit} from '@remix-run/react';
const CreateTextButton = () => {
  const submit = useSubmit();
  const handleSubmit = () => {
    submit({}, {action: '/admin/texts/text/create/', method: 'post'});
  };
  return (
    <button
      onClick={() => handleSubmit()}
      className="inline-flex pr-4 pl-4 pt-1 pb-1 border-2 rounded-sm text-green-600 border-green-600 hover:bg-green-200  hover:text-black"
    >
      Create text
    </button>
  );
};

export default CreateTextButton;
