import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import type { Project } from '@/lib/types';
import { findImage } from '@/lib/placeholder-images';

export const revalidate = 0; // Revalidate data on every request

export default async function Home() {
  // Dummy data to replace Supabase call
  const projectsData: Project[] = [
    {
      id: 1,
      slug: 'echoes-of-silence',
      title: 'Echoes of Silence',
      category: 'Architecture',
      shortDescription: 'Exploring the interplay of light and shadow in brutalist structures.',
      description: 'Echoes of Silence is a photographic series that delves into the stark beauty of brutalist architecture. The project captures the monumental scale and raw materiality of concrete structures, focusing on how light and shadow sculpt spaces and evoke a sense of quiet contemplation. Each photograph is a study in composition, texture, and the atmospheric quality of these architectural giants.',
      coverImage: findImage('project-1-cover') as any,
      galleryImages: [
        findImage('project-1-gallery-1') as any,
        findImage('project-1-gallery-2') as any,
        findImage('project-1-gallery-3') as any,
      ],
    },
    {
      id: 2,
      slug: 'neon-dreams',
      title: 'Neon Dreams',
      category: 'Street Photography',
      shortDescription: 'A vibrant journey through the rain-soaked, neon-lit streets of Tokyo.',
      description: 'Neon Dreams is a visual exploration of Tokyo at night. This series captures the city\'s electrifying energy, where rain-slicked streets reflect a kaleidoscope of neon signs. The photographs aim to convey the feeling of being immersed in a futuristic, almost surreal, urban landscape, highlighting moments of solitude and connection amidst the vibrant chaos.',
      coverImage: findImage('project-2-cover') as any,
      galleryImages: [
        findImage('project-2-gallery-1') as any,
        findImage('project-2-gallery-2') as any,
        findImage('project-2-gallery-3') as any,
      ],
    },
    {
      id: 3,
      slug: 'terra-incognita',
      title: 'Terra Incognita',
      category: 'Landscape',
      shortDescription: 'An expedition to the otherworldly landscapes of Iceland.',
      description: 'Terra Incognita is a landscape photography project that documents the alien-like beauty of Iceland. From vast volcanic deserts and shimmering glacial rivers to moss-covered lava fields, the series explores the raw, elemental forces that have shaped this unique island. The photographs seek to capture the sublime and often surreal nature of these remote and dramatic environments.',
      coverImage: findImage('project-3-cover') as any,
      galleryImages: [
        findImage('project-3-gallery-1') as any,
        findImage('project-3-gallery-2') as any,
        findImage('project-3-gallery-3') as any,
      ],
    },
    {
      id: 4,
      slug: 'portraits-of-resilience',
      title: 'Portraits of Resilience',
      category: 'Portraiture',
      shortDescription: 'A black and white series capturing the strength and stories etched in time-worn faces.',
      description: 'Portraits of Resilience is a collection of monochromatic portraits that celebrate the human spirit. The series focuses on capturing the character, wisdom, and stories reflected in the faces of the elderly. Through the use of dramatic lighting and intimate compositions, these photographs aim to reveal the depth of experience and enduring strength of each individual.',
      coverImage: findImage('project-4-cover') as any,
      galleryImages: [
        findImage('project-4-gallery-1') as any,
        findImage('project-4-gallery-2') as any,
        findImage('project-4-gallery-3') as any,
      ],
    },
  ];

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
                    src={(project.coverImage as any).url}
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
