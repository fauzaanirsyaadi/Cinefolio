import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;

export type ImageDetails = {
  id: string;
  url: string;
  hint: string;
  width: number;
  height: number;
};

export const findImage = (id: string): ImageDetails => {
  const img = PlaceHolderImages.find((p) => p.id === id);
  if (!img) {
    throw new Error(`Image with id "${id}" not found in placeholder-images.json`);
  }

  // Example URL: https://picsum.photos/seed/p1cover/1200/800
  const parts = img.imageUrl.split('/');
  const height = parseInt(parts.pop() || '400', 10);
  const width = parseInt(parts.pop() || '600', 10);

  return { id: img.id, url: img.imageUrl, hint: img.imageHint, width, height };
};
