import { SerializeFrom } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import { FC } from 'react';
import { GetAllPostsType } from '~/service/post.server';

type PostTableType = {
	posts?: SerializeFrom<GetAllPostsType>,

}




const PostTable: FC<PostTableType> = ({ posts }) => {

	const navigate = useNavigate()

	return (
		<table className='table-fixed w-full p-4'  >
			<thead className='border-2 border-gray-200 text-pretty '>
				<tr className='h-full text-xl uppercase  p-4 text-gray-600'>

					<th>id</th>
					<th>Title</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody className='odd:bg-slate-300'>
				{posts && posts.map((post) => (
					<tr key={post.id} onClick={() => navigate("/")}>

						<td>{post.id}</td>
						<td>{post.title}</td>
						<td>{post.description}</td>
						{/* <td>{post.createdAt}</td> */}
					</tr>
				))}
			</tbody>
		</table>
	);
};


export default PostTable