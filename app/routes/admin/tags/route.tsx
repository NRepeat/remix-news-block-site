import {json} from '@remix-run/node';
import {getAllTags} from '~/service/tags.server';
export async function loader() {
  try {
    const tags = await getAllTags();
    return json({tags});
  } catch (error) {
    throw new Response('Bad request');
  }
}

export default function TagsRoute() {
  // const data =  useLoaderData<typeof loader>()
  return <div></div>;
}
