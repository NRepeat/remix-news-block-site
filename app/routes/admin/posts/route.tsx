import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useSubmit } from '@remix-run/react';
import Pagination from '~/components/Pagination/Pagination';
import CreateButton from '~/components/Posts/Buttons/CreateButton';
import PostTable from '~/components/Posts/Table/Table';
import { getAllPosts, searchPosts } from '~/service/post.server';

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') ?? '1';
    const query = url.searchParams.get('search');
    const { totalPages, posts } = await getAllPosts({
      page: parseInt(page),
      pageSize: 3,
    });
    if (query && query !== '') {
      const searchedPosts = await searchPosts({ query });
      return json({ searchedPosts });
    }
    return json({ posts, totalPages, currentPage: page });
  } catch (error) {
    throw new Response('Bad request');
  }
}

export default function PostsRoute() {
  const data = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const HandlePageChange = (page: number) => {
    submit({ page });
  };

  if ('searchedPosts' in data) {
    return (
      <div
        style={{ gridArea: 'main' }}
        className="p-4 min-h-screen flex flex-col gap-2  bg-slate-100"
      >
        <div className="inline-flex gap-4 items-center border-b-2 pb-4">
          <p className="text-2xl text-pretty">Posts </p>
          <CreateButton />
        </div>
        <PostTable posts={data.searchedPosts} />
      </div>
    );
  } else {
    return (
      <div
        style={{ gridArea: 'main' }}
        className="p-4 min-h-screen flex flex-col gap-2  bg-slate-100"
      >
        <div className="inline-flex gap-4 items-center border-b-2 pb-4">
          <p className="text-2xl text-pretty">Posts </p>
          <CreateButton />
        </div>
        <PostTable posts={data.posts} />
        <Pagination
          currentPage={parseInt(data.currentPage)}
          totalPages={data.totalPages}
          onPageChange={HandlePageChange}
        />
      </div>
    );
  }
}
