import { twMerge } from 'tailwind-merge';
import clsx, { ClassValue } from 'clsx';

const cn = (...className: ClassValue[]) => twMerge(clsx(...className));

export default cn;
