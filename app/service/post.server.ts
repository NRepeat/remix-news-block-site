import {Post, Tag} from '@prisma/client';
import {prisma} from '~/utils/prisma.server';

export type PostWithTags = {
  TagPost: {
    id: number;
    tag: Tag;
  }[];
} & Post;
type GetAllPostsParams = {
  page: number;
  pageSize: number;
};
export type GetAllPostsType = PostWithTags[];
type updatePostType = {
  title?: string;
  article?: string;
  description?: string;
  thumbnail?: string;
};
export const getAllPosts = async ({
  page,
  pageSize,
}: GetAllPostsParams): Promise<{
  posts: GetAllPostsType;
  totalPages: number;
}> => {
  try {
    const posts = await prisma.post.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {TagPost: {select: {id: true, tag: true}}},
    });
    const totalPostsCount = await prisma.post.count();
    return {posts, totalPages: Math.ceil(totalPostsCount / pageSize)};
  } catch (error) {
    throw new Error('Get post  error');
  }
};

export const getPostById = async (
  postId: number
): Promise<PostWithTags | null> => {
  try {
    const post = await prisma.post.findUnique({
      where: {id: postId},
      include: {TagPost: {select: {id: true, tag: true}}},
    });
    return post;
  } catch (error) {
    throw new Error('Get post by ID error');
  }
};

export const getPostBySlug = async (postSlug: string) => {
  try {
    const post = await prisma.post.findUnique({
      where: {slug: postSlug},
    });
    return post;
  } catch (error) {
    throw new Error('Get post by slug error');
  }
};

export const updatePost = async (
  postId: number,
  updatedData: updatePostType
) => {
  try {
    const updatedPost = await prisma.post.update({
      where: {id: postId},
      data: {
        article: updatedData.article,
        description: updatedData.article,
        slug: updatedData.title,
      },
    });
    return updatedPost;
  } catch (error) {
    throw new Error('Update post error');
  }
};

export const deletePost = async (postId: number) => {
  try {
    const deletedPost = await prisma.post.delete({
      where: {id: postId},
    });
    return deletedPost;
  } catch (error) {
    throw new Error('Delete post error');
  }
};

export const createPost = async (slug: string) => {
  try {
    const post = await prisma.post.create({
      data: {slug: slug, title: slug},
    });

    return post;
  } catch (error) {
    throw new Error('Create post error');
  }
};

export const connectImageToPost = async (id: number, imageId: number) => {
  try {
    const post = await prisma.post.update({
      where: {id},
      data: {
        image: {connect: {id: imageId}},
      },
    });
    return post;
  } catch (error) {
    throw new Error('Create post error');
  }
};

export const getLatestPosts = async ({
  quantity,
}: {
  quantity: number;
}): Promise<Post[]> => {
  try {
    const posts = await prisma.post.findMany({
      take: quantity,
      orderBy: {createdAt: 'desc'},
    });

    return posts;
  } catch (error) {
    throw new Error('Error find latest posts');
  }
};
type order = 'asc' | 'desc';

export const getPostsByRating = async ({
  quantity,
  order,
}: {
  quantity: number;
  order: order;
}) => {
  try {
    const posts = await prisma.post.findMany({
      take: quantity,
      orderBy: {rating: order},
    });

    return posts;
  } catch (error) {
    throw new Error('Error find latest posts');
  }
};

export const disconnectImagePost = async (id: number, imageId: number) => {
  try {
    const post = await prisma.post.update({
      where: {id},
      data: {
        image: {disconnect: {id: imageId}},
      },
    });
    return post;
  } catch (error) {
    throw new Error('Create post error');
  }
};

export const searchPosts = async ({query}: {query: string}) => {
  try {
    const searchResults = await prisma.post.findMany({
      where: {
        OR: [
          {title: {contains: query, mode: 'insensitive'}},
          {article: {contains: query, mode: 'insensitive'}},
        ],
      },
      include: {TagPost: {select: {id: true, tag: true}}},
    });

    return searchResults;
  } catch (error) {
    throw new Error('Error searching for posts');
  }
};
