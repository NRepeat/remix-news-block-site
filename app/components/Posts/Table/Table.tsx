import {SerializeFrom} from '@remix-run/node';
import {useNavigate} from '@remix-run/react';
import {withZod} from '@remix-validated-form/with-zod';
import React, {FC, useState} from 'react';
import {ValidatedForm} from 'remix-validated-form';
import {z} from 'zod';
import {SubmitButton} from '~/components/UI/SubmitButton/SubmitButton';
import FormInput from '~/components/UI/ValidatedFormInput/ValidatedFormInput';
import {GetAllPostsType, PostWithTags} from '~/service/post.server';
import DeleteButton from '../Buttons/DeleteButton';

type PostTableType = {
  posts?: SerializeFrom<GetAllPostsType>;
  setSelectedPosts?: React.Dispatch<
    React.SetStateAction<SerializeFrom<PostWithTags>[]>
  >;
  selectedPosts?: SerializeFrom<PostWithTags>[];
};
const searchPostValidator = withZod(
  z.object({
    search: z.coerce.string(),
  })
);

const PostTable: FC<PostTableType> = ({
  posts,
  selectedPosts,
  setSelectedPosts,
}) => {
  const navigate = useNavigate();
  const [selectAll, setSelectAll] = useState(false);

  const handleCheckboxChange = (post: SerializeFrom<PostWithTags>) => {
    if (setSelectedPosts) {
      if (selectedPosts?.includes(post)) {
        setSelectedPosts(
          selectedPosts.filter(selectedPost => selectedPost.id !== post.id)
        );
      } else {
        setSelectedPosts([...(selectedPosts || []), post]);
      }
    }
  };

  const handleSelectAllChange = () => {
    if (setSelectedPosts) {
      setSelectAll(!selectAll);
      if (!selectAll) {
        setSelectedPosts(posts || []);
      } else {
        setSelectedPosts([]);
      }
    }
  };

  const handleRowClick = (postId: number) => {
    if (!setSelectedPosts) navigate(`/admin/posts/post/${postId}/edit`);
  };

  return (
    <div className=" p-4 w-full flex flex-col gap-2 ">
      <div className="w-full inline-flex items-center justify-end pr-4">
        <ValidatedForm
          className={'inline-flex h-12   w-full justify-end gap-1'}
          validator={searchPostValidator}
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
      <table className="table-fixed p-4 w-full">
        <thead className="border-2 border-gray-200 text-pretty">
          <tr className="text-xl uppercase text-left text-gray-600">
            {setSelectedPosts && (
              <th className="w-12 pl-4 h-12 justify-center items-center">
                <input
                  className="w-4 h-4 cursor-pointer"
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
              </th>
            )}

            <th className="pl-4 w-12">id</th>
            <th className="pl-4 w-20">Title</th>
            <th className="pl-10 min-w-2/3">Description</th>
            {!setSelectedPosts && <th className="pr-4 text-right">Delete</th>}
          </tr>
        </thead>
        <tbody className="odd:bg-slate-300 w-full">
          {posts &&
            posts.map(post => (
              <tr
                className="even:bg-slate-300 cursor-pointer hover:text-white hover:bg-sky-800"
                key={post.id}
                onClick={() => handleRowClick(post.id)}
              >
                {setSelectedPosts && (
                  <th className="w-12 h-12 justify-center items-center">
                    <input
                      onChange={() => handleCheckboxChange(post)}
                      checked={selectedPosts?.includes(post) || false}
                      className="w-4 h-4 cursor-pointer"
                      type="checkbox"
                    />
                  </th>
                )}
                <td className="w-12 pt-4 pb-4 text-center">{post.id}</td>
                <td className="pl-4">{post.title}</td>
                <td className="pl-10 w-2/3">{post.description} </td>
                {!setSelectedPosts && (
                  <td className="text-right pr-10">
                    <DeleteButton
                      action={`/admin/posts/post/${post.id}/delete`}
                      id={post.id}
                    />
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostTable;
