import { createClient } from '@/lib/supabase/server';
import type { Project } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';

export const revalidate = 0; // Revalidate data on every request

export default async function Home() {
  // Server-side Supabase client (await the async helper)
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Error fetching projects:', error);
    return (
      <main className="container mx-auto px-4 py-24">
        <p className="text-destructive">Failed to load projects.</p>
      </main>
    );
  }

  const projectsToDisplay = (data || []).map((p: any, idx: number) => {
    const coverUrl =
      typeof p.coverImage === 'string' ? p.coverImage : (p.coverImage && (p.coverImage.url || (p.coverImage as any).imageUrl)) || '';
    return {
      idx,
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: p.category,
      shortDescription: p.shortDescription,
      description: p.description,
      coverImage: coverUrl,
      galleryImages: p.galleryImages || [],
      createdAt: p.created_at,
    };
  }) as Array<{
    idx: number;
    id: number;
    slug: string;
    title: string;
    category: string;
    shortDescription: string;
    description: string;
    coverImage: string;
    galleryImages: string[];
    createdAt: string | null;
  }>;

  if (projectsToDisplay.length === 0) {
    return (
      <main className="container mx-auto px-4 py-24">
        <p className="text-muted-foreground">No projects found.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-24">
      <section className="animate-fade-in-up">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight font-headline">Work</h1>
          <Link href="/dashboard" className="text-sm text-primary underline">
            Manage
          </Link>
        </div>

        <div className="relative">
          <Carousel className="min-h-[320px]">
            {projectsToDisplay.map((p) => (
              <CarouselItem key={p.id} className="p-4">
                <Card className="max-w-3xl mx-auto">
                  <div className="relative w-full aspect-[16/9] rounded-t-md overflow-hidden bg-muted">
                    {p.coverImage ? (
                      <Image
                        src={p.coverImage}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute left-6 bottom-6 text-white">
                      <span className="inline-block bg-black/50 px-2 py-1 rounded text-xs uppercase tracking-wider">{p.category}</span>
                      <h2 className="mt-2 text-2xl font-extrabold">{p.title}</h2>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4 line-clamp-3">{p.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <Link href={`/projects/${p.slug}`} className="text-sm text-primary underline">
                        View Project
                      </Link>
                      <span className="text-xs text-muted-foreground">{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : ''}</span>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}

            {/* Previous / Next must be rendered inside the Carousel so useCarousel() has context */}
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
          </Carousel>
        </div>
      </section>
    </main>
  );
}
