// interfaces/ImageProps.ts
export interface ImageProps {
    src: string;
    alt: string;
    aspectRatio: 'square' | 'wide';
    bgColor?: string; // Optional background color
    opacity?: number; // Optional opacity (0 to 1)
  }