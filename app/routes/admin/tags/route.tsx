import type {ActionFunctionArgs} from '@remix-run/node';
import {LoaderFunctionArgs, json} from '@remix-run/node';
import {useActionData, useLoaderData} from '@remix-run/react';
import {useState} from 'react';
import {z} from 'zod';
import Table from '~/components/Tags/Table/Table';
import TagsEdit from '~/components/Tags/TagsEdit/TagsEdit';
import {getAllTags, getTagBySlug, searchTags} from '~/service/tags.server';

export async function loader({request}: LoaderFunctionArgs) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('search');
    if (query && query !== '') {
      const tags = await searchTags({search: query});

      return json({tags});
    }
    const tags = await getAllTags();
    return json({tags});
  } catch (error) {
    throw new Response('Bad request');
  }
}

export async function action({request}: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const slug = formData.get('slug');
    const tag = await getTagBySlug({slug: z.coerce.string().parse(slug)});
    return json({tag});
  } catch (error) {
    throw new Response('Bad request');
  }
}

export default function TagsRoute() {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div style={{gridArea: 'main'}} className="p-4 flex flex-col gap-2">
      {actionData && (
        <TagsEdit tag={actionData.tag} setIsOpen={setIsOpen} isOpen={isOpen} />
      )}
      <Table tags={data.tags} />
    </div>
  );
}
