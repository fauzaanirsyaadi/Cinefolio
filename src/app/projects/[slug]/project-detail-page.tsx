import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import ProjectTrailerPlayer from '@/components/project-trailer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Project } from '@/lib/types';

type Props = {
  params: { slug: string };
};

async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;

  // normalize snake_case -> camelCase for our Project type
  const raw: any = data;
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    category: raw.category,
    shortDescription: raw.shortDescription ?? raw.short_description ?? '',
    description: raw.description ?? '',
    coverImage: raw.coverImage ?? raw.cover_image ?? '',
    galleryImages: (raw.galleryImages ?? raw.gallery_images ?? []) as string[],
    trailerUrl: raw.trailerUrl ?? raw.trailer_url ?? null,
  } as Project;
}

function parseTrailerUrl(url?: string | null) {
  if (!url) return null;
  const trimmed = url.trim();
  if (trimmed.length === 0) return null;

  const youtubeIdMatch = trimmed.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (youtubeIdMatch) {
    return {
      valid: true,
      platform: 'youtube',
      id: youtubeIdMatch[1],
      embed: `https://www.youtube.com/embed/${youtubeIdMatch[1]}`,
      raw: trimmed,
    };
  }

  const vimeoIdMatch = trimmed.match(/(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/);
  if (vimeoIdMatch) {
    return {
      valid: true,
      platform: 'vimeo',
      id: vimeoIdMatch[1],
      embed: `https://player.vimeo.com/video/${vimeoIdMatch[1]}`,
      raw: trimmed,
    };
  }

  const directFileMatch = trimmed.match(/.+\.(mp4|webm|ogg)$/i);
  if (directFileMatch) {
    return {
      valid: true,
      platform: 'direct',
      embed: trimmed,
      raw: trimmed,
    };
  }

  return {
    valid: false,
    reason: 'Unsupported URL format',
    raw: trimmed,
  };
}

export default async function ProjectDetailsPage({ params }: Props) {
  const { slug } = params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const trailerInfo = parseTrailerUrl(project.trailerUrl as string | null);

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
          <div className="relative w-full h-[60vh] mb-8 rounded-lg overflow-hidden">
            <Image
              src={String(project.coverImage || '')}
              alt={project.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <Badge variant="secondary" className="mb-2 bg-black/50 text-white border-white/20">{project.category}</Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter font-headline">{project.title}</h1>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-sm text-muted-foreground mb-3">Trailer</h2>
            <div className="rounded-lg overflow-hidden bg-black/80">
              <ProjectTrailerPlayer
                trailerInfo={trailerInfo}
                poster={String(project.coverImage || '')}
                className="aspect-video"
              />
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              {project.description}
            </p>
            {/* ...existing code... */}
          </div>
        </article>
      </div>
    </main>
  );
}