import type {ActionFunctionArgs} from '@remix-run/node';
import {LoaderFunctionArgs} from '@remix-run/node';
import {json, useLoaderData} from '@remix-run/react';
import MediaLibrary from '~/components/Media/MediaLibrary/MediaLibrary';
import {deleteImage, getAllImages, searchImage} from '~/service/image.server';

export async function loader({request}: LoaderFunctionArgs) {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') ?? '1';
    const {images, totalPages} = await getAllImages({
      page: parseInt(page),
      pageSize: 10,
    });

    const query = url.searchParams.get('search');
    if (query && query !== '') {
      const searchedImage = await searchImage({query});
      return json({searchedImage, totalPages, currentPage: page});
    }
    return json({images, totalPages, currentPage: page});
  } catch (error) {
    throw new Response('Bad response');
  }
}

export async function action({request}: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const imageIdToDelete = formData.get('imageIdToDelete') as string;
    if (imageIdToDelete) {
      await deleteImage({id: parseInt(imageIdToDelete)});
    }

    return json({success: true});
  } catch (error) {
    throw new Response('Bad response');
  }
}

export default function MediaRoute() {
  const data = useLoaderData<typeof loader>();
  if ('searchedImage' in data) {
    return (
      <div
        style={{gridArea: 'main'}}
        className="p-4 min-h-screen flex flex-col gap-2  bg-slate-100"
      >
        <div className="inline-flex gap-4 items-center pb-4 border-b-2 w-full">
          <p className="text-2xl text-pretty">Media </p>
        </div>
        <MediaLibrary
          isBaner={false}
          action="/admin/media/upload"
          images={data.searchedImage}
        />
      </div>
    );
  }
  return (
    <div
      style={{gridArea: 'main'}}
      className="p-4 min-h-screen flex flex-col gap-2  bg-slate-100"
    >
      <div className="inline-flex gap-4 items-center pb-4 border-b-2 w-full">
        <p className="text-2xl text-pretty">Media </p>
      </div>
      <MediaLibrary
        isBaner={false}
        action="/admin/media/upload"
        images={data.images}
      />
    </div>
  );
}
