import type { Property } from 'csstype';

import type { Style } from '@/shared/types/style';
import type { ComputedRef } from 'vue';

export type Palette = {
  [key: string]: Style.Color;
};

export type Gradient = {
  [key: string]: Style.Gradient;
};

export type FontSize = {
  [key: string]: Property.FontSize<never>;
};

export abstract class Theme {
  abstract name: string;
  abstract description?: string;
  abstract schema: Property.ColorScheme;
  abstract palettes: Palette;
  abstract gradients: Gradient;
  abstract fontSets: FontSize;
}

export type ListThemeResponse = {
  themes: Theme[];
};

export interface UseTheme {
  theme: ComputedRef<Record<string, Theme> | undefined>;
  current: ComputedRef<Theme>;

  ListTheme(): Promise<void>;
  ListThemeSuccess(themes: Theme[]): void;
  ListThemeError(err: Error): void;
  StyleVariablesBinder(theme: Theme): void;
}
