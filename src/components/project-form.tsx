'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { ProjectFormData } from '@/lib/types';

const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  slug: z.string().min(3, 'Slug must be at least 3 characters.').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens.'),
  category: z.string().min(2, 'Category is required.'),
  shortDescription: z.string().min(10, 'Short description is required.'),
  description: z.string().min(20, 'Full description is required.'),
  coverImageUrl: z.string().url('Must be a valid URL.'),
  trailerUrl: z.string().url('Must be a valid URL.').optional(),
  // Expect exactly 5 inputs (can be empty strings). Validate as array of strings.
  galleryImageUrls: z.array(z.string()).length(5),
});

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => Promise<void>;
  initialData?: ProjectFormData | null;
}

export function ProjectForm({ onSubmit, initialData }: ProjectFormProps) {
  // Normalize initial data to ensure no `null` values are passed to inputs.
  const normalizedInitial: Partial<ProjectFormData> | undefined = initialData
    ? {
        ...initialData,
        trailerUrl: (initialData.trailerUrl ?? '') as string,
        galleryImageUrls: (
          (initialData.galleryImageUrls as string[] | undefined) || []
        )
          .slice(0, 5)
          .concat(Array(5).fill(''))
          .slice(0, 5) as [string, string, string, string, string],
      }
    : undefined;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: normalizedInitial || {
      title: '',
      slug: '',
      category: '',
      shortDescription: '',
      description: '',
      coverImageUrl: '',
      trailerUrl: '',
      // provide 5 empty fields by default
      galleryImageUrls: ['', '', '', '', ''],
    },
  });
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    form.setValue('title', title);
    const slug = title.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    form.setValue('slug', slug);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Project Title" {...field} onChange={handleTitleChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="project-slug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Architecture" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Textarea placeholder="A brief summary of the project." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Description</FormLabel>
              <FormControl>
                <Textarea placeholder="The complete project description." rows={8} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coverImageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image URL</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://images.unsplash.com/..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="trailerUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trailer URL</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://www.youtube.com/watch?v=..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormLabel className="mb-2 block">Gallery Image URLs (up to 5)</FormLabel>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <FormField
                key={i}
                control={form.control}
                name={`galleryImageUrls.${i}`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder={`Image URL ${i + 1}`}
                        {...field}
                        className="bg-background text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Fill any of the 5 slots. Leave empty for unused slots.</p>
        </div>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : 'Save Project'}
        </Button>
      </form>
    </Form>
  );
}
