import {Image, Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import {useState} from 'react';
import {PostWithTags} from '~/service/post.server';
import DropZone from '../DropZone/DropZone';

type EditPageType = {
  images: SerializeFrom<Image[]>;
  page: SerializeFrom<Page>;
  posts: SerializeFrom<PostWithTags[]>;
};

const EditPage = ({images, page, posts}: EditPageType) => {
  const [isSave, setSave] = useState<boolean | 'save'>(false);

  return (
    <div
      style={{gridArea: 'main'}}
      className="flex flex-col relative bg-gray-100  p-4"
    >
      <div className="inline-flex w-full justify-between">
        <p className="text-2xl pb-4 border-b-2 ">
          Edit page: {page.name.toUpperCase()}{' '}
        </p>
        {isSave && (
          <button
            className="pt-1 pr-2 pl-2 pb-1 bg-green-200 border-2 border-green-500  "
            onClick={() => setSave('save')}
          >
            Save position
          </button>
        )}
      </div>

      <DropZone
        page={page}
        isSave={isSave}
        setSave={setSave}
        posts={posts}
        images={images}
      />
    </div>
  );
};

export default EditPage;
