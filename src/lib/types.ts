import type { ImageDetails } from './placeholder-images';

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  coverImage: ImageDetails | string;
  galleryImages: (ImageDetails | string)[];
  trailerUrl?: string | null;
}

export type ProjectFormData = {
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  coverImageUrl: string;
  galleryImageUrls: [string, string, string, string, string]; // Fixed-length array for the project form (5 inputs). Empty string = unused.
  trailerUrl?: string;
};
