import {DndContext, MouseSensor, useSensor, useSensors} from '@dnd-kit/core';
import {Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import {useSubmit} from '@remix-run/react';
import {withZod} from '@remix-validated-form/with-zod';
import React, {FC, useEffect, useState} from 'react';
import {ValidatedForm} from 'remix-validated-form';
import {z} from 'zod';
import Modal from '~/components/Modal/Modal';
import PostTable from '~/components/Posts/Table/Table';
import {SubmitButton} from '~/components/UI/SubmitButton/SubmitButton';
import FormInput from '~/components/UI/ValidatedFormInput/ValidatedFormInput';
import WidgetFormWrapper from '~/components/WidgetFormWrapper/WidgetFormWrapper';
import {GetAllPostsType, PostWithTags} from '~/service/post.server';
import {WidgetInstance} from '~/types/types';
import DndPostWrapper from './DndPostWrapper/DndPostWrapper';
import DndTableWrapper from './DndTableWrapper/DndTableWrapper';
import DrugOverlay from './DrugOverlay/DrugOverlay';
type PostCarouselFormType = {
  widget: WidgetInstance;
  posts?: SerializeFrom<GetAllPostsType>;
  page?: SerializeFrom<Page>;
};

export const postCarouselFormValidator = withZod(
  z.object({
    posts: z.coerce.string().optional(),
    quantity: z.coerce.number().optional().default(10),
    id: z.coerce.string(),
    type: z.coerce.string().default('latest'),
    order: z.coerce.string().optional().default('desc'),
    carouselId: z.coerce.number().optional(),
  })
);

const Form: FC<PostCarouselFormType> = ({widget, posts, page}) => {
  const submit = useSubmit();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [option, setOption] = useState<string>('latest');
  const [selectedPosts, setSelectedPosts] = useState<
    SerializeFrom<GetAllPostsType>
  >([]);
  const [carouselId, setCarouselId] = useState<string>();
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 20,
    },
  });
  const sensors = useSensors(mouseSensor);
  useEffect(() => {
    if (page) {
      const content = JSON.parse(page.content) as WidgetInstance[];
      const widgetInstanceContent = content.find(w => w.id === widget.id)
        ?.additionalData?.content as string;
      if (widgetInstanceContent) {
        const {postsIds, type, existCarouselId} = JSON.parse(
          widgetInstanceContent
        ) as {postsIds: string; type: string; existCarouselId: string};
        const parsedPostsIds =
          typeof postsIds === 'string'
            ? (JSON.parse(postsIds) as number[])
            : postsIds;
        const filteredPosts = parsedPostsIds
          .map(id => posts?.find(post => post.id === id))
          .filter(post => post !== undefined) as SerializeFrom<PostWithTags>[];
        setCarouselId(existCarouselId);
        setSelectedPosts(filteredPosts);
        setOption(type);
      }
    }
  }, [page, posts, widget.id]);

  const handleOptionChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: string
  ) => {
    event.preventDefault();
    setOption(value);
  };

  const deleteWidget = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    submit(
      {containerId: widget.containerId, widgetId: widget.id, type: 'delete'},
      {method: 'delete', navigate: false}
    );
  };
  return (
    <WidgetFormWrapper widget={widget}>
      <div
        className={`flex w-full cursor-default justify-between gap-2 p-4 }  `}
      >
        <button
          className={`border-2 w-full rounded-sm pr-2 pl-2 ${option === 'popular' ? 'bg-gray-400' : 'bg-white'} `}
          onClick={e => handleOptionChange(e, 'popular')}
        >
          Popular
        </button>
        <button
          className={`border-2 w-full rounded-sm pr-2 pl-2 ${option === 'latest' ? 'bg-gray-400' : 'bg-white'} `}
          onClick={e => handleOptionChange(e, 'latest')}
        >
          Latest
        </button>
        <button
          className={`border-2 w-full rounded-sm pr-2 pl-2 ${option === 'manual' ? 'bg-gray-400' : 'bg-white'} `}
          onClick={e => handleOptionChange(e, 'manual')}
        >
          Manual selection
        </button>
      </div>
      {option === 'manual' && (
        <div className="flex flex-col p-4">
          <button
            className="inline-flex w-full border-2 items-center pt-2 pb-2 border-green-600 bg-green-200 rounded hover:border-black"
            onClick={e => {
              e.preventDefault(), setModalOpen(true);
            }}
            onKeyDown={() => setModalOpen(true)}
          >
            <p className="w-full text-center">Add post</p>
          </button>
          {modalOpen && (
            <Modal setIsOpen={setModalOpen} head="Add post">
              <PostTable
                setSelectedPosts={setSelectedPosts}
                selectedPosts={selectedPosts}
                posts={posts}
              />
            </Modal>
          )}
          {
            <DndContext id="3" sensors={sensors}>
              <DndTableWrapper
                data={selectedPosts}
                setSelectedPosts={setSelectedPosts}
              >
                {selectedPosts.map(post => (
                  <DndPostWrapper key={post.id} post={post} />
                ))}
              </DndTableWrapper>

              <DrugOverlay selectedPosts={selectedPosts} />
            </DndContext>
          }
        </div>
      )}
      <ValidatedForm
        className="p-4 pt-0 flex gap-2 flex-col justify-start items-start"
        validator={postCarouselFormValidator}
        method="post"
      >
        <FormInput
          type="hidden"
          name="posts"
          value={JSON.stringify(selectedPosts.map(post => post.id))}
        />
        <FormInput type="hidden" name="id" value={widget.id} />
        <FormInput type="hidden" name="carouselId" value={carouselId} />
        {option !== 'manual' && (
          <FormInput
            type="text"
            name="quantity"
            placeholder="Default 10 posts"
            label="Posts quantity"
          />
        )}

        <FormInput type="hidden" name="type" value={option} />
        <div className="inline-flex w-full justify-between">
          <SubmitButton classNames="border-2 w-1/3 border-green-600 rounded-sm hover:bg-green-200 pr-2 pl-2 hover:border-black">
            Save
          </SubmitButton>
          <button
            className="underline text-red-500 "
            onClick={e => deleteWidget(e)}
          >
            Delete
          </button>
        </div>
      </ValidatedForm>
    </WidgetFormWrapper>
  );
};

export default Form;
