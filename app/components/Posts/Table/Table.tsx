import { SerializeFrom } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import { FC } from 'react';
import { GetAllPostsType } from '~/service/post.server';
import DeleteButton from '../Buttons/DeleteButton';

type PostTableType = {
	posts?: SerializeFrom<GetAllPostsType>,

}




const PostTable: FC<PostTableType> = ({ posts }) => {

	const navigate = useNavigate()
	const handleRowClick = (postId: number) => {

		navigate(`/admin/posts/post/${postId}/edit`);
	}
	return (
		<table className='table-fixed  p-4  w-full  '   >
			<thead className='border-2 border-gray-200  text-pretty '>
				<tr className='  text-xl uppercase text-left text-gray-600'>

					<th className='pl-4 w-12'>id</th>
					<th className='pl-4 w-20'>Title</th>
					<th className=' pl-10 min-w-2/3  '>Description</th>
					<th className='pr-4 text-right'>Delete</th>
				</tr>
			</thead>
			<tbody className='odd:bg-slate-300  w-full'>
				{posts && posts.map((post) => (
					<tr className='even:bg-slate-300    cursor-pointer hover:text-white hover:bg-sky-800' key={post.id} onClick={() => handleRowClick(post.id)}>

						<td className='w-12 pt-4 pb-4 text-center'>{post.id}</td>
						<td className='pl-4' >{post.title} Title</td>
						<td className='pl-10 w-2/3 '>{post.description}description </td>
						<td className='  text-right pr-10' > <DeleteButton id={post.id} /></td>
						{/* <td>{post.createdAt}</td> */}
					</tr>
				))}
			</tbody>
		</table>
	);
};


export default PostTable



