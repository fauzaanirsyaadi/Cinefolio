'use client';

import { useEffect, useState } from 'react';
import { ProjectForm } from '@/components/project-form';
import { createClient } from '@/lib/supabase/client';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import type { Project, ProjectFormData } from '@/lib/types';

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { toast } = useToast();
  const [project, setProject] = useState<ProjectFormData | null>(null);
  const supabase = createClient();

  useEffect(() => {
    if (id) {
      fetchProject(id as string);
    }
  }, [id]);

  async function fetchProject(projectId: string) {
    const { data, error } = await supabase.from('projects').select('*').eq('id', projectId).single();
    if (error) {
      console.error('Error fetching project:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch project details.',
        variant: 'destructive',
      });
      router.push('/dashboard');
    } else if (data) {
      // ensure we have an array of length 5 for the form and no nulls
      const gallery = Array.isArray(data.galleryImages) ? data.galleryImages.slice(0, 5) : [];
      while (gallery.length < 5) gallery.push('');

      setProject({
        title: data.title,
        slug: data.slug,
        category: data.category,
        shortDescription: data.shortDescription,
        description: data.description,
        coverImageUrl: data.coverImage,
        galleryImageUrls: gallery as [string, string, string, string, string],
        // normalize trailer field to empty string if null/undefined
        trailerUrl: (data.trailerUrl ?? data.trailer_url ?? '') as string,
      });
    }
  }

  const handleSubmit = async (data: ProjectFormData) => {
    const { error } = await supabase
      .from('projects')
      .update({
        slug: data.slug,
        title: data.title,
        category: data.category,
        shortDescription: data.shortDescription,
        description: data.description,
        coverImage: data.coverImageUrl,
        // use DB column name (snake_case) so PostgREST / Supabase schema matches
        trailer_url: data.trailerUrl || null,
        galleryImages: (data.galleryImageUrls || []).filter(url => url),
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating project:', error);
      toast({
        title: 'Error',
        description: 'Failed to update project.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Project updated successfully.',
    });
    router.push('/dashboard');
    router.refresh();
  };

  if (!project) {
    return <div className="container mx-auto px-4 py-24 text-center">Loading project...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold tracking-tight font-headline mb-8">Edit Project</h1>
      <ProjectForm onSubmit={handleSubmit} initialData={project} />
    </div>
  );
}
