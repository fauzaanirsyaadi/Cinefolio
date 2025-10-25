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

  // Example URL: https://images.unsplash.com/photo-1493397212122-2b85dda8106b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxhYnN0cmFjdCUyMGFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3NjEzODQxNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080
  const url = new URL(img.imageUrl);
  const width = parseInt(url.searchParams.get('w') || '600', 10);
  // Unsplash uses a fixed aspect ratio for search results, so we can calculate height from width or set a default.
  // The aspect ratio is often around 3:2, but can vary.
  // Let's hardcode a common height for now, as it's not in the URL. A better approach would be to have it in the JSON.
  // For now, let's assume a 3:2 aspect ratio.
  const height = Math.round(width * (2 / 3));

  return { id: img.id, url: img.imageUrl, hint: img.imageHint, width, height };
};