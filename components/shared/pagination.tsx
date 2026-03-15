'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formUrlQuery } from '@/lib/utils';

import { Button } from '@/components/ui/button';

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (btnType: string) => {
    const pageValue = btnType === 'next' ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || 'page',
      value: pageValue.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex items-center justify-center gap-2 my-10">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleClick('prev')}
        disabled={Number(page) <= 1}
        className="flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <Button
            key={pageNum}
            variant={pageNum === Number(page) ? 'default' : 'outline'}
            size="icon"
            onClick={() => {
              const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: urlParamName || 'page',
                value: pageNum.toString(),
              });
              router.push(newUrl, { scroll: false });
            }}
            className="w-9 h-9"
          >
            {pageNum}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleClick('next')}
        disabled={Number(page) >= totalPages}
        className="flex items-center gap-1"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
