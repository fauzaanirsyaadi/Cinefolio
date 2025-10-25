import type { Project } from '@/lib/types';
import { findImage } from '@/lib/placeholder-images';

export const projects: Project[] = [
  {
    id: 1,
    slug: 'echoes-of-silence',
    title: 'Echoes of Silence',
    category: 'Architecture',
    shortDescription: 'A study of brutalist forms and their interaction with light.',
    description: 'Echoes of Silence is a photographic series that delves into the stark beauty of brutalist architecture. The project explores the interplay between concrete monoliths and the transient nature of light, capturing moments of profound stillness and geometric harmony. Each photograph aims to reveal the silent poetry embedded in these often-misunderstood structures.',
    coverImage: findImage('project-1-cover'),
    galleryImages: [
      findImage('project-1-gallery-1'),
      findImage('project-1-gallery-2'),
      findImage('project-1-gallery-3'),
    ],
  },
  {
    id: 2,
    slug: 'neon-dreams',
    title: 'Neon Dreams',
    category: 'Street Photography',
    shortDescription: "The vibrant, nocturnal life of Tokyo's hidden alleys.",
    description: "Neon Dreams captures the electric pulse of Tokyo after dark. This series ventures into the city's labyrinthine alleys, documenting the intimate moments and surreal atmospheres illuminated by neon signs. It's a visual narrative of the people and places that thrive in the shadows of a metropolis that never sleeps.",
    coverImage: findImage('project-2-cover'),
    galleryImages: [
      findImage('project-2-gallery-1'),
      findImage('project-2-gallery-2'),
      findImage('project-2-gallery-3'),
    ],
  },
  {
    id: 3,
    slug: 'terra-incognita',
    title: 'Terra Incognita',
    category: 'Landscape',
    shortDescription: 'Unexplored landscapes from the Icelandic highlands.',
    description: "Terra Incognita is an expedition into the heart of the Icelandic highlands, a realm of raw, untamed nature. This project documents otherworldly landscapes of volcanic deserts, glacial rivers, and moss-covered lava fields. It seeks to convey the immense scale and sublime beauty of one of Earth's last great wildernesses.",
    coverImage: findImage('project-3-cover'),
    galleryImages: [
      findImage('project-3-gallery-1'),
      findImage('project-3-gallery-2'),
      findImage('project-3-gallery-3'),
    ],
  },
    {
    id: 4,
    slug: 'portraits-of-resilience',
    title: 'Portraits of Resilience',
    category: 'Portraiture',
    shortDescription: 'Stories of strength captured through the human face.',
    description: "This collection of portraits highlights individuals who have overcome significant adversity. Each photograph is a testament to the human spirit's capacity for resilience, capturing the subject's story not just in their expression, but in the very light and shadow that defines their features. It's an intimate look at strength, vulnerability, and hope.",
    coverImage: findImage('project-4-cover'),
    galleryImages: [
      findImage('project-4-gallery-1'),
      findImage('project-4-gallery-2'),
      findImage('project-4-gallery-3'),
    ],
  },
];
