'use client';

import { ProjectForm } from '@/components/project-form';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import type { ProjectFormData } from '@/lib/types';

export default function NewProjectPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data: ProjectFormData) => {
    const { error } = await supabase.from('projects').insert([
      {
        slug: data.slug,
        title: data.title,
        category: data.category,
        shortDescription: data.shortDescription,
        description: data.description,
        coverImage: data.coverImageUrl,
        galleryImages: data.galleryImageUrls.split('\\n').filter(url => url),
      },
    ]);

    if (error) {
      console.error('Error creating project:', error);
      toast({
        title: 'Error',
        description: 'Failed to create project.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Project created successfully.',
    });
    router.push('/dashboard');
    router.refresh(); // To reflect changes on the dashboard
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold tracking-tight font-headline mb-8">New Project</h1>
      <ProjectForm onSubmit={handleSubmit} />
    </div>
  );
}
