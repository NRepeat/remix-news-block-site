import {json, useLoaderData} from '@remix-run/react';
import Table from '~/components/Pages/Table/Table';
import {getAllPages} from '~/service/page.server';

export async function loader() {
  try {
    const pages = await getAllPages();
    return json({pages});
  } catch (error) {
    throw new Response('Bad request');
  }
}

export default function PagesRoute() {
  const data = useLoaderData<typeof loader>();
  return (
    <div style={{gridArea: 'main'}} className="p-4 flex flex-col gap-2">
      <div className="inline-flex gap-4 items-center pb-4 border-b-2 w-full">
        <p className="text-2xl text-pretty">Pages </p>
      </div>
      <Table pages={data.pages} />
    </div>
  );
}
