import { Page } from '@prisma/client';
import { SerializeFrom } from '@remix-run/node';
import { useFetcher } from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import React, { FC, useState } from 'react';
import { ValidatedForm } from 'remix-validated-form';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import Modal from '~/components/Modal/Modal';
import PostTable from '~/components/Posts/Table/Table';
import { SubmitButton } from '~/components/UI/SubmitButton/SubmitButton';
import FormInput from '~/components/UI/ValidatedFormInput/ValidatedFormInput';
import WidgetFormWrapper from '~/components/WidgetFormWrapper/WidgetFormWrapper';
import { GetAllPostsType, PostWithTags } from '~/service/post.server';
import { WidgetInstance } from '~/types/types';
import DndPostWrapper from './DndPostWrapper/DndPostWrapper';
import DndTableWrapper from './DndTableWrapper/DndTableWrapper';

type PostCarouselFormType = {
	widget: WidgetInstance;
	posts?: SerializeFrom<GetAllPostsType>,
	page: SerializeFrom<Page>
};

export const postCarouselForm = withZod(z.object({
	posts: zfd.text(),
	// quantity: z.coerce.number(),
	id: z.coerce.string()
}))

const Form: FC<PostCarouselFormType> = ({ widget, posts, page }) => {

	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [option, setOption] = useState<string>('');
	const [selectedPosts, setSelectedPosts] = useState<SerializeFrom<GetAllPostsType>>([]);



	if (posts) {
		const content = JSON.parse(page.content) as WidgetInstance[];
		const widgetInstanceContent = content.find(w => w.id === widget.id)?.additionalData?.content as string;
		const { posts: postsIds } = JSON.parse(widgetInstanceContent) as { posts: number[] };


		const filteredPosts = postsIds.map(id => posts.find(post => post.id === id)).filter(post => post !== undefined) as SerializeFrom<PostWithTags>[];

		if (selectedPosts.length === 0 && filteredPosts.length > 0) {
			setSelectedPosts(filteredPosts);
		}
	}



	const handleOptionChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: string) => {
		event.preventDefault()
		setOption(value);

	};
	const fetcher = useFetcher()


	return (
		<WidgetFormWrapper widget={widget}>
			<select name="postGetOption" id="postGetOption" value={option} onChange={handleOptionChange}>
				<option value="">Popular</option>
				<option value="">Latest</option>
				<option value="manual">Manual selection</option>
			</select>
			<button onClick={(e) => handleOptionChange(e, 'manual')}>manual</button>
			{option === 'manual' && (
				<div >

					<button onClick={(e) => { e.preventDefault(), setModalOpen(true) }} onKeyDown={() => setModalOpen(true)}>
						<p>Add post</p>
					</button>
					{modalOpen && (
						<Modal setIsOpen={setModalOpen} head="Add post">
							<PostTable setSelectedPosts={setSelectedPosts} selectedPosts={selectedPosts} posts={posts} />
						</Modal>
					)}
					{
						<DndTableWrapper data={selectedPosts} setSelectedPosts={setSelectedPosts} >
							{selectedPosts.map(post => <DndPostWrapper key={post.id} post={post} />)}
						</DndTableWrapper>
					}
				</div>
			)}
			<ValidatedForm validator={postCarouselForm} method='post' navigate={false} fetcher={fetcher} >
				<FormInput type="hidden" name="posts" value={JSON.stringify(selectedPosts.map(post => post.id))} />
				<FormInput type="hidden" name="id" value={widget.id} />
				{!selectedPosts &&
					<FormInput type="text" name="quantity" label="Posts quantity" />
				}
				<SubmitButton >Submit</SubmitButton>
			</ValidatedForm>
		</WidgetFormWrapper>
	);
};

export default Form





