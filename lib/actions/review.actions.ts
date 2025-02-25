'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { formatError } from '@/lib/utils';
import { insertReviewSchema } from '@/lib/validator';

export async function createUpdateReview(data: z.infer<typeof insertReviewSchema>) {
  try {
    const session = await auth();
    if (!session) throw new Error('User is not authenticated');

    // Validate and store review data and userId
    const review = insertReviewSchema.parse({
      ...data,
      userId: session?.user?.id,
    });

    // Get the product being reviewed
    const product = await prisma.product.findFirst({
      where: { id: review.productId },
    });

    if (!product) throw new Error('Product not found');

    // Check if user has already reviewed this product
    const reviewExists = await prisma.review.findFirst({
      where: {
        productId: review.productId,
        userId: review.userId,
      },
    });

    // If review exists, update it, otherwise create a new one
    await prisma.$transaction(async (tx) => {
      if (reviewExists) {
        await tx.review.update({
          where: { id: reviewExists.id },
          data: {
            title: review.title,
            description: review.description,
            rating: review.rating,
          },
        });
      } else {
        await tx.review.create({ data: review });
      }

      // Get the average rating
      const averageRating = await tx.review.aggregate({
        _avg: { rating: true },
        where: { productId: review.productId },
      });

      // Get the number of reviews
      const numReviews = await tx.review.count({
        where: { productId: review.productId },
      });

      // Update rating and  number of reviews
      await tx.product.update({
        where: { id: review.productId },
        data: {
          rating: averageRating._avg.rating || 0,
          numReviews: numReviews,
        },
      });
    });

    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: 'Review updated successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function getReviews({ productId }: { productId: string }) {
  const data = await prisma.review.findMany({
    where: {
      productId: productId,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return { data };
}

export const getReviewByProductId = async ({ productId }: { productId: string }) => {
  const session = await auth();
  if (!session) throw new Error('User is not authenticated');

  return await prisma.review.findFirst({
    where: { productId, userId: session?.user?.id },
  });
};
