import {Baner} from '@prisma/client';
import {getImage} from './image.server';

export const updateBaner = async ({
  id,
  data,
}: {
  id?: number;
  data: {link?: string; imageId: number};
}) => {
  try {
    let baner: Baner | null;
    baner = await prisma.baner.findFirst({
      where: {id},
    });
    if (!baner) {
      baner = await createBaner({});
    }

    const updatedBaner = await prisma.baner.update({
      where: {id: baner.id},
      data: data,
    });
    return updatedBaner;
  } catch (error) {
    throw new Error('Error update baner');
  }
};
export const createBaner = async ({imageId}: {imageId?: number}) => {
  try {
    if (imageId) {
      const image = await getImage(imageId);
      if (!image) throw new Error('Image not found');
      const baner = prisma.baner.create({
        data: {imageId},
      });
      return baner;
    }
    const baner = prisma.baner.create({
      data: {},
    });

    return baner;
  } catch (error) {
    throw new Error('Error create baner');
  }
};

export const deleteBanerImage = async ({
  imageId,
  id,
}: {
  imageId?: number;
  id: number;
}) => {
  try {
    if (imageId) {
      const baner = prisma.baner.update({
        where: {id},
        data: {
          image: {
            disconnect: {
              id: imageId,
            },
          },
        },
      });
      return baner;
    }
  } catch (error) {
    throw new Error('Error delete baner');
  }
};

export const updateBanerLink = async (banerId: number, link: string) => {
  try {
    const baner = await prisma.baner.update({
      where: {id: banerId},
      data: {link},
    });
    return baner;
  } catch (error) {
    throw new Error('Error update baner link');
  }
};
