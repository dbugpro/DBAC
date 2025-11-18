
import { KeyType } from './types';

export const TARGET_SEQUENCE: KeyType[] = ['D', 'B', 'A', 'C'];

export const KEY_COLORS: Record<KeyType, string> = {
  D: 'bg-cyan-500 hover:bg-cyan-400',
  B: 'bg-pink-500 hover:bg-pink-400',
  A: 'bg-yellow-500 hover:bg-yellow-400',
  C: 'bg-lime-500 hover:bg-lime-400',
};

export const KEY_SHADOWS: Record<KeyType, string> = {
  D: 'shadow-[0_5px_0px_0px_#0891b2]',
  B: 'shadow-[0_5px_0px_0px_#be185d]',
  A: 'shadow-[0_5px_0px_0px_#ca8a04]',
  C: 'shadow-[0_5px_0px_0px_#4d7c0f]',
};

export const KEY_MAP: { [key: string]: KeyType } = {
  D: 'D',
  B: 'B',
  A: 'A',
  C: 'C',
};
