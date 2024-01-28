import { SerializeFrom } from '@remix-run/node';
import { withZod } from '@remix-validated-form/with-zod';
import React, { FC, useEffect, useState } from 'react';
import { ValidatedForm } from 'remix-validated-form';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import Modal from '~/components/Modal/Modal';
import { SubmitButton } from '~/components/UI/SubmitButton/SubmitButton';
import FormInput from '~/components/UI/ValidatedFormInput/ValidatedFormInput';
import WidgetFormWrapper from '~/components/WidgetFormWrapper/WidgetFormWrapper';
import { GetAllPostsType, PostWithTags } from '~/service/post.server';
import { WidgetInstance } from '~/types/types';
import DndPostWrapper from './DndPostWrapper/DndPostWrapper';
import DndTableWrapper from './DndTableWrapper/DndTableWrapper';
import PostTable from './PostTable/PostTable';

type PostCarouselFormType = {
	widget: WidgetInstance;
	posts?: SerializeFrom<GetAllPostsType>,

};

export const postCarouselForm = withZod(z.object({
	posts: zfd.text(),
	quantity: z.coerce.number()
}))

const Form: FC<PostCarouselFormType> = ({ widget, posts }) => {
	const [modalOpen, setModalOpen] = useState<boolean>(false)
	const [option, setOption] = useState<string>('');
	const [selectedPosts, setSelectedPosts] = useState<SerializeFrom<GetAllPostsType>>([]);
	const [filteredPosts, setFilteredPosts] = useState<SerializeFrom<PostWithTags[]> | []>([])



	const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setOption(event.target.value);
		// if (event.target.value === 'manual') {
		// 	setIsOpen(true);
		// } else {
		// 	setSelectedPosts([]);
		// }
	};
	useEffect(() => {
		setFilteredPosts(posts?.filter(post => selectedPosts.includes(post)) || [])

	}, [posts, selectedPosts])
	return (
		<WidgetFormWrapper widget={widget}>
			<select name="postGetOption" id="postGetOption" value={option} onChange={handleOptionChange}>
				<option value="">Popular</option>
				<option value="">Latest</option>
				<option value="manual">Manual selection</option>
			</select>
			{option === 'manual' && (
				<div >

					<button onClick={() => setModalOpen(true)} onKeyDown={() => setModalOpen(true)}>
						<p>Add post</p>
					</button>
					{modalOpen && (
						<Modal setIsOpen={setModalOpen} head="Add post">
							<PostTable setSelectedPosts={setSelectedPosts} selectedPosts={selectedPosts} posts={posts} />
						</Modal>
					)}
					{
						<DndTableWrapper data={filteredPosts} setSelectedPosts={setSelectedPosts} >
							{selectedPosts.map(post => <DndPostWrapper key={post.id} post={post} />)}
						</DndTableWrapper>
					}
				</div>
			)}
			<ValidatedForm validator={postCarouselForm} method='post' >
				<FormInput type="hidden" name="posts" value={JSON.stringify(selectedPosts.map(post => post.id))} />
				<FormInput type="text" name="quantity" label="Posts quantity" />
				<SubmitButton >Submit</SubmitButton>
			</ValidatedForm>
		</WidgetFormWrapper>
	);
};

export default Form





