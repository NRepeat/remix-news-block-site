import {prisma} from '~/utils/prisma.server';

export const createText = async ({
  slug,
  title,
  article,
}: {
  slug: string;
  title: string;
  article: string;
}) => {
  try {
    const page = await prisma.page.findUnique({
      where: {slug},
    });

    if (!page) {
      const newText = await prisma.text.create({
        data: {
          title,
          article,
        },
      });
      return newText;
    }

    const newText = await prisma.text.create({
      data: {
        title,
        Page: {
          connect: {id: page?.id},
        },
      },
    });

    return newText;
  } catch (error) {
    throw new Error('Error create text');
  }
};

export const getAllTexts = async () => {
  try {
    const allTexts = await prisma.text.findMany();
    return allTexts;
  } catch (error) {
    throw new Error('Error fetching all texts');
  }
};
export const getTextById = async (id: number) => {
  try {
    const text = await prisma.text.findUnique({
      where: {id},
    });
    if (!text) throw new Error('Text not found');
    return text;
  } catch (error) {
    throw new Error('Error fetching all texts');
  }
};

export const updateText = async (
  id: number,
  data: {article: string; title: string}
) => {
  try {
    const text = await prisma.text.update({
      where: {id},
      data,
    });
    if (!text) throw new Error('Text not found');
    return text;
  } catch (error) {
    throw new Error('Error update text');
  }
};

export const deleteText = async (id: number) => {
  try {
    const text = await prisma.text.delete({
      where: {id},
    });
    if (!text) throw new Error('Text not found');
    return text;
  } catch (error) {
    throw new Error('Error delete text');
  }
};

export const searchTexts = async ({query}: {query: string}) => {
  try {
    const searchResults = await prisma.text.findMany({
      where: {
        OR: [
          {title: {contains: query, mode: 'insensitive'}},
          {article: {contains: query, mode: 'insensitive'}},
        ],
      },
    });

    return searchResults;
  } catch (error) {
    throw new Error('Error searching for posts');
  }
};
