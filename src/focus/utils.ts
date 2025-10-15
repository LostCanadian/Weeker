import { FocusItem } from './types';

export const cloneFocusItems = (items: FocusItem[]): FocusItem[] =>
  items.map((item) => ({ ...item }));

export const areFocusItemsEqual = (
  left: FocusItem[] | undefined,
  right: FocusItem[] | undefined,
): boolean => {
  if (left === right) return true;
  if (!left || !right) return false;
  if (left.length !== right.length) return false;

  for (let index = 0; index < left.length; index += 1) {
    const a = left[index];
    const b = right[index];

    if (
      a.id !== b.id ||
      a.title !== b.title ||
      a.targetHours !== b.targetHours ||
      a.spentHours !== b.spentHours ||
      a.note !== b.note
    ) {
      return false;
    }
  }

  return true;
};
