import {Text} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import {Link, useNavigate} from '@remix-run/react';
import {RiFileEditFill} from 'react-icons/ri';
import DeleteButton from '~/components/Posts/Buttons/DeleteButton';

const Table = ({texts}: {texts: SerializeFrom<Text[]>}) => {
  const navigate = useNavigate();
  const handleRowClick = (id: number) => {
    navigate(`/admin/texts/text/${id}/edit`);
  };
  return (
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
  );
};

export default Table;
