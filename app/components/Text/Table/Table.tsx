import { Text } from '@prisma/client';
import { SerializeFrom } from '@remix-run/node';
import { Link, useNavigate } from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import { RiFileEditFill } from 'react-icons/ri';
import { ValidatedForm } from 'remix-validated-form';
import { z } from 'zod';
import DeleteButton from '~/components/Posts/Buttons/DeleteButton';
import { SubmitButton } from '~/components/UI/SubmitButton/SubmitButton';
import FormInput from '~/components/UI/ValidatedFormInput/ValidatedFormInput';

const searchTextValidator = withZod(
  z.object({
    search: z.coerce.string(),
  })
);

const Table = ({ texts }: { texts: SerializeFrom<Text[]> }) => {
  const navigate = useNavigate();
  const handleRowClick = (id: number) => {
    navigate(`/admin/texts/text/${id}/edit`);
  };
  return (
    <div className=" p-4 w-full flex flex-col gap-2 ">
      <div className="w-full inline-flex items-center justify-end pr-4">
        <ValidatedForm
          className={'inline-flex h-12   w-full justify-end gap-1'}
          validator={searchTextValidator}
        >
          <FormInput
            name="search"
            classNames=" rounded-sm  h-10"
            placeholder="Search post"
          />
          <SubmitButton classNames="border-2  pr-2 rounded-sm pl-2 bg-white ">
            Search posts
          </SubmitButton>
        </ValidatedForm>
      </div>
      <table className="table-fixed  p-4  w-full  ">
        <thead className="border-2 border-gray-200  text-pretty ">
          <tr className="  text-xl uppercase text-left text-gray-600">
            <th className="pl-4 w-12">id</th>
            <th className="pl-4 w-20">Title</th>
            <th className=" pl-10  ">Article</th>
            <th className="pr-4 w-24 text-right">Edit</th>
            <th className="pr-4 w-24  text-right">Delete</th>
          </tr>
        </thead>
        <tbody className="odd:bg-slate-300  w-full">
          {texts &&
            texts.map(text => (
              <tr
                className="even:bg-slate-300    cursor-pointer hover:text-white hover:bg-sky-800"
                key={text.id}
                onClick={() => handleRowClick(text.id)}
              >
                <td className="w-12 pt-4 pb-4 text-center">{text.id}</td>
                <td className="pl-4">{text.title} </td>
                <td className="pl-10  max-h-14 max-w-[300px] text-wrap text-ellipsis overflow-hidden">
                  {' '}
                  {text.article}{' '}
                </td>
                <td className="  text-right pr-5">
                  {' '}
                  <Link
                    className="inline-flex items-center"
                    to={`/admin/texts/text/${text.id}/edit`}
                  >
                    <RiFileEditFill className="fill-blue-500 w-8 h-8" />
                  </Link>{' '}
                </td>
                <td className="text-right pr-10">
                  <DeleteButton
                    action={`/admin/texts/text/${text.id}/delete`}
                    id={text.id}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>

  );
};

export default Table;
