'use client';

import slugify from 'slugify';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, ControllerRenderProps, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { useToast } from '@/hooks/use-toast';
import { UploadButton } from '@/lib/uploadthing';
import { productDefaultValues } from '@/lib/default-values';
import { insertProductSchema, updateProductSchema } from '@/lib/validator';
import { createProduct, updateProduct } from '@/lib/actions/product.actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Product } from '@/types';

const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: 'Create' | 'Update';
  product?: Product;
  productId?: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver: type === 'Update' ? zodResolver(updateProductSchema) : zodResolver(insertProductSchema),
    defaultValues: product && type === 'Update' ? product : productDefaultValues,
  });

  const images = form.watch('images');
  const isFeatured = form.watch('isFeatured');
  const banner = form.watch('banner');

  const onSubmit: SubmitHandler<z.infer<typeof insertProductSchema>> = async (values) => {
    if (type === 'Create') {
      const res = await createProduct(values);

      if (!res.success) {
        toast({
          variant: 'destructive',
          description: res.message,
        });
      } else {
        toast({
          description: res.message,
        });
        router.push(`/admin/products`);
      }
    }
    if (type === 'Update') {
      if (!productId) {
        router.push(`/admin/products`);
        return;
      }

      const res = await updateProduct({ ...values, id: productId });

      if (!res.success) {
        toast({
          variant: 'destructive',
          description: res.message,
        });
      } else {
        router.push(`/admin/products`);
      }
    }
  };

  return (
    <Form {...form}>
      <form method="post" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="name"
            render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'name'> }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'slug'> }) => (
              <FormItem className="w-full">
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Enter product slug" {...field} />
                    <Button
                      type="button"
                      className="mt-2 bg-gray-500 px-4 py-1 text-white hover:bg-gray-600"
                      onClick={() => {
                        form.setValue('slug', slugify(form.getValues('name'), { lower: true }));
                      }}
                    >
                      Generate
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="category"
            render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'category'> }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brand"
            render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'brand'> }) => (
              <FormItem className="w-full">
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product brand" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'price'> }) => (
              <FormItem className="w-full">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'stock'> }) => (
              <FormItem className="w-full">
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter product stock" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="upload-field flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="images"
            render={() => (
              <FormItem className="w-full">
                <FormLabel>Images</FormLabel>
                <Card>
                  <CardContent className="mt-2 min-h-48 space-y-2">
                    <div className="flex-start space-x-2">
                      {images.map((image: string) => (
                        <Image
                          key={image}
                          src={image}
                          alt="product image"
                          className="h-20 w-20 rounded-sm object-cover object-center"
                          width={100}
                          height={100}
                        />
                      ))}
                      <FormControl>
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res: { url: string }[]) => {
                            form.setValue('images', [...images, res[0].url]);
                          }}
                          onUploadError={(error: Error) => {
                            toast({
                              variant: 'destructive',
                              description: `ERROR! ${error.message}`,
                            });
                          }}
                        />
                      </FormControl>
                    </div>
                  </CardContent>
                </Card>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="upload-field">
          Featured Product
          <Card>
            <CardContent className="mt-2 space-y-2">
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="items-center space-x-2">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Is Featured?</FormLabel>
                  </FormItem>
                )}
              />
              {isFeatured && banner && (
                <Image
                  src={banner}
                  className="w-full rounded-sm object-cover object-center"
                  width={1920}
                  height={680}
                  alt="banner image"
                />
              )}
              {isFeatured && !banner && (
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res: { url: string }[]) => {
                    form.setValue('banner', res[0].url);
                  }}
                  onUploadError={(error: Error) => {
                    toast({
                      variant: 'destructive',
                      description: `ERROR! ${error.message}`,
                    });
                  }}
                />
              )}
            </CardContent>
          </Card>
        </div>
        <div>
          <FormField
            control={form.control}
            name="description"
            render={({
              field,
            }: {
              field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'description'>;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter product description" className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <Button type="submit" className="button col-span-2 w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Submitting' : `${type} Product`}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
