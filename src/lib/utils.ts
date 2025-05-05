import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function truncateAddress(address: string) {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatNumber(num: number) {
  return new Intl.NumberFormat('en-US').format(num);
}

export function getMediaType(url: string): 'image' | 'video' | 'audio' {
  const extension = url.split('.').pop()?.toLowerCase();
  
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
    return 'image';
  }
  
  if (['mp4', 'webm', 'ogg'].includes(extension || '')) {
    return 'video';
  }
  
  if (['mp3', 'wav', 'ogg'].includes(extension || '')) {
    return 'audio';
  }
  
  return 'image'; // Default to image if type cannot be determined
}
