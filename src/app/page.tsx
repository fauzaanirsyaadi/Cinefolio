import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/server';
import type { Project } from '@/lib/types';

export const revalidate = 0; // Revalidate data on every request

export default async function Home() {
  const supabase = createClient();
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Error fetching projects:', error);
    // You can render an error state here if you want
  }

  const projectsData = (projects as any[] || []).map(p => ({
      ...p,
      coverImage: p.coverImage,
      galleryImages: p.galleryImages || [],
  })) as Project[];

  return (
    <main className="container mx-auto px-4 py-24">
      <section className="animate-fade-in-up">
        <h1 className="text-3xl font-bold tracking-tight text-center mb-4 sm:text-4xl md:text-5xl font-headline">Creative Projects</h1>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          A curated selection of my work across various disciplines. Each project is a journey into form, light, and narrative.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <Link href={`/projects/${project.slug}`} key={project.id} className="group block">
              <Card className="bg-card border-none overflow-hidden transition-all duration-500 ease-in-out group-hover:shadow-2xl group-hover:shadow-primary/10 rounded-lg">
                <CardContent className="p-0 relative">
                  <Image
                    src={project.coverImage as string}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover aspect-[3/2] transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 md:p-8">
                    <p className="text-sm text-accent/90 mb-1">{project.category}</p>
                    <h2 className="text-2xl font-bold text-white font-headline">{project.title}</h2>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
