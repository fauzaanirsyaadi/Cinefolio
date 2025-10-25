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

export const findImage = (id: string): ImageDetails | null => {
  const img = PlaceHolderImages.find((p) => p.id === id);
  if (!img) {
    // Return null instead of throwing an error to handle dynamic data gracefully
    return null;
  }

  const url = new URL(img.imageUrl);
  const width = parseInt(url.searchParams.get('w') || '600', 10);
  const height = Math.round(width * (2 / 3));

  return { id: img.id, url: img.imageUrl, hint: img.imageHint, width, height };
};
