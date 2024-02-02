import {useSubmit} from '@remix-run/react';
import {MdDelete} from 'react-icons/md';

const DeleteButton = ({id, action}: {id: number; action: string}) => {
  const submit = useSubmit();
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    submit(
      {id},
      {
        action,
        navigate: false,
        method: 'delete',
      }
    );
  };
  return (
    <button
      onClick={e => handleDelete(e)}
      className="inline-flex justify-center items-center     "
    >
      <MdDelete className="fill-red-500  w-8 h-8" />
    </button>
  );
};

export default DeleteButton;
