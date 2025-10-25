import type { ImageDetails } from './placeholder-images';

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  coverImage: ImageDetails;
  galleryImages: ImageDetails[];
}
