import { Tag } from '@prisma/client';

export const createTags = async ({tags}: {tags: string[]}) => {
  try {
    const existingTags = await prisma.tag.findMany({
      where: {
        slug: {
          in: tags,
        },
      },
    });

    const uniqueTags = tags.filter(
      tag => !existingTags.some(existingTag => existingTag.slug === tag)
    );

    await prisma.tag.createMany({
      data: uniqueTags.map(tag => ({name: tag, slug: tag})),
    });

    const createdTags = await prisma.tag.findMany({
      where: {
        slug: {
          in: uniqueTags,
        },
      },
    });

    return createdTags;
  } catch (error) {
    throw new Error('Failed to create tags');
  }
};

export const searchTags = async ({search}: {search: string | null}) => {
  try {
    let tags;
    if (!search) {
      tags = await prisma.tag.findMany();
      return tags;
    }
    tags = await prisma.tag.findMany({
      where: {slug: {startsWith: search.toLowerCase()}},
    });
    return tags;
  } catch (error) {
    throw new Error('Failed to search tags');
  }
};

export const getAllTags = async () => {
  try {
    const tags = await prisma.tag.findMany();
    return tags;
  } catch (error) {
    throw new Error('Failed to get tags');
  }
};
export const deleteTag = async (id: number) => {
  try {
    const deletedTag = prisma.tag.delete({
      where: {id},
    });
    return deletedTag;
  } catch (error) {
    throw new Error('Failed to delete tags');
  }
};

export const connectTagsToPost = async ({
  postId,
  tags,
}: {
  postId: number;
  tags: Tag[];
}) => {
  try {
    const post = await prisma.post.findUnique({where: {id: postId}});

    if (!post) {
      throw new Error(`Post with id ${postId} not found.`);
    }

    const connectTags = await prisma.tag.findMany({
      where: {id: {in: tags.map(tag => tag.id)}},
    });

    await prisma.tagPost.createMany({
      data: connectTags.map(tag => ({
        postId,
        tagId: tag.id,
      })),
      skipDuplicates: true,
    });
  } catch (error) {
    throw new Error('Failed to connect tags to post');
  }
};

export const disconnectTagsToPost = async ({id}: {id: number}) => {
  try {
    await prisma.tagPost.delete({
      where: {id},
    });
  } catch (error) {
    throw new Error('Error disconnect tag');
  }
};

export const getTagBySlug = async ({slug}:{slug:string}) => {
  try {
    const tag = await prisma.tag.findUnique({
      where:{slug}
    });
    if(!tag) throw new Error ("Tag not found")
    return tag;
  } catch (error) {
    throw new Error('Failed to get tags');
  }
};