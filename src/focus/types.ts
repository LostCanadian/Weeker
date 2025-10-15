export type FocusItem = {
  id: string;
  title: string;
  targetHours: number;
  spentHours: number;
  note: string;
};

export type WeekStorage = Record<string, FocusItem[]>;

export const initialFocus: FocusItem[] = [];
