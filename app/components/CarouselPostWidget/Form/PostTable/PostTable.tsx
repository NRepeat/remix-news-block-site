import { SerializeFrom } from '@remix-run/node';
import React, { FC } from 'react';
import { GetAllPostsType, PostWithTags } from '~/service/post.server';

type PostTableType = {
	posts?: SerializeFrom<GetAllPostsType>,
	setSelectedPosts?: React.Dispatch<React.SetStateAction<SerializeFrom<GetAllPostsType>>>
	selectedPosts?: SerializeFrom<GetAllPostsType>
}




const PostTable: FC<PostTableType> = ({ posts, setSelectedPosts, selectedPosts }) => {

	const handleCheckboxChange = (post: SerializeFrom<PostWithTags>) => {

		if (setSelectedPosts) {
			if (selectedPosts?.includes(post)) {
				setSelectedPosts(selectedPosts.filter((selectedPost) => selectedPost.id !== post.id));
			} else {
				setSelectedPosts([...(selectedPosts || []), post]);
			}
		}
	};

	return (
		<table>
			<thead>
				<tr>
					<th>
						<input type="checkbox" />
					</th>
					<th>id</th>
					<th>Title</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				{posts && posts.map((post) => (
					<tr key={post.id}>
						<td>
							<input
								type="checkbox"
								onChange={() => handleCheckboxChange(post)}
								checked={selectedPosts?.includes(post) || false}
								disabled={!setSelectedPosts}
							/>
						</td>
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