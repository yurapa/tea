'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Calendar, User } from 'lucide-react';

import { getReviews } from '@/lib/actions/review.actions';

import { Review } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { formatDateTime } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ReviewForm from './review-form';
import Rating from '@/components/shared/product/rating';

const ReviewList = ({ userId, productId, productSlug }: { userId: string; productId: string; productSlug: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadReviews = async () => {
      const res = await getReviews({ productId });
      setReviews(res.data);
    };

    loadReviews();
  }, [productId]);

  const reload = async () => {
    try {
      const res = await getReviews({ productId });
      setReviews([...res.data]);
    } catch (err) {
      console.log(err);
      toast({
        variant: 'destructive',
        description: 'Error in fetching reviews',
      });
    }
  };

  return (
    <div className="space-y-4">
      {reviews.length === 0 && (
        <p className="text-muted-foreground text-sm">No reviews yet</p>
      )}
      {userId ? (
        <ReviewForm userId={userId} productId={productId} onReviewSubmitted={reload} />
      ) : (
        <p className="text-sm text-muted-foreground">
          Please{' '}
          <Link
            className="text-accent hover:underline font-medium"
            href={`/sign-in?callbackUrl=/product/${productSlug}`}
          >
            sign in
          </Link>{' '}
          to write a review
        </p>
      )}
      <div className="flex flex-col gap-3">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex-between">
                <CardTitle>{review.title}</CardTitle>
              </div>
              <CardDescription>{review.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 text-sm text-muted-foreground">
                <Rating value={review.rating} />
                <div className="flex items-center">
                  <User className="mr-1 h-3 w-3" />
                  {review.user ? review.user.name : 'User'}
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  {formatDateTime(review.createdAt).dateTime}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
