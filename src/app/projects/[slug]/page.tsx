import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import type { Project } from '@/lib/types';
import FootageGallery, { GalleryItem as FGItem } from '@/components/footage-gallery';

type Props = {
  params: { slug: string };
};

export const revalidate = 0; // Revalidate data on every request

async function getProject(slug: string): Promise<Project | null> {
    // createClient is async — await it so `supabase.from` is available
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();
    
    if (error) {
        console.error('Error fetching project by slug:', error);
        return null;
    }

    // Normalize DB snake_case fields to our camelCase `Project` shape
    const raw = data as any;
    const mapped: Project = {
      id: raw.id,
      slug: raw.slug,
      title: raw.title,
      category: raw.category,
      shortDescription: raw.shortDescription ?? raw.short_description ?? '',
      description: raw.description ?? '',
      coverImage: raw.coverImage ?? raw.cover_image ?? '',
      galleryImages: (raw.galleryImages ?? raw.gallery_images ?? []) as string[],
      // map DB trailer_url -> trailerUrl
      trailerUrl: raw.trailerUrl ?? raw.trailer_url ?? null,
    };
    
    return mapped;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // `params` can be a proxy/promise in Next.js — await before using properties
  const { slug } = (await params) as { slug: string };
  const project = await getProject(slug);

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
  // ensure params is awaited before accessing slug
  const { slug } = (await params) as { slug: string };
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  // Trailer parsing / validation helper
  function parseTrailerUrl(url?: string | null) {
    if (!url) return { valid: false, reason: 'empty' };
    try {
      const parsed = new URL(url);
      const host = parsed.hostname.toLowerCase();

      // YouTube (regular and short)
      if (host.includes('youtube.com') || host.includes('youtu.be')) {
        let id: string | null = null;
        if (host.includes('youtu.be')) {
          id = parsed.pathname.split('/').filter(Boolean)[0] || null;
        } else {
          id = parsed.searchParams.get('v');
          // support /shorts/<id> and other paths
          if (!id) {
            const pathMatch = parsed.pathname.match(/\/(embed|shorts)\/([0-9A-Za-z_-]{6,})/) ||
                              parsed.pathname.match(/\/([0-9A-Za-z_-]{6,})$/);
            id = pathMatch ? pathMatch[2] || pathMatch[1] : null;
          }
        }
        const embed = id ? `https://www.youtube.com/embed/${id}` : url;
        return { valid: !!id, platform: 'youtube', id, embed, raw: url };
      }

      // Vimeo
      if (host.includes('vimeo.com')) {
        const vidMatch = parsed.pathname.match(/\/(\d+)/);
        const id = vidMatch ? vidMatch[1] : null;
        const embed = id ? `https://player.vimeo.com/video/${id}` : url;
        return { valid: !!id, platform: 'vimeo', id, embed, raw: url };
      }

      // Cloudflare Stream / mp4 / direct file
      const pathname = parsed.pathname.toLowerCase();
      if (pathname.endsWith('.mp4') || pathname.endsWith('.webm') || host.includes('videodelivery.net') || host.includes('cloudinary')) {
        return { valid: true, platform: 'direct', embed: url, raw: url };
      }

      // Unknown/unsupported host
      return { valid: false, reason: 'unsupported-host', host, raw: url };
    } catch (err) {
      return { valid: false, reason: 'invalid-url', error: err, raw: url };
    }
  }

  const trailerInfo = parseTrailerUrl(project.trailerUrl as string | undefined);
  console.log('Project details:', { id: project.id, slug: project.slug, title: project.title });
  console.log('Raw trailer URL:', project.trailerUrl);
  console.log('Parsed trailer info:', trailerInfo);

    const footageItems: FGItem[] = ((project.galleryImages as string[]) || []).map((src, i) => ({
        src,
        // you can add dynamic captions if you have them in DB; below is demo text
        eyebrow: 'VARIETY',
        heading: i % 3 === 0 ? '“A cinematic triumph”' : undefined,
    }));

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
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                    {project.coverImage ? (
                        <Image
                            src={String(project.coverImage)}
                            alt={`${project.title} cover`}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-muted" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 p-8 text-white">
                    <Badge variant="secondary" className="mb-2 bg-black/50 text-white border-white/20">{project.category}</Badge>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter font-headline">{project.title}</h1>
                </div>
            </div>

          <div className="max-w-3xl mx-auto">
              {/* Trailer section */}
              {trailerInfo?.valid && trailerInfo.embed ? (
                  <div className="mb-12">
                      <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                          {trailerInfo.platform === 'youtube' || trailerInfo.platform === 'vimeo' ? (
                              <iframe
                                  src={`${trailerInfo.embed}${trailerInfo.embed?.includes('?') ? '&' : '?'}autoplay=0`}
                                  title={`${project.title} trailer`}
                                  className="w-full h-full"
                                  allow="autoplay; encrypted-media; picture-in-picture"
                                  allowFullScreen
                              />
                          ) : (
                              <video
                                  src={trailerInfo.embed}
                                  controls
                                  poster={String(project.coverImage || '')}
                                  className="w-full h-full object-cover"
                              />
                          )}
                      </div>
                  </div>
              ) : null}
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              {project.description}
            </p>

              {(project.galleryImages?.length ?? 0) > 0 ? (
                  <FootageGallery
                      items={footageItems}
                      className="my-24"
                      topOffsetClass="top-0" // change to 'top-16' if you have a fixed header
                      reverseSecondRow
                  />
              ) : null}
          </div>
        </article>
      </div>
    </main>
  );
}
