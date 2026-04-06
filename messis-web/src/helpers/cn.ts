import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export default cn