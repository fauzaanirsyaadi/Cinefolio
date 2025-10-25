import Image from 'next/image';
import { findImage } from '@/lib/placeholder-images';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Cinefolio',
  description: 'Learn more about the creative force behind Cinefolio.',
};

export default function AboutPage() {
  const aboutImage = findImage('about-page-image');
  return (
    <main className="py-32 animate-fade-in-up">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-2xl shadow-primary/10">
              <Image
                src={aboutImage.url}
                alt="Portrait of the artist"
                fill
                className="object-cover"
                data-ai-hint={aboutImage.hint}
                priority
              />
            </div>
          </div>
          <div className="md:col-span-3">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 font-headline">Behind the Lens</h1>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                Welcome to Cinefolio. I'm a visual storyteller passionate about capturing the fleeting moments that define our world. Through photography and film, I explore the intersections of light, shadow, and human experience.
              </p>
              <p>
                My work is driven by a minimalist aesthetic, focusing on clean compositions and emotional resonance. I believe that the most powerful stories are often told in the quietest frames. From the stark geometry of urban landscapes to the intimate nuances of a portrait, I strive to find the extraordinary in the ordinary.
              </p>
              <p>
                This portfolio is a collection of journeys, both personal and professional. Each project represents a unique exploration and a commitment to visual craftsmanship. Thank you for taking the time to look through my work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
