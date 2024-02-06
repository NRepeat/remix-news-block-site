import {WidgetInstance} from '~/types/types';
import {getPage, getPageContent, updatePageContent} from './page.server';

export const getElement = async ({id, slug}: {id: string; slug: string}) => {
  try {
    const page = await getPage({slug});
    if (!page) throw new Error('Not found');

    const content: [] = JSON.parse(page.content as string);
    const elements: WidgetInstance[] = content.map(item =>
      typeof item === 'string' ? JSON.parse(item) : item
    );
    const element = elements.find(el => el.id === id);
    if (!element) throw new Error('Not found');
    return element;
  } catch (error) {
    throw new Error('Not found');
  }
};

export const updateElement = async ({
  id,
  content,
  slug,
}: {
  slug: string;
  id: string;
  content: string;
}) => {
  try {
    const element = (await getElement({id, slug})) as WidgetInstance;
    const page = await getPage({slug});
    if (!page) throw new Error('Not found');
    const pageContent: WidgetInstance[] = JSON.parse(page.content as string);

    const elementIndex = pageContent.findIndex(el => el.id === id);
    pageContent;
    const newElement = {
      ...element,
      additionalData: {
        ...element.additionalData,
        content: content,
      },
    };

    await updatePageContent({
      content: newElement,
      index: elementIndex,
      slug,
    });
  } catch (error) {
    throw new Error('Error update element');
  }
};

export const removeElement = async ({id, slug}: {id: string; slug: string}) => {
  try {
    const pageContent = await getPageContent({slug});
    if (!pageContent) throw new Error('not found');

    const parsedPageContent = JSON.parse(pageContent.content as string);
    if (Array.isArray(parsedPageContent)) {
      const trueParsedPageContent: WidgetInstance[] = parsedPageContent.map(
        c => (typeof c === 'string' ? JSON.parse(c) : c)
      );
      return await prisma.page.update({
        where: {slug},
        data: {
          content: JSON.stringify(
            trueParsedPageContent.filter(c => c.id !== id)
          ),
        },
      });
    }
    return await prisma.page.update({
      where: {slug},
      data: {content: ''},
    });
  } catch (error) {
    throw new Error('Not found');
  }
};
