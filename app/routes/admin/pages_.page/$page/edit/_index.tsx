import {
  LoaderFunctionArgs,
  json,
  type ActionFunctionArgs,
} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';
import {withZod} from '@remix-validated-form/with-zod';
import {validationError} from 'remix-validated-form';
import {z} from 'zod';
import {zfd} from 'zod-form-data';
import EditPage from '~/components/EditPage/EditPage';
import {imageLinkValidator} from '~/components/ImageCarouselWidget/Wrapper/Wrapper';
import {textValidator} from '~/components/TextWidget/Form/Form';
import {getAllImages, updateImage} from '~/service/image.server';
import {getPage, updatePage, updatePageContent} from '~/service/page.server';
import {getAllPosts} from '~/service/post.server';
import {createText} from '~/service/text.server';
import {removeElement, updateElement} from '~/service/widget.server';
import {banerActions} from './banerAction';
import {createImageCarouselAction} from './createImageCarouselAction';
import {postActions} from './postAction';

export const buttonFromDataValidator = withZod(
  z.object({
    page: zfd.text(),
    newElement: zfd.text(),
    index: zfd.text(),
  })
);
export async function loader({params, request}: LoaderFunctionArgs) {
  try {
    const slug = params.page;
    if (!slug) throw new Error('Not found');
    const url = new URL(request.url);
    const currentPage = url.searchParams.get('page') ?? '1';
    const {totalPages: totalPostsPages, posts} = await getAllPosts({
      page: parseInt(currentPage),
      pageSize: 10,
    });
    const page = await getPage({slug});
    if (!page) throw new Error('Not found');
    const {images, totalPages: totalImagePages} = await getAllImages({
      page: parseInt(currentPage),
      pageSize: 10,
    });
    return json({
      posts,
      page,
      totalPostsPages,
      images,
      totalImagePages,
      currentPage,
    });
  } catch (error) {
    throw new Error('s');
  }
}

export async function action({params, request}: ActionFunctionArgs) {
  try {
    const slug = params.page;
    if (!slug) throw new Error('Not found');
    const formData = await request.formData();
    if (formData.get('isBaner') === 'true') {
      await banerActions(formData, slug);
      return json({success: true});
    }
    4;
    if (formData.has('link')) {
      const validatedData = await imageLinkValidator.validate(formData);
      if (validatedData.error) {
        return validationError({
          fieldErrors: {id: 'Not valid data'},
        });
      }
      await updateImage({
        id: validatedData.data.id,
        data: {link: validatedData.data.link},
      });
      return json({success: true});
    }
    if (formData.has('imagesIds')) {
      await createImageCarouselAction({formData});
      return json({success: true});
    }
    const postsData = formData.get('posts') as string;

    if (postsData) {
      await postActions(formData, slug);
      return json({success: true});
    }
    if (formData.get('type') === 'drop') {
      const widgets = formData.get('widgets') as string;
      await updatePage({
        slug: 'main',
        jsonContent: widgets,
      });
      return json({success: true});
    }
    if (formData.get('type') === 'delete') {
      const id = formData.get('widgetId') as string;
      await removeElement({id, slug});
      return json({success: true});
    }
    if (formData.get('type') === 'textWidget') {
      const validatedTextWidgetData = await textValidator.validate(formData);
      if (validatedTextWidgetData.error) {
        throw new Error('Bad request');
      }
      const {id, text, title} = validatedTextWidgetData.data;
      await createText({slug, title, article: text});
      await updateElement({content: JSON.stringify({text, title}), id, slug});
      return json({success: true});
    }
    const validatedData = await buttonFromDataValidator.validate(formData);
    if (validatedData.error) {
      throw new Error('Bad request');
    }
    const newWidget = JSON.stringify(validatedData.data.newElement);
    const index = validatedData.data.index;
    await updatePageContent({
      index: parseInt(index),
      slug,
      content: newWidget,
    });
    return json({newWidget});
  } catch (error) {
    throw new Response('Bad request');
  }
}

export default function Index() {
  const {posts, page, images} = useLoaderData<typeof loader>();
  return <EditPage images={images} page={page} posts={posts} />;
}
