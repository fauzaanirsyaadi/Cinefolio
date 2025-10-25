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
}

export type ProjectFormData = {
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  coverImageUrl: string;
  galleryImageUrls: string; // Will be a newline-separated string in the form
};
