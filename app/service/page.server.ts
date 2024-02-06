import {WidgetInstance} from '~/types/types';
import {prisma} from '~/utils/prisma.server';

export const createPage = async () => {
  try {
    await prisma.page.create({data: {name: 'main', content: '', slug: 'main'}});
  } catch (error) {
    throw new Error('Bad request');
  }
};

export const updatePage = async ({
  slug,
  jsonContent,
}: {
  slug: string;
  jsonContent: string;
}) => {
  try {
    return await prisma.page.update({
      where: {slug},
      data: {
        content: jsonContent,
      },
      select: {content: true, slug: true},
    });
  } catch (error) {
    throw new Error('bad request');
  }
};

export const getAllPages = async () => {
  try {
    const pages = await prisma.page.findMany();
    return pages;
  } catch (error) {
    throw new Error('not found ');
  }
};

export const getPage = async ({slug}: {slug: string}) => {
  try {
    const pageContent = await prisma.page.findUnique({
      where: {slug},
    });
    return pageContent;
  } catch (error) {
    throw new Error('not found ');
  }
};

export const getPageContent = async ({slug}: {slug: string}) => {
  try {
    const pageContent = await prisma.page.findUnique({
      where: {slug},
      select: {content: true},
    });
    return pageContent;
  } catch (error) {
    throw new Error('not found ');
  }
};
export const updatePageContent = async ({
  slug,
  content,
  index,
}: {
  slug: string;
  content: WidgetInstance;
  index: number;
}) => {
  console.log('🚀 ~   index:', index);
  try {
    const stringifiedWidget = JSON.stringify(content);
    const prevPageContent = await getPageContent({slug});
    console.log('🚀 ~ prevPageContent:', stringifiedWidget);

    if (prevPageContent?.content === '[]') {
      console.log('🚀 ~ prevPageContent:', prevPageContent);

      return prisma.page.update({
        where: {slug},
        data: {content: stringifiedWidget},
        select: {content: true},
      });
    }

    // const pageContent = await prisma.page.update({
    //   where: {slug},
    //   data: {content:newContent},
    //   select: {content: true},
    // });

    // return pageContent;
  } catch (error) {
    throw new Error('Not found');
  }
};
