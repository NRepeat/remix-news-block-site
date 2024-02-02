import {LoaderFunctionArgs, json} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';
import CreateTextButton from '~/components/Text/CreateTextButton/CreateTextButton';
import Table from '~/components/Text/Table/Table';
import {getAllTexts, searchTexts} from '~/service/text.server';

export async function loader({request}: LoaderFunctionArgs) {
  try {
    const texts = await getAllTexts();
    const url = new URL(request.url);
    const query = url.searchParams.get('search');
    if (query && query !== '') {
      const searchedTexts = await searchTexts({query});
      return json({searchedTexts});
    }
    return json({texts});
  } catch (error) {
    throw new Response('Bad request');
  }
}

export default function Content() {
  const data = useLoaderData<typeof loader>();
  if ('searchedTexts' in data) {
    return (
      <div style={{gridArea: 'main'}} className="p-4 flex flex-col gap-2">
        <div className="inline-flex gap-4 items-center border-b-2 w-full pb-4">
          <p className="text-2xl text-pretty">Texts</p>
          <CreateTextButton />
        </div>
        <Table texts={data.searchedTexts} />
      </div>
    );
  }
  return (
    <div style={{gridArea: 'main'}} className="p-4 flex flex-col gap-2">
      <div className="inline-flex gap-4 items-center border-b-2 w-full pb-4">
        <p className="text-2xl text-pretty">Texts</p>
        <CreateTextButton />
      </div>
      <Table texts={data.texts} />
    </div>
  );
}
