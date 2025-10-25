import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import type { Project } from '@/lib/types';

type Props = {
  params: { slug: string };
};

export const revalidate = 0; // Revalidate data on every request

async function getProject(slug: string): Promise<Project | null> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();
    
    if (error) {
        console.error('Error fetching project by slug:', error);
        return null;
    }
    
    return data as Project;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject(params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Cinefolio`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailsPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="py-24 animate-fade-in-up">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>

        <article>
          <div className="relative w-full h-[60vh] mb-12">
            <Image
              src={project.coverImage as string}
              alt={project.title}
              fill
              className="object-cover rounded-lg shadow-2xl shadow-primary/10"
              priority
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
                <Badge variant="secondary" className="mb-2 bg-black/50 text-white border-white/20">{project.category}</Badge>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter font-headline">{project.title}</h1>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              {project.description}
            </p>

            <div className="grid grid-cols-1 gap-8">
              {(project.galleryImages as string[] || []).map((imageUrl, index) => (
                <div key={index} className="overflow-hidden rounded-lg">
                  <Image
                    src={imageUrl}
                    alt={`${project.title} gallery image ${index + 1}`}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
