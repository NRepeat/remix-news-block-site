import {SerializeFrom} from '@remix-run/node';
import {useNavigate} from '@remix-run/react';
import React, {FC, useState} from 'react';
import {GetAllPostsType, PostWithTags} from '~/service/post.server';
import DeleteButton from '../Buttons/DeleteButton';

type PostTableType = {
  posts?: SerializeFrom<GetAllPostsType>;
  setSelectedPosts?: React.Dispatch<
    React.SetStateAction<SerializeFrom<PostWithTags>[]>
  >;
  selectedPosts?: SerializeFrom<PostWithTags>[];
};

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
  );
};

export default PostTable;
