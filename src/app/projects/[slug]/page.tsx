import { projects } from '@/lib/projects-data';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);

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

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectDetailsPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

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
              src={project.coverImage.url}
              alt={project.title}
              fill
              className="object-cover rounded-lg shadow-2xl shadow-primary/10"
              priority
              data-ai-hint={project.coverImage.hint}
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
              {project.galleryImages.map((image) => (
                <div key={image.id} className="overflow-hidden rounded-lg">
                  <Image
                    src={image.url}
                    alt={`${project.title} gallery image`}
                    width={image.width}
                    height={image.height}
                    className="w-full h-auto object-cover"
                    data-ai-hint={image.hint}
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
